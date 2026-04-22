"use client"

import React from "react"
import { UserButton } from "@neondatabase/auth/react"

export function UserMenu() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8 w-8 rounded-full bg-surface animate-pulse" />
  }

  return <UserButton size="icon" />
}
