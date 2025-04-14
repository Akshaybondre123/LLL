"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, Cloud, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

// Memory card component
function MemoryCard({ title, date, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      className="rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 p-6 backdrop-blur-md"
    >
      <h3 className="mb-2 font-serif text-xl font-medium text-white">{title}</h3>
      <p className="mb-3 text-sm text-white/70">{date}</p>
      <p className="text-white/90">{description}</p>
    </motion.div>
  )
}

// Main component
export default function MemoriesPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const memories = [
    {
      title: "Our First Meeting",
      date: "April 20, 2021",
      description:
        "Remember when we first met? Your smile lit up everything around us, and I knew right then that you were someone truly special",
    },
    {
      title: "The Park Day",
     
      description:
        "That day at the park when we saw those squirrels and you got so excited. I've never seen anyone love squirrels as much as you do!",
    },
    {
      title: "Rainy Day",
     
      description:
        "Our first date, wrapped in the sound of gentle rain. I still remember how peaceful everything felt—and how just being near you made the world feel warm, even in the cold.",
    },
    {
      title: "Late Night Talks",
      date: "Various Dates",
      description:
        "All those nights we stayed up talking about life, dreams, and everything in between. Your wisdom and perspective always amaze me.",
    },
    {
      title: "Faith Without Borders",
      
      description:
        "We both believe in spirituality, not in judging anyone by their religion. You once misunderstood me, but I truly respect every faith. One day, we’ll go to church together… and also visit a temple. That’s the kind of love I want—with understanding and peace.",
    },
    {
      title: "Our Little Argument",
      date: "Recently",
      description:
        "Even in our disagreement, I saw your strength and conviction. I'm sorry for the hurt I caused, but I'm grateful for the chance to make it right.",
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
          <Link href="/memories" className="text-white/90 transition hover:text-white">
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
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Our Special Memories</h1>
          <p className="max-w-2xl text-lg text-white/80">
            These moments we've shared are precious to me. They remind me of why you're so special and why I'm so sorry
            for hurting you.
          </p>
        </motion.div>

        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, index) => (
            <MemoryCard key={index} {...memory} index={index} />
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white transition hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back Home
          </Link>
          <Link
            href="/promises"
            className="group flex items-center gap-2 rounded-full bg-pink-500/30 px-6 py-3 text-white transition hover:bg-pink-500/40"
          >
            My Promises
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  )
}
