import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './Galaxy.css'

// Custom shader for glowing stars with nebula effects
const vertexShader = `
  attribute float aScale;
  attribute vec3 aColor;
  attribute float aBrightness;
  varying vec3 vColor;
  varying float vScale;
  varying float vBrightness;
  
  void main() {
    vColor = aColor;
    vScale = aScale;
    vBrightness = aBrightness;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = 0.2 * aScale * (400.0 / -viewPosition.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vScale;
  varying float vBrightness;
  
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    
    // Create bright glow effect
    vec3 color = vColor;
    
    // Add white core for bright stars
    float whiteCore = 1.0 - smoothstep(0.0, 0.3, distanceToCenter);
    color += vec3(1.0, 1.0, 1.0) * whiteCore * 0.5;
    
    // Outer glow
    color += vColor * strength * 3.0 * vBrightness;
    
    // Nebula-like soft glow
    float nebulaGlow = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
    color += vColor * nebulaGlow * 0.3;
    
    gl_FragColor = vec4(color, strength * vScale * vBrightness);
  }
`

function GalaxyParticles({ scrollY }) {
  const ref = useRef()
  const materialRef = useRef()
  const count = 200000 // More stars for density

  const { positions, colors, scales, brightness } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const brightness = new Float32Array(count)
    
    const branches = 3
    const spin = 1.5
    const randomness = 0.6
    const randomnessPower = 3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Create spiral galaxy structure
      const radius = Math.random() * 8
      const spinAngle = radius * spin
      const branchAngle = ((i % branches) / branches) * Math.PI * 2

      // Add randomness for realistic distribution
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius * 0.3
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius

      // Spiral arm positions
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Realistic galaxy colors based on position
      let mixedColor
      const normalizedRadius = radius / 8
      
      if (normalizedRadius < 0.15) {
        // Core - bright yellow/orange
        const coreColor = new THREE.Color('#ffaa44')
        const coreBright = new THREE.Color('#ffcc66')
        mixedColor = coreColor.clone().lerp(coreBright, normalizedRadius / 0.15)
      } else if (normalizedRadius < 0.4) {
        // Inner arms - pink to purple
        const pink = new THREE.Color('#ff88cc')
        const purple = new THREE.Color('#cc88ff')
        const t = (normalizedRadius - 0.15) / 0.25
        mixedColor = pink.clone().lerp(purple, t)
      } else if (normalizedRadius < 0.7) {
        // Mid arms - purple to blue
        const purple = new THREE.Color('#aa88ff')
        const blue = new THREE.Color('#4488ff')
        const t = (normalizedRadius - 0.4) / 0.3
        mixedColor = purple.clone().lerp(blue, t)
      } else {
        // Outer arms - blue to cyan
        const blue = new THREE.Color('#4488ff')
        const cyan = new THREE.Color('#44aaff')
        const t = (normalizedRadius - 0.7) / 0.3
        mixedColor = blue.clone().lerp(cyan, t)
      }

      // Add star clusters with white/blue stars
      if (Math.random() > 0.7) {
        const whiteStar = new THREE.Color('#ffffff')
        const blueStar = new THREE.Color('#aaccff')
        mixedColor = whiteStar.clone().lerp(blueStar, Math.random())
      }

      // Add some variation
      mixedColor.lerp(new THREE.Color(1, 1, 1), Math.random() * 0.2)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      // Random scale for stars (some brighter, some dimmer)
      scales[i] = Math.random() * 0.8 + 0.4
      
      // Brightness variation
      brightness[i] = Math.random() * 0.7 + 0.5
    }

    return { positions, colors, scales, brightness }
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015
    }
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aBrightness"
          count={count}
          array={brightness}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={material} ref={materialRef} />
    </points>
  )
}

// Background stars layer
function BackgroundStars() {
  const ref = useRef()
  const count = 50000

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random positions in a sphere
      const radius = 15 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // White to blue stars
      const starColor = new THREE.Color(1, 1, 1)
      starColor.lerp(new THREE.Color(0.7, 0.8, 1), Math.random() * 0.5)

      colors[i3] = starColor.r
      colors[i3 + 1] = starColor.g
      colors[i3 + 2] = starColor.b

      scales[i] = Math.random() * 0.3 + 0.1
    }

    return { positions, colors, scales }
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aScale;
        varying float vScale;
        void main() {
          vScale = aScale;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = 0.1 * aScale * (300.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        varying float vScale;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(1.0, 1.0, 1.0, strength * vScale);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })
  }, [])

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={material} />
    </points>
  )
}

const Galaxy = ({ scrollY = 0 }) => {
  return (
    <div className="galaxy-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
      >
        <BackgroundStars />
        <GalaxyParticles scrollY={scrollY} />
      </Canvas>
    </div>
  )
}

export default Galaxy
