'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

declare global {
  interface Window {
    lenis?: Lenis
  }
}

/**
 * Lenis smooth scroll synced with GSAP ScrollTrigger, fade-up reveals for every
 * `[data-reveal]`, and smooth in-page anchor links. Pauses while any popup with
 * `data-lenis-prevent` (bag drawer, modals) is open.
 */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    window.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash.length < 2 || !document.querySelector(hash)) return
      event.preventDefault()
      lenis.scrollTo(hash, { offset: -16 })
    }
    document.addEventListener('click', onClick)

    // Stop page scrolling behind the bag drawer / popups, resume when they close.
    const popupWatcher = new MutationObserver(() => {
      if (document.querySelector('[data-lenis-prevent]')) lenis.stop()
      else lenis.start()
    })
    popupWatcher.observe(document.body, { childList: true, subtree: true })

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.fromTo('[data-parallax]', { yPercent: -3 }, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
      })
    })

    return () => {
      ctx.revert()
      popupWatcher.disconnect()
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return null
}
