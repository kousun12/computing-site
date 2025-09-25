type Item = { src: string; label: string }

const ITEMS: Item[] = [
  { src: '/res/pong-1972.webp', label: 'Pong 1972' },
  { src: '/res/pacman-1980.jpg', label: 'Pac-Man 1980' },
  { src: '/res/oregon-trail.webp', label: 'Oregon Trail 1985' },
  { src: '/res/superstreetfighter.png', label: 'Street Fighter 1991' },
  { src: '/res/doom.webp', label: 'DOOM 1993' },
  { src: '/res/ffviii.jpg', label: 'Final Fantasy VIII 1999' },
  { src: '/res/sims1.webp', label: 'The Sims 2000' },
  { src: '/res/minecraft.png', label: 'Minecraft 2011' },
  { src: '/res/red-dead-2.webp', label: 'Red Dead Redemption 2 2018' },
  { src: '/res/cyberpunk-2-3.webp', label: 'Cyberpunk 2077 2020' },
  { src: '/res/flightsim.webp', label: 'Microsoft Flight Simulator 2020' },
]

export default function ScrollingStrip() {
  // duplicate items for seamless loop
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="scrolling-strip">
      <div className="scroll-content">
        {doubled.map((item, idx) => (
          <div className="scroll-item" key={`${item.src}-${idx}`}>
            <img src={item.src} alt={item.label} />
            <span className="scroll-title">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


