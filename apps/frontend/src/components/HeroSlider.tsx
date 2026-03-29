import { useEffect, useState } from 'react'
import { heroSlides } from '../data/siteData'

export function HeroSlider() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroSlides.length)
      setImageIndex(0)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  const currentSlide = heroSlides[slideIndex]
  const currentImage = currentSlide[imageIndex]

  const handleError = () => {
    setImageIndex((current) => {
      if (current < currentSlide.length - 1) {
        return current + 1
      }
      return 0
    })
  }

  return (
    <section className="hero-slider">
      <div className="hero-slider__overlay" />
      <img
        key={`${slideIndex}-${imageIndex}`}
        className="hero-slider__image"
        src={currentImage}
        alt="Wedding event showcase"
        onError={handleError}
      />
      <div className="hero-slider__dots">
        {heroSlides.map((item, index) => (
          <button
            key={item[0]}
            className={index === slideIndex ? 'dot active' : 'dot'}
            onClick={() => {
              setSlideIndex(index)
              setImageIndex(0)
            }}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
