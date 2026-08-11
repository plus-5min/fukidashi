import { Link } from 'react-router'

type HeaderProps = {
  onOpenAbout: () => void
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="bg-white">
      <div className="h-16 px-8 max-lg:px-4">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex gap-4">
            <h1 className="font-poppins flex items-center text-2xl font-bold leading-none">
              <Link className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" to="/">
                <img className="size-8" src="/assets/fukidashi-logo.svg" alt="" aria-hidden="true" />
                fukidashi
              </Link>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="font-poppins cursor-pointer rounded-lg px-2 text-base font-semibold transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100"
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
