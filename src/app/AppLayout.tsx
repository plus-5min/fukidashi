import { useState } from 'react'
import { Outlet } from 'react-router'

import { AboutModal } from './components/AboutModal'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

type SiteLayoutProps = {
  className: string
}

function SiteLayout({ className }: SiteLayoutProps) {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className={className}>
      <Header onOpenAbout={() => setAboutOpen(true)} />
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}

export function GeneratorLayout() {
  return <SiteLayout className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden" />
}

export function AppLayout() {
  return <SiteLayout className="flex min-h-dvh flex-col" />
}
