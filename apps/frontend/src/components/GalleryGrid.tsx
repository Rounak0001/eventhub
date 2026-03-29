import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export function GalleryGrid({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [images.length])

  if (!images.length) return null

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="paper-panel relative overflow-hidden"
    >
      <div className="relative h-[320px] sm:h-[420px] lg:h-[540px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`Event gallery moment ${activeIndex + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(43,29,24,0.45)] via-[rgba(43,29,24,0.08)] to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
          <div className="max-w-xl text-[color:var(--color-paper)]">
            
            <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">A cinematic preview of signature event moments</h3>
           
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous gallery image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next gallery image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to gallery image ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[color:var(--color-gold-deep)]' : 'w-2.5 bg-[color:var(--color-border)] hover:bg-[color:var(--color-gold-deep)]/60'}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Show previous gallery image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-[color:var(--color-ink)] transition hover:border-[color:var(--color-gold-deep)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Show next gallery image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-[color:var(--color-ink)] transition hover:border-[color:var(--color-gold-deep)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="hidden text-sm text-[color:var(--color-muted)] sm:block">
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
      </div>
    </motion.div>
  )
}
