import { useState, useEffect, useRef } from 'react';
import {
  MdCalendarToday,
  MdPublic,
  MdCheckCircle,
  MdEventBusy,
  MdClose,
  MdCheck,
} from 'react-icons/md';
import { getLenisInstance } from '../utils/lenisManager';

/**
 * MeetingBookingModal
 * A high-end dark glass modal allowing users to pick a date & time slot
 * with automated timezone conversion from Bangladesh Standard Time (BST).
 */
const MeetingBookingModal = ({
  isOpen,
  onClose,
  initialSlot,
  onConfirmSlot,
  bookingDate,
  setBookingDate,
  minDateStr,
  visitorTimezone,
  setVisitorTimezone,
  timezoneOptions,
  tzSummary,
  slots,
  loadingSlots,
}) => {
  const [tempSlot, setTempSlot] = useState(initialSlot || null);
  const [showTzPicker, setShowTzPicker] = useState(false);
  const dateInputRef = useRef(null);

  const handleOpenDatePicker = (e) => {
    if (dateInputRef.current) {
      try {
        if (typeof dateInputRef.current.showPicker === 'function') {
          dateInputRef.current.showPicker();
        } else {
          dateInputRef.current.focus();
        }
      } catch (err) {
        try {
          dateInputRef.current.focus();
        } catch {}
      }
    }
  };

  // Sync temp slot whenever modal opens or initialSlot changes
  useEffect(() => {
    if (isOpen) {
      setTempSlot(initialSlot || null);
    }
  }, [isOpen, initialSlot]);

  // Lock body & lenis scrolling when modal is open to prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const lenis = getLenisInstance();
    if (lenis) {
      try {
        lenis.stop();
      } catch {
        // ignore if lenis is not initialized
      }
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      if (lenis) {
        try {
          lenis.start();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSlotClick = (slot) => {
    if (!slot.isAvailable) return;
    if (tempSlot?.iso === slot.iso) {
      setTempSlot(null);
    } else {
      setTempSlot(slot);
    }
  };

  const handleConfirm = () => {
    onConfirmSlot(tempSlot);
    onClose();
  };

  const handleClear = () => {
    setTempSlot(null);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-200 overscroll-contain'>
      <div className='relative w-full max-w-3xl bg-[#232323] border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden text-white'>
        {/* Header */}
        <div className='p-3.5 sm:p-5 border-b border-white/10 flex items-start justify-between gap-2.5 sm:gap-3 bg-[#2a2a2a]/60'>
          <div className='flex items-center gap-2.5 sm:gap-3 min-w-0'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 text-[#ff6533] flex items-center justify-center text-base sm:text-xl shrink-0 border border-orange-500/30'>
              <MdCalendarToday />
            </div>
            <div className='min-w-0'>
              <h3 className='text-sm sm:text-xl font-bold text-white leading-tight truncate'>
                Select Meeting Date &amp; Time
              </h3>
              <p className='text-[10px] sm:text-xs text-gray-400 mt-0.5 leading-snug'>
                Choose a convenient date &amp; time &bull; Automatically converted to your local timezone
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0'
            aria-label='Close modal'
          >
            <MdClose className='text-lg sm:text-xl' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-3 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 overscroll-contain'>
          {/* Controls: Date Picker & Auto-detected Timezone */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start'>
            {/* Date Input */}
            <div>
              <label
                onClick={handleOpenDatePicker}
                className='block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5 cursor-pointer select-none'
              >
                <MdCalendarToday className='text-[#ff6533]' />
                <span>Meeting Date</span>
              </label>
              <div
                onClick={handleOpenDatePicker}
                className='relative cursor-pointer group'
              >
                <input
                  ref={dateInputRef}
                  type='date'
                  min={minDateStr}
                  value={bookingDate}
                  onClick={handleOpenDatePicker}
                  onFocus={handleOpenDatePicker}
                  onChange={(e) => {
                    setBookingDate(e.target.value);
                    setTempSlot(null);
                  }}
                  className='meeting-date-picker-input w-full pl-3.5 pr-10 py-2.5 bg-[#333333] group-hover:bg-[#383838] border border-white/10 group-hover:border-[#ff6533]/50 rounded-xl text-white text-xs sm:text-sm [color-scheme:dark] focus:outline-none focus:border-orange-bg-cta transition cursor-pointer'
                />
                <div className='absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-white transition-colors flex items-center justify-center z-0'>
                  <MdCalendarToday className='text-sm sm:text-base text-gray-400 group-hover:text-[#ff6533] transition-colors' />
                </div>
              </div>

              {/* Ensure webkit date picker indicator covers the entire input box */}
              <style>{`
                .meeting-date-picker-input {
                  position: relative;
                  cursor: pointer;
                }
                .meeting-date-picker-input::-webkit-calendar-picker-indicator {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  cursor: pointer;
                  z-index: 5;
                }
              `}</style>
            </div>

            {/* Auto-detected Local Timezone Card */}
            <div>
              <div className='flex items-center justify-between mb-1.5'>
                <label className='text-xs font-semibold text-gray-300 flex items-center gap-1.5'>
                  <MdPublic className='text-emerald-400' />
                  <span>Your Local Timezone</span>
                </label>
                <button
                  type='button'
                  onClick={() => setShowTzPicker((prev) => !prev)}
                  className='text-[11px] font-medium text-[#ff8a5a] hover:text-[#ff7844] hover:underline cursor-pointer transition'
                >
                  {showTzPicker ? 'Keep detected' : 'Change timezone'}
                </button>
              </div>

              <div className='p-2.5 bg-[#333333] border border-emerald-500/25 rounded-xl flex items-center justify-between gap-2 shadow-xs'>
                <div className='flex items-center gap-2 min-w-0'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse' />
                  <div className='min-w-0'>
                    <p className='text-xs font-bold text-white truncate'>
                      {tzSummary.label}
                    </p>
                    <p className='text-[10px] text-emerald-400/90 truncate'>
                      Auto-detected from browser
                    </p>
                  </div>
                </div>
                <span className='text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0'>
                  Auto
                </span>
              </div>

              {/* Optional Timezone Override Selector */}
              {showTzPicker && (
                <div className='mt-2 animate-in fade-in duration-150'>
                  <select
                    value={visitorTimezone}
                    onChange={(e) => {
                      setVisitorTimezone(e.target.value);
                      setTempSlot(null);
                    }}
                    className='w-full px-3 py-2 bg-[#2c2c2c] border border-orange-500/40 rounded-xl text-white text-xs [color-scheme:dark] focus:outline-none focus:border-orange-bg-cta transition cursor-pointer'
                  >
                    {timezoneOptions.map((tz) => (
                      <option key={tz.value} value={tz.value} className='bg-[#2c2c2c] text-white'>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Slots Grid Header */}
          <div className='space-y-2.5 pt-1'>
            <div className='flex items-center justify-between text-xs text-gray-400'>
              <span className='font-medium text-gray-300'>
                Available Slots in your local timezone ({tzSummary.cityName}):
              </span>
              {loadingSlots && (
                <span className='inline-flex items-center gap-1.5 text-[#ff8a5a] text-xs font-medium'>
                  <span className='w-3 h-3 border-2 border-[#ff6533] border-t-transparent rounded-full animate-spin' />
                  <span>Checking availability...</span>
                </span>
              )}
            </div>

            {/* 3-Column Slot Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-0.5 sm:pr-1'>
              {slots.map((slot) => {
                const isSelected = tempSlot?.iso === slot.iso;
                const isBooked = slot.isBooked;
                const isPast = slot.isPast;

                if (isBooked) {
                  return (
                    <div
                      key={slot.id}
                      title='This time slot is already booked'
                      className='p-2 sm:p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300/80 cursor-not-allowed select-none transition-all flex flex-col justify-between min-h-[70px] sm:min-h-[76px]'>
                      <div className='flex items-center justify-between gap-1 mb-1'>
                        <span className='text-[9px] sm:text-[10px] text-gray-400 truncate'>{slot.localDateLabel}</span>
                        <span className='inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/25 text-rose-300 border border-rose-500/30 shrink-0'>
                          <MdEventBusy className='text-[9px]' /> Booked
                        </span>
                      </div>
                      <p className='text-[11px] sm:text-sm font-bold line-through text-rose-300/70 truncate'>
                        {slot.localTimeLabel}
                      </p>
                      
                    </div>
                  );
                }

                if (isPast) {
                  return (
                    <div
                      key={slot.id}
                      className='p-2 sm:p-2.5 rounded-xl border border-white/5 bg-gray-800/40 text-gray-500 cursor-not-allowed select-none flex flex-col justify-between min-h-[70px] sm:min-h-[76px]'>
                      <div className='flex items-center justify-between gap-1 mb-1'>
                        <span className='text-[9px] sm:text-[10px] text-gray-500 truncate'>{slot.localDateLabel}</span>
                        <span className='px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-gray-700/60 text-gray-400 shrink-0'>
                          Passed
                        </span>
                      </div>
                      <p className='text-[11px] sm:text-sm font-medium text-gray-500 truncate'>
                        {slot.localTimeLabel}
                      </p>
                      
                    </div>
                  );
                }

                if (isSelected) {
                  return (
                    <button
                      type='button'
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      className='p-2 sm:p-2.5 rounded-xl border-2 border-white/60 bg-gradient-to-r from-[#ff6533] to-[#e5501a] text-white shadow-[0_4px_16px_rgba(255,101,51,0.5)] ring-2 ring-[#ff6533] transition-all cursor-pointer flex flex-col justify-between text-left min-h-[70px] sm:min-h-[76px]'>
                      <div className='flex items-center justify-between gap-1 mb-1 w-full'>
                        <span className='text-[9px] sm:text-[10px] text-white/95 font-medium truncate'>{slot.localDateLabel}</span>
                        <span className='inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white text-[#ff6533] shadow-xs shrink-0'>
                          <MdCheckCircle className='text-[9px]' /> Selected
                        </span>
                      </div>
                      <p className='text-[11px] sm:text-sm font-extrabold text-white truncate'>
                        {slot.localTimeLabel}
                      </p>
                      
                    </button>
                  );
                }

                return (
                  <button
                    type='button'
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    className='p-2 sm:p-2.5 rounded-xl border border-white/10 bg-[#333333] hover:bg-[#444444] hover:border-[#ff6533] text-white transition-all duration-150 cursor-pointer flex flex-col justify-between text-left group min-h-[70px] sm:min-h-[76px]'>
                    <div className='flex items-center justify-between gap-1 mb-1 w-full'>
                      <span className='text-[9px] sm:text-[10px] text-gray-400 group-hover:text-gray-300 truncate'>{slot.localDateLabel}</span>
                      <span className='px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 group-hover:bg-emerald-500/30 shrink-0'>
                        Available
                      </span>
                    </div>
                    <p className='text-[11px] sm:text-sm font-bold text-white group-hover:text-[#ff8a5a] transition-colors truncate'>
                      {slot.localTimeLabel}
                    </p>
                    
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='p-4 sm:p-5 border-t border-white/10 bg-[#262626] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4'>
          {/* Selected Slot Information */}
          <div className='min-w-0 flex-1'>
            {tempSlot ? (
              <div className='flex items-start gap-2.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-[#ff6533] shadow-[0_0_8px_rgba(255,101,51,0.7)] mt-1 shrink-0' />
                <div className='space-y-1 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <span className='text-xs text-gray-400'>Selected Slot:</span>
                    <strong className='text-xs sm:text-sm font-bold text-white'>
                      {tempSlot.localDateLabel} at {tempSlot.localTimeLabel}
                    </strong>
                    <span className='text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-md'>
                      {tzSummary.cityName} Time
                    </span>
                  </div>
                  <p className='text-[11px] text-gray-400'>
                    We will send a meeting invitation and video call link directly to your email.
                  </p>
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-2 text-xs text-gray-400'>
                <span className='w-2 h-2 rounded-full bg-gray-600 shrink-0' />
                <span>Click an available slot above to choose your meeting time.</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-2 sm:gap-2.5 justify-end shrink-0 w-full sm:w-auto'>
            {tempSlot && (
              <button
                type='button'
                onClick={handleClear}
                className='px-3 py-2 text-xs font-semibold text-gray-400 hover:text-white transition cursor-pointer'
              >
                Clear
              </button>
            )}
            <button
              type='button'
              onClick={onClose}
              className='flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-gray-300 bg-white/10 hover:bg-white/15 rounded-xl transition cursor-pointer text-center'
            >
              Cancel
            </button>
            <button
              type='button'
              disabled={!tempSlot}
              onClick={handleConfirm}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white rounded-xl transition cursor-pointer text-center ${
                tempSlot
                  ? 'bg-gradient-to-r from-[#ff6533] to-[#e5501a] shadow-[0_4px_16px_rgba(255,101,51,0.4)] hover:shadow-[0_6px_20px_rgba(255,101,51,0.55)] active:scale-95'
                  : 'bg-gray-700/60 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MdCheck className='text-sm' />
              <span>Confirm Slot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingBookingModal;
