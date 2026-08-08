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
    <div className="flex min-h-screen flex-col">
      <Header onOpenAbout={() => setAboutOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
