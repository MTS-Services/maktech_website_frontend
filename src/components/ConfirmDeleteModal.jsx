import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

export default function ConfirmDeleteModal({
  title = 'Delete Item?',
  description,
  hint = 'This action is permanent and cannot be undone.',
  confirmLabel = 'Yes, Delete',
  onConfirm,
  onCancel,
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Trigger enter animation on next frame
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const triggerClose = (cb) => {
    setClosing(true);
    setTimeout(cb, 220);
  };

  const overlayStyle = {
    transition: 'background 0.22s ease, backdrop-filter 0.22s ease',
    background: !visible || closing ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.45)',
    backdropFilter: !visible || closing ? 'blur(0px)' : 'blur(6px)',
  };

  const cardStyle = {
    transition:
      'opacity 0.22s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)',
    opacity: !visible || closing ? 0 : 1,
    transform:
      !visible || closing
        ? 'scale(0.94) translateY(10px)'
        : 'scale(1) translateY(0)',
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={overlayStyle}
      onClick={() => triggerClose(onCancel)}
      role='dialog'
      aria-modal='true'
      aria-labelledby='cdm-title'
    >
      <div
        className='relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6'
        style={cardStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className='flex items-center justify-center w-16 h-16 rounded-full bg-red-50 ring-8 ring-red-50/60 mx-auto mb-5'>
          <MdDelete className='text-3xl text-red-500' aria-hidden='true' />
        </div>

        {/* Text */}
        <h2
          id='cdm-title'
          className='text-xl font-bold text-gray-900 text-center mb-1'
        >
          {title}
        </h2>

        {description && (
          <p className='text-sm text-gray-600 text-center font-medium mb-1'>
            {description}
          </p>
        )}

        {hint && (
          <p className='text-xs text-gray-400 text-center mb-7'>{hint}</p>
        )}

        {/* Divider */}
        <div className='border-t border-gray-100 mb-5' />

        {/* Actions */}
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={() => triggerClose(onCancel)}
            className='flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-150 active:scale-[0.97]'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => triggerClose(onConfirm)}
            className='flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 hover:shadow-[0_4px_16px_rgba(239,68,68,0.45)] transition-all duration-150 active:scale-[0.97]'
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
