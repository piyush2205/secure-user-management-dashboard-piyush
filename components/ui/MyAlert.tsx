// src/components/Alert.tsx
import React, { useEffect, useState } from "react"

type AlertProps = {
  message: string
  type?: "success" | "error" | "info"
  duration?: number // auto-close after ms
  onClose?: () => void
}

export default function MyAlert({ message, type = "info", duration = 3000, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!visible) return null

  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  }

  return (
    <div className={`fixed top-5 right-5 border px-4 py-3 rounded-lg shadow-lg ${colors[type]}`}>
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false)
          if (onClose) onClose()
        }}
        className="ml-3 font-bold"
      >
        ✖
      </button>
    </div>
  )
}
