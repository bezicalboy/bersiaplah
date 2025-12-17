"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Target: 10 PM WIB on December 19, 2025
    // WIB is UTC+7
    const targetDate = new Date("2025-12-19T22:00:00+07:00")

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 animate-in fade-in duration-1000">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white text-balance">
          BERSIAPLAH
        </h1>
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* Large Timer Numbers */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <TimeUnit value={timeLeft.days} />
          <Separator />
          <TimeUnit value={timeLeft.hours} />
          <Separator />
          <TimeUnit value={timeLeft.minutes} />
          <Separator />
          <TimeUnit value={timeLeft.seconds} />
        </div>

        {/* Labels */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          <Label text="Days" />
          <Label text="Hours" />
          <Label text="Minutes" />
          <Label text="Seconds" />
        </div>
      </div>

      {/* Date Display */}
      <div className="text-center">
        <p className="text-sm sm:text-base md:text-lg text-white/50 font-light tracking-wide">
          December 19, 2025 • 10:00 PM WIB
        </p>
      </div>
    </div>
  )
}

function TimeUnit({ value }: { value: number }) {
  return (
    <div className="relative">
      <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-extralight tracking-tighter text-white font-mono tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white/30 pb-4 sm:pb-6 md:pb-8 select-none">
      :
    </div>
  )
}

function Label({ text }: { text: string }) {
  return (
    <div className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest text-white/40 font-light">
      {text}
    </div>
  )
}
