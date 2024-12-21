'use client'

import Image from "next/image"
import { Snowflake, Stars } from 'lucide-react'
import { PauseCircle, PlayCircle } from 'lucide-react'
import { useEffect, useRef, useState } from "react"

import './styles.css'

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://bucket.krissarea.com/events/audio/we-wish-you-a-merry-christmas.mp3')
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "rgb(248, 113, 113)" }}>
      {/* Music Control Button */}
      <button 
        onClick={togglePlay}
        className="fixed top-4 right-4 z-20 text-white hover:scale-110 transition-transform"
        aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
      >
        {isPlaying ? (
          <PauseCircle className="w-8 h-8" />
        ) : (
          <PlayCircle className="w-8 h-8" />
        )}
      </button>

      {/* Floating snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Snowflake
            key={i}
            className="text-white/30 absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto text-center">
        {/* Title with sparkles */}
        <div className="mb-8 relative">
          <Stars className="absolute -left-8 -top-6 text-white/50 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-2">🎄圣诞快乐🎉</h1>
          <Stars className="absolute -right-8 -top-6 text-white/50 animate-pulse" />
        </div>
        
        {/* Subtitle */}
        <h2 className="text-xl text-white mb-12 flex items-center gap-2">
          一起盼望来年的祝福❤️
        </h2>
        
        {/* QR Code Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105">
          <div className="relative w-64 h-64">
            <Image
              src="https://bucket.krissarea.com/events/img/qrcode.png"
              alt="Scan QR Code"
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Scan prompt */}
        <p className="mt-8 text-white text-lg animate-pulse">
          扫描二维码参与活动 ✨
        </p>
      </div>
    </div>
  )
}

