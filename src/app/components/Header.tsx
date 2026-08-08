type HeaderProps = {
  onOpenAbout: () => void
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="shrink-0 bg-white">
      <div className="px-8 py-4">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6">
            <h1 className="text-2xl font-bold font-poppins">fukidashi</h1>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="font-poppins cursor-pointer text-base font-semibold" onClick={onOpenAbout}>
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
