import { useState } from 'react'
import { Outlet } from 'react-router'

import { useModalScrollLock } from '../hooks/useModalScrollLock'
import { AboutModal } from './components/AboutModal'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export function AppLayout() {
  const [aboutOpen, setAboutOpen] = useState(false)

  useModalScrollLock(aboutOpen)

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header onOpenAbout={() => setAboutOpen(true)} />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
