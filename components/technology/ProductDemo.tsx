'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface BlurZone {
  /** Percentage from left */
  x: number
  /** Percentage from top */
  y: number
  /** Percentage width */
  w: number
  /** Percentage height */
  h: number
}

interface DemoSlide {
  image: string
  label: string
  title: string
  description: string
  blurZones?: BlurZone[]
}

interface ProductDemoProps {
  slides: DemoSlide[]
  /** Seconds per slide */
  interval?: number
  className?: string
}

export function ProductDemo({
  slides,
  interval = 5,
  className = '',
}: ProductDemoProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)

  // Auto-advance with ref to avoid state race conditions
  useEffect(() => {
    if (paused) return
    progressRef.current = 0
    setProgress(0)

    const tick = 50
    const increment = (tick / (interval * 1000)) * 100

    const timer = setInterval(() => {
      progressRef.current += increment
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setCurrent((c) => (c + 1) % slides.length)
      }
      setProgress(progressRef.current)
    }, tick)

    return () => clearInterval(timer)
  }, [paused, interval, slides.length, current])

  const goTo = (index: number) => {
    progressRef.current = 0
    setCurrent(index)
    setProgress(0)
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Browser chrome frame */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(10,138,173,0.15)]">
        {/* Title bar */}
        <div className="bg-dark-elevated/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/5 rounded-md px-4 py-1 text-xs text-white/40 font-mono">
              Live Product Demo
            </div>
          </div>
          {/* Pause indicator */}
          {paused && (
            <div className="text-xs text-white/30">Paused</div>
          )}
        </div>

        {/* Screenshot area */}
        <div className="relative aspect-[2/1] bg-dark-surface overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority={current === 0}
              />
              {/* Blur zones to redact sensitive information */}
              {slides[current].blurZones?.map((zone, i) => (
                <div
                  key={i}
                  className="absolute backdrop-blur-md bg-dark-surface/40"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.w}%`,
                    height: `${zone.h}%`,
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Text overlay - bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent pt-16 pb-6 px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-accent-mint/20 text-accent-mint border border-accent-mint/30 mb-2">
                  {slides[current].label}
                </span>
                <h4 className="text-white font-bold text-lg md:text-xl mb-1">
                  {slides[current].title}
                </h4>
                <p className="text-white/60 text-sm max-w-lg">
                  {slides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step counter */}
          <div className="absolute top-4 right-4 bg-dark-bg/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/50">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Progress bar + slide indicators */}
        <div className="bg-dark-elevated/80 backdrop-blur-sm px-4 py-3 border-t border-white/5">
          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex-1 group relative"
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              >
                {/* Track */}
                <div className="h-1 rounded-full bg-white/10 overflow-hidden group-hover:bg-white/15 transition-colors">
                  {/* Fill */}
                  {i < current && (
                    <div className="h-full w-full bg-accent-mint/60 rounded-full" />
                  )}
                  {i === current && (
                    <motion.div
                      className="h-full bg-accent-mint rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
                {/* Label on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-bg/90 text-white/70 text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {slide.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
