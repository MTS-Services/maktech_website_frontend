import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, revealed]. Attach `ref` to a container; `revealed` flips to
 * true (once, and stays true) the first time that container scrolls into view.
 */
const useRevealOnce = () => {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, revealed]
}

export default useRevealOnce
