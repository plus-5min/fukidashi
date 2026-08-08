export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="shrink-0">
      <div className="p-6">
        <p className="font-poppins text-center text-xs font-medium text-[#c3c3c3]">© {currentYear} AsahinaPipi</p>
      </div>
    </footer>
  )
}
