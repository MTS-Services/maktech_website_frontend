import { useState, useRef, useEffect } from "react";

const CustomSelect = ({ value, onChange, options, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll propagation when scrolling inside dropdown
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Prevent page scroll when:
      // - Scrolling down and not at bottom
      // - Scrolling up and not at top
      if (
        (e.deltaY < 0 && !isAtTop) ||
        (e.deltaY > 0 && !isAtBottom)
      ) {
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
    };

    if (isOpen) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      scrollContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-bg-cta transition-all duration-200 text-left flex items-center justify-between"
      >
        <span className={selectedOption ? "text-white" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-50 w-full mt-2 bg-[#3F3F3F] border border-white/10 rounded-lg shadow-lg overflow-hidden transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 max-h-80"
            : "opacity-0 scale-y-95 max-h-0 pointer-events-none"
        }`}
      >
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto max-h-64 custom-scrollbar"
          style={{ overscrollBehavior: 'contain' }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 text-left transition-colors duration-150 ${
                value === option.value
                  ? "bg-orange-bg-cta text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
