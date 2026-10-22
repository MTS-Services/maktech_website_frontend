import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  MdCloudUpload,
  MdContentCopy,
  MdDelete,
  MdCheck,
  MdRefresh,
  MdOpenInNew,
  MdPermMedia,
  MdClose,
  MdPlayCircleOutline,
} from 'react-icons/md';
import apiClient from '../../../services/apiClient';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const PART_CONCURRENCY = 4;
const SIGN_BATCH = 20;
const PART_RETRIES = 3;

const EXTENSION_TYPES = {
  mkv: 'video/x-matroska',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  wmv: 'video/x-ms-wmv',
  m4v: 'video/x-m4v',
  '3gp': 'video/3gpp',
  heic: 'image/heic',
  heif: 'image/heif',
};

const contentTypeOf = (file) =>
  file.type || EXTENSION_TYPES[file.name.split('.').pop()?.toLowerCase()] || '';

// SVG is rejected by the backend: it can carry inline scripts when opened from the public bucket URL
const isAllowedType = (type) =>
  (type.startsWith('image/') || type.startsWith('video/')) && type !== 'image/svg+xml';

const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const putPart = (url, blob, signal, onProgress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const abort = () => xhr.abort();
    signal.addEventListener('abort', abort, { once: true });
    xhr.onloadend = () => signal.removeEventListener('abort', abort);
    xhr.open('PUT', url);
    xhr.upload.onprogress = (e) => onProgress(e.loaded);
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Storage rejected the upload (HTTP ${xhr.status})`));
        return;
      }
      const etag = xhr.getResponseHeader('ETag');
      if (!etag) {
        reject(
          new Error('Storage did not return an ETag. Check the R2 bucket CORS settings.'),
        );
        return;
      }
      resolve(etag);
    };
    xhr.onerror = () =>
      reject(new Error('Network error while uploading. Check the R2 bucket CORS settings.'));
    xhr.onabort = () => reject(new DOMException('Upload cancelled', 'AbortError'));
    if (signal.aborted) {
      signal.removeEventListener('abort', abort);
      reject(new DOMException('Upload cancelled', 'AbortError'));
      return;
    }
    xhr.send(blob);
  });

const uploadFile = async (file, contentType, signal, onProgress) => {
  const { data: startRes } = await apiClient.post('/api/v1/media/multipart/start', {
    fileName: file.name,
    contentType,
    size: file.size,
  });
  const { key, uploadId, partSize, partCount } = startRes.data;

  const loadedByPart = new Map();
  const reportProgress = () => {
    let loaded = 0;
    loadedByPart.forEach((v) => (loaded += v));
    onProgress(Math.min(loaded, file.size));
  };

  const parts = [];
  try {
    for (let first = 1; first <= partCount; first += SIGN_BATCH) {
      if (signal.aborted) throw new DOMException('Upload cancelled', 'AbortError');
      const partNumbers = [];
      for (let n = first; n < first + SIGN_BATCH && n <= partCount; n++) partNumbers.push(n);

      const { data: signRes } = await apiClient.post('/api/v1/media/multipart/sign', {
        key,
        uploadId,
        partNumbers,
      });
      const queue = [...signRes.data];

      const worker = async () => {
        while (queue.length) {
          const { partNumber, url } = queue.shift();
          const start = (partNumber - 1) * partSize;
          const blob = file.slice(start, Math.min(start + partSize, file.size));

          for (let attempt = 1; ; attempt++) {
            try {
              const etag = await putPart(url, blob, signal, (loaded) => {
                loadedByPart.set(partNumber, loaded);
                reportProgress();
              });
              parts.push({ partNumber, etag });
              break;
            } catch (err) {
              loadedByPart.set(partNumber, 0);
              if (err.name === 'AbortError' || attempt >= PART_RETRIES) throw err;
            }
          }
        }
      };
      await Promise.all(Array.from({ length: PART_CONCURRENCY }, worker));
    }

    const { data: completeRes } = await apiClient.post(
      '/api/v1/media/multipart/complete',
      { key, uploadId, parts },
      { timeout: 120000 },
    );
    return completeRes.data;
  } catch (err) {
    apiClient.post('/api/v1/media/multipart/abort', { key, uploadId }).catch(() => {});
    throw err;
  }
};

export default function Uploads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [deletingFile, setDeletingFile] = useState(null);
  const inputRef = useRef(null);
  const controllersRef = useRef(new Map());

  const uploading = queue.some((u) => u.status === 'uploading' || u.status === 'waiting');

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/v1/media');
      setFiles(res.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Uploads – Maktech Admin';
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    if (!uploading) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [uploading]);

  const updateQueue = (id, patch) =>
    setQueue((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const uploadFiles = async (fileList) => {
    const picked = Array.from(fileList || []);
    if (inputRef.current) inputRef.current.value = '';
    if (!picked.length) return;

    const valid = picked.filter((f) => f.size > 0 && isAllowedType(contentTypeOf(f)));
    const skipped = picked.length - valid.length;
    if (skipped) toast.warn(`${skipped} file(s) skipped (only images and videos are allowed)`);
    if (!valid.length) return;

    const jobs = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      loaded: 0,
      status: 'waiting',
      error: null,
    }));
    setQueue((prev) => [
      ...jobs.map(({ id, name, size, loaded, status, error }) => ({
        id,
        name,
        size,
        loaded,
        status,
        error,
      })),
      ...prev,
    ]);
    jobs.forEach((job) => controllersRef.current.set(job.id, new AbortController()));

    let done = 0;
    for (const job of jobs) {
      const controller = controllersRef.current.get(job.id);
      if (controller.signal.aborted) {
        controllersRef.current.delete(job.id);
        setQueue((prev) => prev.filter((u) => u.id !== job.id));
        continue;
      }
      updateQueue(job.id, { status: 'uploading' });

      try {
        const item = await uploadFile(
          job.file,
          contentTypeOf(job.file),
          controller.signal,
          (loaded) => updateQueue(job.id, { loaded }),
        );
        setFiles((prev) => [item, ...prev]);
        setQueue((prev) => prev.filter((u) => u.id !== job.id));
        done++;
      } catch (err) {
        if (err.name === 'AbortError') {
          setQueue((prev) => prev.filter((u) => u.id !== job.id));
        } else {
          const message = err.response?.data?.message || err.message || 'Upload failed';
          updateQueue(job.id, { status: 'error', error: message });
          toast.error(`${job.name}: ${message}`);
        }
      } finally {
        controllersRef.current.delete(job.id);
      }
    }
    if (done) toast.success(`${done} file(s) uploaded`);
  };

  const cancelUpload = (id) => {
    const controller = controllersRef.current.get(id);
    if (controller) controller.abort();
    else setQueue((prev) => prev.filter((u) => u.id !== id));
  };

  const handleCopy = async (item) => {
    try {
      await copyToClipboard(item.url);
      setCopiedKey(item.key);
      toast.success('Link copied');
      setTimeout(() => setCopiedKey((k) => (k === item.key ? null : k)), 1500);
    } catch {
      toast.error('Could not copy link');
    }
  };

  const handleDeleteConfirm = async () => {
    const item = deletingFile;
    setDeletingFile(null);
    if (!item) return;
    try {
      await apiClient.delete('/api/v1/media', { params: { key: item.key } });
      setFiles((prev) => prev.filter((i) => i.key !== item.key));
      toast.success('File deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            Uploads
          </h1>
          <p className='text-sm sm:text-base text-gray-500 mt-1'>
            Upload images and videos and copy their public links to use anywhere
          </p>
        </div>
        <button
          type='button'
          onClick={fetchFiles}
          title='Refresh'
          className='p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#ff6533] shadow-2xs transition cursor-pointer'
        >
          <MdRefresh className={`text-xl ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div
        role='button'
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          uploadFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors cursor-pointer ${
          dragOver
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/30'
        }`}
      >
        <div className='flex items-center justify-center w-14 h-14 rounded-full bg-orange-50'>
          <MdCloudUpload
            className={`text-3xl text-orange-500 ${uploading ? 'animate-pulse' : ''}`}
          />
        </div>
        <p className='font-semibold text-gray-800'>
          Click to choose or drag images and videos here
        </p>
        <p className='text-xs text-gray-400'>Any image or video format · no size limit</p>
        <input
          ref={inputRef}
          type='file'
          accept='image/*,video/*'
          multiple
          hidden
          onChange={(e) => uploadFiles(e.target.files)}
        />
      </div>

      {queue.length > 0 && (
        <div className='space-y-2'>
          {queue.map((u) => {
            const percent = u.size ? Math.round((u.loaded / u.size) * 100) : 0;
            return (
              <div
                key={u.id}
                className='rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-2xs'
              >
                <div className='flex items-center justify-between gap-3'>
                  <p className='truncate text-sm font-medium text-gray-800' title={u.name}>
                    {u.name}
                  </p>
                  <div className='flex shrink-0 items-center gap-2'>
                    <span
                      className={`text-xs ${u.status === 'error' ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      {u.status === 'waiting' && 'Waiting…'}
                      {u.status === 'uploading' &&
                        `${formatSize(u.loaded)} / ${formatSize(u.size)} · ${percent}%`}
                      {u.status === 'error' && 'Failed'}
                    </span>
                    <button
                      type='button'
                      onClick={() => cancelUpload(u.id)}
                      title={u.status === 'error' ? 'Dismiss' : 'Cancel upload'}
                      className='p-1 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer'
                    >
                      <MdClose />
                    </button>
                  </div>
                </div>
                {u.status === 'error' ? (
                  <p className='mt-1 text-xs text-red-500'>{u.error}</p>
                ) : (
                  <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100'>
                    <div
                      className='h-full rounded-full bg-orange-500 transition-[width] duration-200'
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {loading && files.length === 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className='aspect-square rounded-xl bg-gray-100 animate-pulse' />
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-2 py-16 text-gray-400'>
          <MdPermMedia className='text-5xl' />
          <p>No files uploaded yet</p>
        </div>
      ) : (
        <>
          <p className='text-sm text-gray-500'>{files.length} file(s)</p>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {files.map((item) => (
              <div
                key={item.key}
                className='group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow'
              >
                {item.kind === 'video' ? (
                  <div className='relative aspect-square bg-gray-900'>
                    <video
                      src={item.url}
                      preload='metadata'
                      controls
                      playsInline
                      className='h-full w-full object-contain'
                    />
                    <span className='pointer-events-none absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] text-white'>
                      <MdPlayCircleOutline /> Video
                    </span>
                  </div>
                ) : (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noreferrer'
                    className='relative block aspect-square bg-gray-50'
                    title='Open full size'
                  >
                    <img
                      src={item.url}
                      alt=''
                      loading='lazy'
                      className='h-full w-full object-cover'
                    />
                    <span className='absolute top-2 right-2 p-1 rounded-md bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <MdOpenInNew />
                    </span>
                  </a>
                )}
                <div className='p-2.5 space-y-2'>
                  <p className='truncate text-xs text-gray-500' title={item.url}>
                    {item.url}
                  </p>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-xs text-gray-400'>
                      {formatSize(item.size)} · {formatDate(item.lastModified)}
                    </span>
                    <button
                      type='button'
                      onClick={() => setDeletingFile(item)}
                      className='p-1.5 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors'
                      title='Delete'
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <button
                    type='button'
                    onClick={() => handleCopy(item)}
                    className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium transition-colors ${
                      copiedKey === item.key
                        ? 'bg-green-50 text-green-600'
                        : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                    }`}
                  >
                    {copiedKey === item.key ? <MdCheck /> : <MdContentCopy />}
                    {copiedKey === item.key ? 'Copied' : 'Copy link'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {deletingFile && (
        <ConfirmDeleteModal
          title={deletingFile.kind === 'video' ? 'Delete Video?' : 'Delete Image?'}
          description='Any page using this link will no longer be able to show it.'
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingFile(null)}
        />
      )}
    </div>
  );
}
