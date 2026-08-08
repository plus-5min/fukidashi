type HeaderProps = {
  onOpenAbout: () => void
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header>
      <div className="header-wrap">
        <div className="header-inner">
          <div className="header-nav">
            <div className="header-title-block">
              <h1 className="header-title">fukidashi</h1>
              <p className="header-sub-title is-pc">Youtube / Twitch用コメントCSS生成ジェネレーター</p>
            </div>
            <div className="header-heading-block">
              <button type="button" className="header-heading about-modal-open" onClick={onOpenAbout}>
                About
              </button>
              <div className="header-sns">
                <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                  <p>
                    <img src="/image/profile.png" alt="通行止め.ᐟ.ᐟ" width="24" height="24" />
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
