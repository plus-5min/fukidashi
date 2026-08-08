type AboutModalProps = {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <div
      className={`about-modal-contents about-modal${open ? ' is-active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="about-modal-title"
    >
      <div className="about-wrap">
        <div className="about-inner">
          <div className="about-block">
            <div className="about-title-block">
              <h2 className="about-title" id="about-modal-title">
                fukidashi
              </h2>
              <div className="about-lead">
                <p>fukidashiは、Youtube / Twitch用のコメントCSSを生成できるツールです。</p>
                <p>お好みの色を使用してふきだし型のコメントデザインを作ることができます。</p>
                <p>Youtubeでの配信活動等にお使いください。</p>
              </div>
            </div>
            <div className="about-creater">
              <h3 className="about-heading">Creater</h3>
              <div className="about-creater-block">
                <div className="about-creater-img">
                  <img src="/image/profile.png" width="104" height="104" alt="通行止め.ᐟ.ᐟ" />
                </div>
                <div className="about-creater-profile">
                  <p className="about-creater-name">通行止め.ᐟ.ᐟ</p>
                  <div className="about-creater-sns">
                    <p className="about-creater-link">
                      <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                        Twitter(X)
                      </a>
                    </p>
                    <p className="about-creater-link">
                      <a href="https://tsukodome.booth.pm/" target="_blank" rel="noreferrer">
                        BOOTH
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-contact">
              <h3 className="about-heading">Contact</h3>
              <div className="about-contact-lead">
                <span className="line-feed">お問い合わせはメール、</span>
                <span className="line-feed">
                  または
                  <span className="about-contact-link">
                    <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                      Twitter(X)
                    </a>
                  </span>
                  まで
                </span>
                <p className="about-contact-mail">tuukou.dome111@gmail.com</p>
              </div>
            </div>
          </div>
          <button type="button" className="about-close-btn about-modal-close" aria-label="閉じる" onClick={onClose}>
            <img src="/assets/close.svg" alt="×" />
          </button>
        </div>
      </div>
    </div>
  )
}
