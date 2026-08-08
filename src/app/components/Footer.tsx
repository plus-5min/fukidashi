import { Link } from 'react-router'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="shrink-0">
      <div className="flex items-center justify-center gap-4 p-6">
        <nav className="contents" aria-label="フッター">
          <Link className="text-xs font-medium text-[#c3c3c3] transition hover:text-[#888]" to="/terms">
            利用規約
          </Link>
        </nav>
        <p className="font-poppins text-center text-xs font-medium text-[#c3c3c3]">© {currentYear} AsahinaPipi</p>
      </div>
    </footer>
  )
}
