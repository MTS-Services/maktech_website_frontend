/**
 * Animated Vertical Lines Component
 * 
 * Creates vertical lines across the page with animated water drop effects.
 * Shows 2 lines on mobile, 4 on desktop for a cleaner responsive look.
 * Used as a background animation on public pages (not in admin dashboard)
 */

import { useState, useEffect } from 'react'

const AnimatedLines = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 425)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // 2 lines on mobile, 4 on desktop
  const linePositions = isMobile ? [15,30, 70,85] : [12, 30, 50, 68,88]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {linePositions.map((position, index) => (
        <div
          key={index}
          className="absolute -top-15 bottom-0 w-px bg-linear-to-b from-transparent via-gray-600/10 to-transparent"
          style={{ left: `${position}%` }}
        >
          {/* Animated capsule/rectangular drop that moves down the line */}
          <div
            className="absolute w-0.5 h-12 rounded-full opacity-30 animate-dropFall"
            style={{
              left: '50%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,101,51,0.3))',
              animationDelay: `${index * 2}s`,
              animationDuration: '10s',
            }}
          />
          {/* Second capsule with different timing */}
          <div
            className="absolute w-0.5 h-10 rounded-full opacity-20 animate-dropFall"
            style={{
              left: '50%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,101,51,0.3))',
              animationDelay: `${index * 2 + 4}s`,
              animationDuration: '10s',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default AnimatedLines