type HeaderProps = {
  onOpenAbout: () => void
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="border-b border-[#d8d8d8]">
      <div className="px-8 py-4">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6">
            <h1 className="font-['Poppins'] text-2xl leading-9 font-bold tracking-[1.2px] text-[#353b3c]">fukidashi</h1>
            <p className="flex items-center text-sm max-[768px]:hidden">Youtube / Twitch用コメントCSS生成ジェネレーター</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="cursor-pointer font-['Poppins'] text-base leading-6 font-medium tracking-[1.2px] text-[#353b3c]"
              onClick={onOpenAbout}
            >
              About
            </button>
            <div>
              <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                <p>
                  <img src="/image/profile.png" alt="通行止め.ᐟ.ᐟ" width="24" height="24" />
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
