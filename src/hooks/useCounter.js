import { useState, useEffect } from 'react'

const useCounter = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const startTime = Date.now() + delay
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const now = Date.now()
      
      if (now < startTime) return
      
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(Math.floor(easeOutExpo * end))
      
      if (now >= endTime) {
        setCount(end)
        clearInterval(timer)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [end, duration, delay, isActive])

  const startCounter = () => setIsActive(true)
  const resetCounter = () => {
    setCount(0)
    setIsActive(false)
  }

  return { count, startCounter, resetCounter }
}

export default useCounter