"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, Cloud, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

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

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Promise card component
function PromiseCard({ title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      className="flex gap-4 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 p-6 backdrop-blur-md"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/40">
        <Check className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="mb-2 font-serif text-xl font-medium text-white">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </motion.div>
  )
}

// Main component
export default function PromisesPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const promises = [
    {
      title: "I promise to listen",
      description:
        "I will truly listen to understand, not just to respond. Your thoughts and feelings matter deeply to me.",
    },
    {
      title: "I promise to be patient",
      description:
        "I will be more patient and understanding, especially during difficult moments. I'll take a breath before reacting.",
    },
    {
      title: "I promise to respect your faith",
      description:
        "I will honor and respect your relationship with God, and support your spiritual journey in any way I can.",
    },
    {
      title: "I promise to be honest",
      description:
        "I will always be truthful with you, even when it's difficult. Our relationship deserves complete honesty.",
    },
    {
      title: "I promise to make time",
      description:
        "I will prioritize our time together and be fully present when we're with each other, without distractions.",
    },
    {
      title: "I promise to buy you a squirrel",
      description:
        "Well, maybe not a real one, but I promise to always remember and celebrate the little things that bring you joy.",
    },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <AnimatedBackground />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-20 w-full p-4">
        <div className="mx-auto flex max-w-6xl justify-center gap-6 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
          <Link href="/" className="text-white/70 transition hover:text-white">
            Home
          </Link>
          <Link href="/memories" className="text-white/70 transition hover:text-white">
            Memories
          </Link>
          <Link href="/promises" className="text-white/90 transition hover:text-white">
            Promises
          </Link>
          <Link href="/faith" className="text-white/70 transition hover:text-white">
            Faith
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">My Promises To You</h1>
          <p className="max-w-2xl text-lg text-white/80">
            These are my commitments to you. I want to be better, and these promises are just the beginning of how I
            plan to show you.
          </p>
        </motion.div>

        <div className="grid w-full max-w-3xl gap-6">
          {promises.map((promise, index) => (
            <PromiseCard key={index} {...promise} index={index} />
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/memories"
            className="group flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white transition hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Our Memories
          </Link>
          <Link
            href="/faith"
            className="group flex items-center gap-2 rounded-full bg-pink-500/30 px-6 py-3 text-white transition hover:bg-pink-500/40"
          >
            Faith Journey
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  )
}
