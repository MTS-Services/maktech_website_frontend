/**
 * Animated Vertical Lines Component
 * 
 * Creates 4 vertical lines across the page with animated water drop effects
 * Used as a background animation on public pages (not in admin dashboard)
 */

const AnimatedLines = () => {
  // Line positions (percentage from left)
  const linePositions = [15, 38, 62, 85]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {linePositions.map((position, index) => (
        <div
          key={index}
          className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-600/50 to-transparent"
          style={{ left: `${position}%` }}
        >
          {/* Animated capsule/rectangular drop that moves down the line */}
          <div
            className="absolute w-0.5 h-12 rounded-full opacity-70 animate-dropFall"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, #1C1C1C, #FF6533)',
              animationDelay: `${index * 2}s`,
              animationDuration: '8s',
              animationFillMode: 'backwards',
            }}
          />
          {/* Second capsule with different timing */}
          <div
            className="absolute w-0.5 h-10 rounded-full opacity-50 animate-dropFall"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, #1C1C1C, #FF6533)',
              animationDelay: `${index * 2 + 4}s`,
              animationDuration: '8s',
              animationFillMode: 'backwards',
            }}
          />
        </div>
      ))}

      {/* Add CSS animation keyframes */}
      <style>{`
        @keyframes dropFall {
          0% {
            top: -70px;   /* start from above the page */
            opacity: 0;
          }
          4% {
            opacity: 0.7; /* quick fade-in to simulate entering from the top */
          }
          92% {
            opacity: 0.3;
          }
          100% {
            top: calc(100% + 70px);
            opacity: 0;
          }
        }

        .animate-dropFall {
          animation: dropFall 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default AnimatedLines