"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, Cloud, Float, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, Heart } from "lucide-react"

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

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Scripture card component
function ScriptureCard({ verse, reference, message, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 * index }}
      className="rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 p-6 backdrop-blur-md"
    >
      <p className="mb-4 font-serif text-xl italic text-white">{verse}</p>
      <p className="mb-6 text-right text-sm text-white/70">— {reference}</p>
      <p className="text-white/90">{message}</p>
    </motion.div>
  )
}

// Main component
export default function FaithPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scriptures = [
    {
      verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      reference: "1 Corinthians 13:4",
      message:
        "This verse reminds me of how I should love you - with patience, kindness, and humility. I'm working to embody these qualities every day.",
    },
    {
      verse:
        "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
      reference: "Colossians 3:13",
      message:
        "I'm asking for your forgiveness, just as we're both forgiven by God. I know forgiveness is a journey, and I'm grateful for your consideration.",
    },
    {
      verse:
        "Therefore, if you are offering your gift at the altar and there remember that your brother or sister has something against you, leave your gift there in front of the altar. First go and be reconciled to them; then come and offer your gift.",
      reference: "Matthew 5:23-24",
      message:
        "This verse teaches me that reconciliation should come before anything else. That's why I'm reaching out to make things right between us.",
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
          <Link href="/promises" className="text-white/70 transition hover:text-white">
            Promises
          </Link>
          <Link href="/faith" className="text-white/90 transition hover:text-white">
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
          <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Faith & Forgiveness</h1>
          <p className="max-w-2xl text-lg text-white/80">
            I admire your faith and how it guides you. These scriptures speak to me about forgiveness, love, and
            reconciliation.
          </p>
        </motion.div>

        <div className="grid w-full max-w-4xl gap-8 md:grid-cols-1 lg:grid-cols-1">
          {scriptures.map((scripture, index) => (
            <ScriptureCard key={index} {...scripture} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 max-w-2xl rounded-xl bg-white/10 p-6 backdrop-blur-md"
        >
          <p className="text-white/90">
            Prashansa, your faith is something I deeply respect. The way you trust in your beliefs inspires me to be a better person. I hope this website shows you how much I value not just you, but also the faith that is so important to you. As we move forward, I want to learn more about your spiritual journey and support you along the way.
          </p>
        </motion.div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/promises"
            className="group flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white transition hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            My Promises
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-pink-500/30 px-6 py-3 text-white transition hover:bg-pink-500/40"
          >
            Back Home
            <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </main>
  )
}
