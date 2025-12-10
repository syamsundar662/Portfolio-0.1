import { useEffect, useRef } from 'react'
import './SolarSystem.css'

const SolarSystem = ({ scrollY = 0, activePlanet = 'sun' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const planets = [
      { name: 'mercury', size: 12, distance: 100, orbitSpeed: 0.02, rotationSpeed: 0.5, color: '#8B7355', startAngle: 0 },
      { name: 'venus', size: 18, distance: 140, orbitSpeed: 0.015, rotationSpeed: -0.3, color: '#FFC649', startAngle: Math.PI / 3 },
      { name: 'earth', size: 20, distance: 180, orbitSpeed: 0.012, rotationSpeed: 1, color: '#4A90E2', startAngle: Math.PI * 2 / 3 },
      { name: 'mars', size: 16, distance: 230, orbitSpeed: 0.01, rotationSpeed: 0.8, color: '#EF5F5F', startAngle: Math.PI },
      { name: 'jupiter', size: 40, distance: 300, orbitSpeed: 0.008, rotationSpeed: 2.5, color: '#D8CA9D', startAngle: Math.PI * 4 / 3 },
      { name: 'saturn', size: 35, distance: 380, orbitSpeed: 0.006, rotationSpeed: 2, color: '#FAD5A5', startAngle: Math.PI * 5 / 3 },
    ]

    let orbitAngle = 0
    let rotationAngle = 0
    let centerX = window.innerWidth / 2
    let centerY = window.innerHeight / 2

    let animationFrameId
    
    const animate = () => {
      // Revolution (orbiting around sun) - continuous, affected by scroll speed
      const scrollFactor = 1 + (scrollY * 0.0001)
      orbitAngle += (0.003 * scrollFactor)
      
      // Rotation (spinning on axis) - continuous
      rotationAngle += 0.01
      
      planets.forEach((planet) => {
        const planetElement = container.querySelector(`.planet-${planet.name}`)
        const planetCore = planetElement?.querySelector('.planet-core')
        
        if (planetElement && planetCore) {
          // Calculate orbital position (revolution) - proper circular orbit
          const planetOrbitAngle = orbitAngle * planet.orbitSpeed + planet.startAngle
          
          // Calculate position on circular orbit (relative to center)
          const orbitX = Math.cos(planetOrbitAngle) * planet.distance
          const orbitY = Math.sin(planetOrbitAngle) * planet.distance
          
          // Apply revolution (orbital position) - translate from center
          planetElement.style.transform = `translate(${orbitX}px, ${orbitY}px)`
          
          // Apply rotation (spinning on axis)
          const currentRotation = rotationAngle * planet.rotationSpeed
          planetCore.style.transform = `rotate(${currentRotation}deg)`
          
          // Highlight active planet
          if (planet.name === activePlanet) {
            planetElement.classList.add('active')
            planetElement.style.filter = 'brightness(1.5) drop-shadow(0 0 20px ' + planet.color + ')'
          } else {
            planetElement.classList.remove('active')
            planetElement.style.filter = 'brightness(1)'
          }
        }
      })

      // Animate sun - rotation only (stays at center)
      const sunElement = container.querySelector('.sun')
      const sunCore = sunElement?.querySelector('.sun-core')
      if (sunElement && sunCore) {
        // Sun rotation (spinning on axis)
        const sunRotation = rotationAngle * 0.5 // Slower rotation for sun
        sunElement.style.transform = `translate(-50%, -50%)`
        sunCore.style.transform = `rotate(${sunRotation}deg)`
        
        if (activePlanet === 'sun') {
          sunElement.classList.add('active')
        } else {
          sunElement.classList.remove('active')
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()

    const handleResize = () => {
      centerX = window.innerWidth / 2
      centerY = window.innerHeight / 2
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [scrollY, activePlanet])

  return (
    <div ref={containerRef} className="solar-system">
      <div className="sun">
        <div className="sun-core">
          <div className="sun-surface"></div>
          <div className="sun-flare flare-1"></div>
          <div className="sun-flare flare-2"></div>
          <div className="sun-flare flare-3"></div>
        </div>
      </div>
      <div className="planet planet-mercury">
        <div className="planet-core">
          <div className="planet-surface mercury-surface"></div>
          <div className="planet-shadow"></div>
        </div>
      </div>
      <div className="planet planet-venus">
        <div className="planet-core">
          <div className="planet-surface venus-surface"></div>
          <div className="planet-atmosphere"></div>
          <div className="planet-shadow"></div>
        </div>
      </div>
      <div className="planet planet-earth">
        <div className="planet-core">
          <div className="planet-surface earth-surface">
            <div className="earth-continent continent-1"></div>
            <div className="earth-continent continent-2"></div>
            <div className="earth-continent continent-3"></div>
          </div>
          <div className="earth-atmosphere"></div>
          <div className="planet-shadow"></div>
        </div>
      </div>
      <div className="planet planet-mars">
        <div className="planet-core">
          <div className="planet-surface mars-surface">
            <div className="mars-feature feature-1"></div>
            <div className="mars-feature feature-2"></div>
          </div>
          <div className="planet-shadow"></div>
        </div>
      </div>
      <div className="planet planet-jupiter">
        <div className="planet-core">
          <div className="planet-surface jupiter-surface">
            <div className="jupiter-band band-1"></div>
            <div className="jupiter-band band-2"></div>
            <div className="jupiter-band band-3"></div>
            <div className="jupiter-storm"></div>
          </div>
          <div className="planet-shadow"></div>
        </div>
      </div>
      <div className="planet planet-saturn">
        <div className="planet-core">
          <div className="planet-surface saturn-surface">
            <div className="saturn-band band-1"></div>
            <div className="saturn-band band-2"></div>
          </div>
          <div className="planet-shadow"></div>
        </div>
        <div className="saturn-ring">
          <div className="ring-inner"></div>
          <div className="ring-middle"></div>
          <div className="ring-outer"></div>
        </div>
      </div>
      
      {/* Realistic orbital paths */}
      <svg className="orbits-svg" viewBox="0 0 800 800">
        <ellipse className="orbit-path orbit-1" cx="400" cy="400" rx="100" ry="100" />
        <ellipse className="orbit-path orbit-2" cx="400" cy="400" rx="140" ry="140" />
        <ellipse className="orbit-path orbit-3" cx="400" cy="400" rx="180" ry="180" />
        <ellipse className="orbit-path orbit-4" cx="400" cy="400" rx="230" ry="230" />
        <ellipse className="orbit-path orbit-5" cx="400" cy="400" rx="300" ry="300" />
        <ellipse className="orbit-path orbit-6" cx="400" cy="400" rx="380" ry="380" />
      </svg>
    </div>
  )
}

export default SolarSystem
