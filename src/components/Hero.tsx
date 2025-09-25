import { useEffect, useRef, useState } from 'react'

const HERO_IMAGES = [
  { src: '/res/sol_lewitt_46-1920x763.jpg', alt: 'Sol LeWitt Wall Drawing 46' },
  { src: '/res/sol_lewitt_95-1760x699.jpg', alt: 'Sol LeWitt Wall Drawing 95' },
  { src: '/res/lewitt-wd-16.jpg', alt: 'Sol LeWitt Wall Drawing 16' },
]

export default function Hero() {
  const [current, setCurrent] = useState<number>(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 7000)
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="hero">
      {HERO_IMAGES.map((img, idx) => (
        <img key={img.src} src={img.src} alt={img.alt} className={idx === current ? 'active' : ''} />
      ))}
      <h1>Idea Machines: LeWitt,<br /> Language, and Computing</h1>
    </div>
  )
}


