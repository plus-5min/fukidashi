import { Link } from 'react-router'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="shrink-0">
      <div className="flex items-center justify-center gap-4 p-4">
        <nav className="contents" aria-label="フッター">
          <Link
            className="rounded-lg px-2 text-xs font-medium text-foreground-muted transition-colors duration-200 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:text-foreground-muted"
            to="/terms"
          >
            利用規約
          </Link>
        </nav>
        <p className="font-poppins text-center text-xs font-medium text-foreground-muted">© {currentYear} AsahinaPipi</p>
      </div>
    </footer>
  )
}
