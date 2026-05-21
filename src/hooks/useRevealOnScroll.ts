import { useEffect } from 'react'

/** Adds class `is-revealed` to elements matching [data-reveal] when they enter the viewport. */
export function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!nodes.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )

    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
