"use client"

import React from "react"
import { NeonAuthUIProvider } from "@neondatabase/auth/react"
import { authClient } from "@/lib/auth/client"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NeonAuthUIProvider authClient={authClient as any}>
      {children}
    </NeonAuthUIProvider>
  )
}
