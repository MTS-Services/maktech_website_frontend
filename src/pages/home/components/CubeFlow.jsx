import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Port of Framer's "CubeFlow · Dark" component (cubeflow.framer.website).
// All numbers below are the exact values that component uses.
const SCROLL_DISTANCE = 650; // px of page scroll per slide
const TURN_DURATION = 1.1; // seconds, used when a ticker label is clicked
const CUBE_SIZE = 360;
const TITLE_SCALE = 17; // % of cube size
const FACE_COLOR = "rgb(41, 41, 45)";
const ACCENT = "rgb(255, 96, 56)";
const MUTED = "rgb(151, 151, 157)";
const VIEWPORT_HEIGHT = "max(320px, 100svh)";
const TICKER_MASK =
  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)";

const mod = (n, m) => ((n % m) + m) % m;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (t) => t * t * (3 - 2 * t);

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
};

/**
 * Two 3D cubes (content left, image right) that turn one face per slide as
 * the page scrolls, with a draggable, looping ticker of labels underneath.
 *
 * slides: [{ title, description, label, image, href }]
 */
const CubeFlow = ({ slides }) => {
  const count = slides.length;
  const maxIndex = count - 1;
  const scrollMode = count > 1;

  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const labelRefs = useRef([]);

  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(760);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  // Current slide position (fractional while turning)
  const [progress, setProgressState] = useState(0);
  const progressRef = useRef(0);
  const scrollTargetRef = useRef(0);

  // Click/keyboard jump: { from, to, rotationTo, progress }
  const [jump, setJumpState] = useState(null);
  const jumpRef = useRef(null);
  const queuedJumpRef = useRef(null);
  const jumpFrameRef = useRef(0);

  // Ticker drag
  const [tickerPreview, setTickerPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const releaseRef = useRef(null);
  const suppressClickUntil = useRef(0);

  const setProgress = useCallback((value) => {
    progressRef.current = value;
    setProgressState(value);
  }, []);

  const setJump = (value) => {
    jumpRef.current = value;
    setJumpState(value);
  };

  // ── Layout metrics ──────────────────────────────────────────────────
  const isPhone = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const sideSpace = isPhone ? 64 : isTablet ? 128 : 160;
  const cube = Math.max(
    1,
    Math.min(CUBE_SIZE, (width - sideSpace) / 2, (height - 110) / 1.42),
  );
  const pitch = isPhone
    ? clamp(width / 3, 96, 140)
    : isTablet
      ? clamp(width / 5, 120, 160)
      : clamp(cube * 0.45, 110, 180);
  const bracketInset = isPhone ? 12 : isTablet ? 24 : 36;
  const bracketWidth = isPhone ? 14 : isTablet ? 22 : 30;

  // ── Observers ───────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === outerRef.current && entry.contentRect.width > 0)
          setWidth(entry.contentRect.width);
        if (entry.target === stickyRef.current && entry.contentRect.height > 0)
          setHeight(entry.contentRect.height);
      }
    });
    observer.observe(outerRef.current);
    observer.observe(stickyRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(stickyRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => () => cancelAnimationFrame(jumpFrameRef.current), []);

  // ── Scroll-driven progress ──────────────────────────────────────────
  useEffect(() => {
    if (!scrollMode || !inView || !pageVisible) return;

    let frame = 0;
    let last = 0;
    let dirty = true;

    const measure = () => {
      const rect = outerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = clamp(-rect.top / SCROLL_DISTANCE, 0, count - 1);
      const base = Math.floor(t);
      // Hold for the first 10% of each slide's scroll, then turn with smoothstep
      scrollTargetRef.current =
        base + smoothstep(clamp((t - base - 0.1) / 0.9, 0, 1));
      dirty = false;
    };

    const tick = (now) => {
      frame = 0;
      if (jumpRef.current) {
        last = 0;
        return;
      }
      if (dirty) measure();
      const target = scrollTargetRef.current;
      if (reducedMotion) {
        setProgress(Math.round(target));
        last = 0;
        return;
      }
      const dt = last ? clamp(now - last, 0, 64) : 1000 / 60;
      last = now;
      const diff = target - progressRef.current;
      if (Math.abs(diff) < 8e-4) {
        setProgress(target);
        last = 0;
        return;
      }
      const step = diff * (1 - Math.exp(-dt / 150));
      const maxStep = (3.5 * dt) / 1000;
      setProgress(progressRef.current + clamp(step, -maxStep, maxStep));
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      dirty = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    measure();
    setProgress(
      reducedMotion
        ? Math.round(scrollTargetRef.current)
        : scrollTargetRef.current,
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scrollMode, count, inView, pageVisible, reducedMotion, setProgress]);

  // ── Jump to a slide (one cube turn, even when skipping slides) ──────
  const goTo = (rawTarget) => {
    if (!count) return;
    const target = clamp(rawTarget, 0, maxIndex);
    if (jumpRef.current) {
      queuedJumpRef.current = target;
      return;
    }

    const from = progressRef.current;
    const inPlace = Math.abs(target - from) < 0.001;
    const rotationTo = inPlace
      ? from
      : target > from
        ? Math.floor(from) + 1
        : Math.ceil(from) - 1;

    const finish = () => {
      scrollTargetRef.current = target;
      setProgress(target);
      const rect = outerRef.current?.getBoundingClientRect();
      if (rect) {
        window.scrollTo({
          top: window.scrollY + rect.top + target * SCROLL_DISTANCE,
          behavior: "instant",
        });
      }
      releaseRef.current = null;
      setTickerPreview(null);
      setJump(null);
      const queued = queuedJumpRef.current;
      queuedJumpRef.current = null;
      if (queued !== null && queued !== target) goTo(queued);
    };

    if ((inPlace && !releaseRef.current) || reducedMotion) {
      finish();
      return;
    }

    const duration = inPlace ? Math.min(TURN_DURATION, 0.25) : TURN_DURATION;
    const anim = { from, to: target, rotationTo, progress: 0 };
    setJump(anim);

    let start = null;
    const step = (now) => {
      if (!jumpRef.current) return;
      if (start === null) start = now;
      const t = clamp((now - start) / (duration * 1000), 0, 1);
      const release = releaseRef.current;
      if (release)
        setTickerPreview(
          release.from + (release.to - release.from) * smoothstep(t),
        );
      if (t >= 1) {
        finish();
        return;
      }
      setJump({ ...anim, progress: t });
      jumpFrameRef.current = requestAnimationFrame(step);
    };
    jumpFrameRef.current = requestAnimationFrame(step);
  };

  const handleKeyDown = (e, focusLabel = false) => {
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!dir || !count) return;
    e.preventDefault();
    const from =
      queuedJumpRef.current ??
      jumpRef.current?.to ??
      Math.round(progressRef.current);
    const next = clamp(from + dir, 0, maxIndex);
    goTo(next);
    if (focusLabel)
      labelRefs.current[mod(next, count)]?.focus({ preventScroll: true });
  };

  // ── Ticker drag ─────────────────────────────────────────────────────
  const handlePointerDown = (e) => {
    if (!e.isPrimary || e.button !== 0) return;
    suppressClickUntil.current = 0;
    if (count < 2 || dragRef.current || jumpRef.current) return;
    const element = e.target;
    element.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      from: progressRef.current,
      pitch,
      horizontal: false,
      element,
    };
    setDragging(true);
  };

  const releaseCapture = (drag) => {
    if (drag.element.hasPointerCapture(drag.pointerId))
      drag.element.releasePointerCapture(drag.pointerId);
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        // Vertical gesture: let the page scroll
        dragRef.current = null;
        setDragging(false);
        releaseCapture(drag);
        return;
      }
      drag.horizontal = true;
    }
    e.preventDefault();
    setTickerPreview(clamp(drag.from - dx / drag.pitch, 0, maxIndex));
  };

  const handlePointerEnd = (e, cancelled = false) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (drag.horizontal) {
      suppressClickUntil.current = Date.now() + 400;
      if (cancelled) {
        releaseRef.current = null;
        setTickerPreview(null);
      } else {
        const at = clamp(
          drag.from - (e.clientX - drag.startX) / drag.pitch,
          0,
          maxIndex,
        );
        const snapped = clamp(Math.round(at), 0, maxIndex);
        releaseRef.current = { from: at, to: snapped };
        setTickerPreview(at);
        goTo(snapped);
      }
    }
    releaseCapture(drag);
  };

  // ── Render values ───────────────────────────────────────────────────
  const eased = jump ? smoothstep(jump.progress) : 0;
  const position = jump
    ? jump.from + (jump.to - jump.from) * eased
    : reducedMotion
      ? Math.round(progress)
      : progress;
  const rotation = jump
    ? jump.from + (jump.rotationTo - jump.from) * eased
    : position;
  const active = count
    ? mod(
        Math.round(jump ? (eased < 0.5 ? jump.from : jump.to) : position),
        count,
      )
    : 0;
  const tickerPosition = tickerPreview ?? position;
  const loop = Math.floor(tickerPosition / count);
  const grabCursor = dragging ? "cursor-grabbing" : "cursor-grab";

  const renderFace = (slide, isWall = false) => {
    const description = isWall ? "" : slide.description?.trim();
    const title = slide.title || "UNTITLED";
    const titleSize = Math.max(
      Math.min(12, cube * 0.1),
      Math.min(
        (cube * TITLE_SCALE) / 100,
        (cube * 1.45) / Math.max(3, title.length),
      ),
    );
    const descriptionSize = clamp(15 * Math.min(1, cube / 360), 11, 24);

    return (
      <div
        className="box-border flex h-full w-full items-center justify-center"
        style={{
          padding: cube * 0.045,
          color: ACCENT,
          opacity: isWall ? 0.5 : 1,
        }}
      >
        <div
          className={`relative box-border max-w-full px-2 ${
            description ? "flex max-h-full w-full flex-col overflow-hidden" : ""
          }`}
          style={description ? { gap: clamp(cube * 0.04, 6, 14) } : undefined}
        >
          <span
            className={`font-inter text-center font-light leading-[1.05] tracking-[-0.055em] whitespace-normal wrap-anywhere ${
              description ? "line-clamp-3 shrink-0" : "block"
            }`}
            style={{ fontSize: titleSize }}
          >
            {title}
          </span>
          {description && (
            <span
              title={description}
              className={`font-inter shrink-0 text-center font-normal leading-[1.35em] tracking-normal whitespace-normal wrap-anywhere ${
                isPhone ? "line-clamp-3" : "line-clamp-4"
              }`}
              style={{ fontSize: descriptionSize }}
            >
              {description}
            </span>
          )}
        </div>
      </div>
    );
  };

  // dir -1 = content cube (left), 1 = image cube (right); they turn opposite ways
  const renderCube = (isImage, dir) => {
    const half = cube / 2;
    return (
      <div
        aria-hidden="true"
        className="relative transform-3d will-change-transform"
        style={{
          width: cube,
          height: cube,
          transform: `translateZ(${-half}px) rotateX(${-dir * rotation * 90}deg)`,
        }}
      >
        {[0, 1, 2, 3].map((face) => {
          const virtual = face + 4 * Math.round((rotation - face) / 4);
          const shown = jump && virtual === jump.rotationTo ? jump.to : virtual;
          const slide = slides[mod(shown, count)];
          return (
            <div
              key={face}
              className="absolute inset-0 overflow-hidden backface-hidden"
              style={{
                backgroundColor: FACE_COLOR,
                transform: `rotateX(${dir * face * 90}deg) translateZ(${half}px)`,
              }}
            >
              {isImage && slide.image ? (
                <img
                  src={slide.image}
                  alt=""
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="block h-full w-full object-cover"
                />
              ) : (
                renderFace(slide)
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-black"
                style={{
                  opacity:
                    0.25 *
                    (1 -
                      Math.max(0, Math.cos(((virtual - rotation) * Math.PI) / 2))),
                }}
              />
            </div>
          );
        })}
        {[-1, 1].map((side) => (
          <div
            key={`wall${side}`}
            className="absolute inset-0 backface-hidden"
            style={{
              background: FACE_COLOR,
              transform: `rotateY(${side * 90}deg) translateZ(${half}px)`,
            }}
          >
            {!isImage && renderFace(slides[active], true)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={outerRef}
      className="relative box-border min-h-80 w-full overflow-visible"
      style={{
        height: scrollMode
          ? `calc(${VIEWPORT_HEIGHT} + ${(count - 1) * SCROLL_DISTANCE}px)`
          : VIEWPORT_HEIGHT,
      }}
    >
      <div
        ref={stickyRef}
        className={`${scrollMode ? "sticky" : "relative"} top-0 box-border flex min-h-80 w-full flex-col items-center justify-center overflow-clip`}
        style={{ height: scrollMode ? VIEWPORT_HEIGHT : "100%" }}
      >
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Our work slides"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e)}
          className="relative flex w-full items-center justify-center outline-offset-[-12px]"
          style={{ minHeight: cube * 1.42 }}
        >
          {[-1, 1].map((side) => (
            <div
              key={side}
              aria-hidden="true"
              className={`absolute top-1/2 -translate-y-1/2 border-y opacity-60 ${
                side < 0 ? "border-l" : "border-r"
              }`}
              style={{
                left: side < 0 ? bracketInset : undefined,
                right: side > 0 ? bracketInset : undefined,
                width: bracketWidth,
                height: cube * 1.13,
                borderColor: MUTED,
              }}
            />
          ))}

          <Link
            to={slides[active]?.href ?? "#"}
            tabIndex={-1}
            className="relative flex transform-3d perspective-[1200px] perspective-origin-center"
            style={{ width: cube * 2, height: cube }}
          >
            {renderCube(false, -1)}
            {renderCube(true, 1)}
          </Link>

          <span className="sr-only">
            {slides[active]?.title}, slide {active + 1} of {count}
            {slides[active]?.description ? `. ${slides[active].description}` : ""}
          </span>
        </div>

        <nav
          aria-label="Our work slide navigation"
          onKeyDown={(e) => handleKeyDown(e, true)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => handlePointerEnd(e)}
          onPointerCancel={(e) => handlePointerEnd(e, true)}
          onLostPointerCapture={(e) => handlePointerEnd(e, true)}
          onClickCapture={(e) => {
            if (e.detail !== 0 && Date.now() < suppressClickUntil.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClickUntil.current = 0;
            }
          }}
          className={`relative h-12 w-full touch-pan-y touch-pinch-zoom overflow-hidden select-none ${grabCursor}`}
          style={{
            marginTop: isPhone ? Math.max(12, cube * 0.04) : cube * 0.04,
            maskImage: TICKER_MASK,
            WebkitMaskImage: TICKER_MASK,
          }}
        >
          <div
            className="absolute top-0 left-0 flex"
            style={{
              width: count * 3 * pitch,
              transform: `translateX(${
                width / 2 - pitch / 2 - (tickerPosition - loop * count + count) * pitch
              }px)`,
            }}
          >
            {Array.from({ length: count * 3 }, (_, n) => {
              const index = mod(n, count);
              const isCurrent = loop * count + n - count === Math.round(tickerPosition);
              const isMiddleCopy = n >= count && n < count * 2;
              const label = slides[index].label || slides[index].title;
              return (
                <button
                  key={n}
                  type="button"
                  ref={
                    isMiddleCopy
                      ? (el) => {
                          labelRefs.current[index] = el;
                        }
                      : undefined
                  }
                  tabIndex={isMiddleCopy && index === active ? 0 : -1}
                  aria-hidden={!isMiddleCopy}
                  aria-current={isMiddleCopy && index === active ? "step" : undefined}
                  title={slides[index].title}
                  onClick={() => goTo(index)}
                  className={`font-inter min-h-11 overflow-hidden border-0 bg-transparent px-2 py-3 text-xs leading-none font-normal tracking-[-0.025em] text-ellipsis whitespace-nowrap outline-offset-[5px] hover:opacity-100! focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-[rgb(255,96,56)] ${grabCursor}`}
                  style={{
                    flex: `0 0 ${pitch}px`,
                    width: pitch,
                    color: isCurrent ? ACCENT : MUTED,
                    opacity: isCurrent ? 1 : 0.9,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CubeFlow;
