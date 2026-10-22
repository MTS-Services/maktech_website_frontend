import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  MdCloudUpload,
  MdContentCopy,
  MdDelete,
  MdCheck,
  MdRefresh,
  MdOpenInNew,
  MdImage,
} from 'react-icons/md';
import apiClient from '../../../services/apiClient';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 20;

const formatSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

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

export default function Uploads() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [deletingImage, setDeletingImage] = useState(null);
  const inputRef = useRef(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/v1/media');
      setImages(res.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load images');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Uploads – Maktech Admin';
    fetchImages();
  }, [fetchImages]);

  const uploadFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const valid = files.filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE,
    );
    const skipped = files.length - valid.length;
    if (skipped) {
      toast.warn(`${skipped} file(s) skipped (only JPG, PNG, WEBP, GIF, AVIF up to 10 MB)`);
    }
    if (!valid.length) return;
    if (valid.length > MAX_FILES) {
      toast.error(`You can upload up to ${MAX_FILES} images at once`);
      return;
    }

    const formData = new FormData();
    valid.forEach((file) => formData.append('images', file));

    setUploading(true);
    try {
      const res = await apiClient.post('/api/v1/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });
      const uploaded = res.data?.data || [];
      setImages((prev) => [...uploaded, ...prev]);
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
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
    const item = deletingImage;
    setDeletingImage(null);
    if (!item) return;
    try {
      await apiClient.delete('/api/v1/media', { params: { key: item.key } });
      setImages((prev) => prev.filter((i) => i.key !== item.key));
      toast.success('Image deleted');
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
            Upload images and copy their public links to use anywhere
          </p>
        </div>
        <button
          type='button'
          onClick={fetchImages}
          title='Refresh'
          className='p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#ff6533] shadow-2xs transition cursor-pointer'
        >
          <MdRefresh className={`text-xl ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div
        role='button'
        tabIndex={0}
        aria-disabled={uploading}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !uploading) {
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
          if (!uploading) uploadFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          uploading ? 'cursor-wait opacity-70' : 'cursor-pointer'
        } ${
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
          {uploading ? 'Uploading…' : 'Click to choose or drag images here'}
        </p>
        <p className='text-xs text-gray-400'>
          JPG, PNG, WEBP, GIF, AVIF · up to 10 MB each · {MAX_FILES} at a time
        </p>
        <input
          ref={inputRef}
          type='file'
          accept={ACCEPTED_TYPES.join(',')}
          multiple
          hidden
          disabled={uploading}
          onChange={(e) => uploadFiles(e.target.files)}
        />
      </div>

      {loading && images.length === 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className='aspect-square rounded-xl bg-gray-100 animate-pulse' />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-2 py-16 text-gray-400'>
          <MdImage className='text-5xl' />
          <p>No images uploaded yet</p>
        </div>
      ) : (
        <>
          <p className='text-sm text-gray-500'>{images.length} image(s)</p>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {images.map((item) => (
              <div
                key={item.key}
                className='group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow'
              >
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
                      onClick={() => setDeletingImage(item)}
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

      {deletingImage && (
        <ConfirmDeleteModal
          title='Delete Image?'
          description='Any page using this image link will show a broken image.'
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingImage(null)}
        />
      )}
    </div>
  );
}
