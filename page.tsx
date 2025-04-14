"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, Cloud, Float, Text3D, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Heart } from "lucide-react"

// Subtle cross component
function SubtleCross() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, -8]}>
      <mesh scale={[0.3, 0.5, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#f8f8ff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -0.3, 0]} scale={[0.3, 0.2, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#f8f8ff" transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

// Animated 3D background
function AnimatedBackground() {
  return (
    <>
      <color attach="background" args={["#1e0a30"]} />
      <fog attach="fog" args={["#1e0a30", 5, 30]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#f9c5d1" />
      <pointLight position={[-10, 0, -20]} intensity={0.5} color="#c3cfe2" />
      <pointLight position={[0, -10, 0]} intensity={0.5} color="#8ec5fc" />

      {/* Animated stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

      {/* Decorative clouds */}
      <Cloud position={[-4, -2, -10]} speed={0.2} opacity={0.4} color="#f9c5d1" />
      <Cloud position={[4, 0, -12]} speed={0.1} opacity={0.3} color="#c3cfe2" />
      <Cloud position={[0, 3, -15]} speed={0.3} opacity={0.5} color="#8ec5fc" />

      {/* Subtle Christian element */}
      <SubtleCross />

      {/* 3D Text */}
      <Float position={[0, 0, -10]} speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <Text3D
          font="/fonts/inter_Bold.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Forgive Me
          <meshStandardMaterial color="#f9c5d1" emissive="#f9c5d1" emissiveIntensity={0.5} />
        </Text3D>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Main component
export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <AnimatedBackground />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-20 w-full p-4">
        <div className="mx-auto flex max-w-6xl justify-center gap-6 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
          <Link href="/" className="text-white/90 transition hover:text-white">
            Home
          </Link>
          <Link href="/memories" className="text-white/70 transition hover:text-white">
            Memories
          </Link>
          <Link href="/promises" className="text-white/70 transition hover:text-white">
            Promises
          </Link>
          <Link href="/faith" className="text-white/70 transition hover:text-white">
            Faith
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-xl rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 p-8 backdrop-blur-md"
        >
          <h1 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl">Prashansa, I'm Sorry</h1>

          <p className="mb-8 text-lg text-white/90">
            I know I hurt you, and I'm truly sorry from the bottom of my heart. You deserve so much better, and I want
            to make things right. Your kindness, your beautiful spirit, and your faith inspire me every day.
          </p>

          <p className="mb-10 font-serif text-2xl font-medium italic text-white">
            "If you forgive me, we'll go and buy a squirrel together."
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/memories"
              className="group flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white transition hover:bg-white/30"
            >
              Our Memories
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/promises"
              className="group flex items-center gap-2 rounded-full bg-pink-500/30 px-6 py-3 text-white transition hover:bg-pink-500/40"
            >
              My Promises
              <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-6 text-center text-white/70"
          >
            <p className="text-sm">With faith, hope, and love — but the greatest of these is love.</p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
