import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function ParticleField() {
  const points = useRef()
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function FloatingOrb() {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#c9a84c"
          wireframe
          distort={0.3}
          speed={2}
          roughness={0.4}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#c9a84c" />
      <ParticleField />
      <FloatingOrb />
    </Canvas>
  )
}
