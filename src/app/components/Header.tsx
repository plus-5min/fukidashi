import { Link } from 'react-router'

import { MaskedIcon } from '../../components/ui/MaskedIcon'
import { creatorXUrl } from '../data'

type HeaderProps = {
  onOpenAbout: () => void
}

function GuideIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.4851 3.51459C18.3173 1.34513 15.3097 -0.00065601 12 2.39898e-07C8.6903 -0.00065601 5.68233 1.34513 3.51478 3.51459C1.34513 5.68233 -0.00065601 8.6903 2.39898e-07 12C-0.00065601 15.3097 1.34513 18.3177 3.51478 20.4855C5.68247 22.6549 8.6903 24.0007 12 24C15.3097 24.0007 18.3173 22.6549 20.4851 20.4855C22.6548 18.3177 24.0007 15.3097 24 12C24.0007 8.6903 22.6549 5.68233 20.4851 3.51459ZM18.7253 5.27466C20.4483 6.99966 21.5104 9.36947 21.5111 12C21.5104 14.6306 20.4482 17.0003 18.7253 18.7253C17.0003 20.4486 14.6302 21.5104 12 21.5111C9.36966 21.5104 6.99966 20.4486 5.27466 18.7253C3.55153 17.0003 2.48958 14.6306 2.48888 12C2.48958 9.36947 3.55153 6.99966 5.27466 5.27466C6.99966 3.55139 9.36961 2.48958 12 2.48888C14.6302 2.48963 17.0003 3.55139 18.7253 5.27466Z"
        fill="currentColor"
      />
      <path
        d="M11.3789 15.4375C10.7129 15.4375 10.1729 15.9775 10.1729 16.6434C10.1729 17.3087 10.7129 17.8489 11.3789 17.8489C12.0444 17.8489 12.5843 17.3087 12.5843 16.6434C12.5843 15.9775 12.0444 15.4375 11.3789 15.4375Z"
        fill="currentColor"
      />
      <path
        d="M8.64187 8.1491L9.46289 8.80709C9.63004 8.94078 9.86948 8.9359 10.0309 8.79528C10.0309 8.79528 10.1318 8.61298 10.4479 8.43242C10.7656 8.25289 11.1778 8.10846 11.7936 8.10635C12.3309 8.10532 12.7995 8.30567 13.1191 8.57965C13.2778 8.71578 13.3965 8.86714 13.4693 9.00668C13.5426 9.14665 13.5693 9.26918 13.5689 9.36223C13.5675 9.67681 13.5063 9.88273 13.4179 10.0577C13.3507 10.189 13.2631 10.3049 13.15 10.4174C12.9815 10.5862 12.7524 10.7421 12.4959 10.8855C12.2389 11.0299 11.962 11.1577 11.6822 11.3119C11.3631 11.4889 11.0249 11.7428 10.7754 12.124C10.6507 12.3122 10.5533 12.5282 10.4914 12.7552C10.4288 12.9834 10.4006 13.2219 10.4006 13.4653C10.4006 13.725 10.4006 13.9385 10.4006 13.9385C10.4006 14.183 10.5992 14.382 10.8442 14.382H11.9123C12.1571 14.382 12.3556 14.183 12.3556 13.9385C12.3556 13.9385 12.3556 13.725 12.3556 13.4653C12.3556 13.3715 12.3664 13.3108 12.3768 13.2729C12.3943 13.2153 12.4042 13.201 12.4334 13.1659C12.4627 13.1326 12.5223 13.0819 12.632 13.0212C12.7923 12.9312 13.0499 12.8097 13.3417 12.6517C13.7787 12.4129 14.3096 12.0889 14.7576 11.5538C14.9801 11.2865 15.177 10.9653 15.3135 10.5951C15.4503 10.2246 15.5246 9.80801 15.5239 9.36213C15.5235 8.9104 15.401 8.48089 15.2013 8.09998C14.9006 7.52778 14.4294 7.05139 13.8457 6.70554C13.2622 6.36143 12.5581 6.15139 11.7937 6.15139C10.8517 6.14895 10.0688 6.39476 9.47826 6.7347C8.88501 7.07323 8.62931 7.46731 8.62931 7.46731C8.52965 7.55412 8.4734 7.67984 8.47565 7.81142C8.47851 7.94356 8.53907 8.06717 8.64187 8.1491Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface">
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
            <Link
              className="flex size-12 shrink-0 items-center justify-center rounded-full text-secondary-strong transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100"
              to="/guide"
              aria-label="使い方を開く"
            >
              <GuideIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
