import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'

import { AboutModal } from './components/AboutModal'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

type SiteLayoutProps = {
  className: string
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function SiteLayout({ className }: SiteLayoutProps) {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className={className}>
      <ScrollToTop />
      <Header onOpenAbout={() => setAboutOpen(true)} />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}

export function GeneratorLayout() {
  return <SiteLayout className="flex min-h-dvh flex-col" />
}

export function AppLayout() {
  return <SiteLayout className="flex min-h-dvh flex-col" />
}
