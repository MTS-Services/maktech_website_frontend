/*
  HOW THIS WORKS:
  - The outer wrapper (absolute, overflow:hidden) defines the cross zone — never moves
  - Strip1 is rotated +7° (↘), Strip2 is rotated -7° (↗) — they cross in the middle
  - Inside each strip, a wide flex track scrolls via translateX ONLY
  - Because the container is rotated and overflow:hidden, the band stays 100% fixed
  - Only the logos inside move — left to right along the diagonal
*/

const LOGO_COUNT = 20; // logos per set (2 sets = seamless loop)

// Logo image component
const LogoItem = () => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 36px",
      whiteSpace: "nowrap",
      userSelect: "none",
      height: "40px",
      flexShrink: 0,
    }}
  >
    <img 
      src="/Diagonal/maktech_logo.png" 
      alt="maktech logo"
      style={{
        width: "100px",
        height: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
);

const LogoTrack = ({ duration = 22 }) => {
  const logos = Array(LOGO_COUNT).fill(null);
  return (
    /*
      Two identical sets side-by-side (total width = 2 × one-set).
      translateX animates from 0 → -50%, so when the first set exits,
      the second set is already in place — perfectly seamless loop.
    */
    <div
      style={{
        display: "flex",
        width: "max-content",
        animation: `marquee-logos ${duration}s linear infinite`,
        willChange: "transform",
      }}
    >
      {/* Set A */}
      {logos.map((_, i) => (
        <LogoItem key={`a-${i}`} />
      ))}
      {/* Set B — identical clone for seamless loop */}
      {logos.map((_, i) => (
        <LogoItem key={`b-${i}`} />
      ))}
    </div>
  );
};

const DiagonalMarquee = () => {
  return (
    <>
      <style>{`
        @keyframes marquee-logos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Diagonal Marquee ──────────────────────────────────────────────
          Zone: position:absolute so it overlaps Banner → About boundary.
          overflow:hidden clips both strips to this rectangle.
          The two strips cross inside, forming a fixed X.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden xl:block pointer-events-none diagonal-marquee"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 20,
          height: "306px",
          overflow: "hidden", // CRITICAL — prevents layout shift
        }}
      >
        {/* ── Strip 1 ↘ (top-left → bottom-right) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            /* Wider than container so rotation never leaves gaps at edges */
            width: "160%",
            height: "50px",
            /* The rotation creates the fixed diagonal — this div never moves */
            transform: "translate(-50%, -50%) rotate(6deg)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            /* Glass Morphism Effect */
            background: "rgba(255, 255, 255, 0.01)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <LogoTrack duration={30} />
        </div>

        {/* ── Strip 2 ↗ (bottom-left → top-right) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "160%",
            height: "50px",
            transform: "translate(-50%, -50%) rotate(-6deg)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            /* Glass Morphism Effect */
            background: "rgba(255, 255, 255, 0.01)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <LogoTrack duration={30} />{" "}
          {/* slightly different speed for visual depth */}
        </div>
      </div>
    </>
  );
};

export default DiagonalMarquee;
