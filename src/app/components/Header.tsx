import { Link } from 'react-router'

import { MaskedIcon } from '../../components/ui/MaskedIcon'
import { creatorXUrl } from '../data'

type HeaderProps = {
  onOpenAbout: () => void
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="bg-surface">
      <div className="h-16 px-8 max-lg:px-4">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <h1 className="font-poppins flex items-center text-2xl font-bold leading-none">
              <Link className="flex items-center gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" to="/">
                <MaskedIcon className="size-8 bg-primary" src="/assets/fukidashi-logo.svg" />
                fukidashi
              </Link>
            </h1>
            <a
              className="flex shrink-0 items-center gap-1 rounded-lg text-sm font-semibold text-foreground-muted transition-colors duration-200 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hidden"
              href={creatorXUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="アサヒナピピのXを開く"
            >
              <span>by アサヒナピピ</span>
              <span className="text-secondary-strong" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="font-poppins cursor-pointer rounded-lg px-2 text-base font-semibold transition-colors duration-200 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:text-foreground"
              onClick={onOpenAbout}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
