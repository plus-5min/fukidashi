import { useEffect, useRef, useState } from 'react'

type CreateModalProps = {
  open: boolean
  css: string
  onCssChange: (css: string) => void
  onClose: () => void
}

export function CreateModal({ open, css, onCssChange, onClose }: CreateModalProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const copyCss = async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div
      className={`create-modal-contents create-modal${open ? ' is-active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="create-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="create-modal-wrap">
        <div className="create-modal-inner">
          <button type="button" className="create-close-btn create-modal-close" aria-label="閉じる" onClick={onClose}>
            <img src="/assets/close-circle.svg" alt="×" />
          </button>
          <div className="modal-container">
            <p className="modal-heading" id="create-modal-title">
              CSS
            </p>
            <div className="modal-css-content">
              <textarea id="custom-css" className="modal-css" value={css} onChange={(event) => onCssChange(event.target.value)} />
              <p className="create-text">対応環境：OBS幅300px以上</p>
              <button type="button" id="copyBtn" className="copy-btn" aria-label="CSSをコピー" onClick={() => void copyCss()}>
                <img src="/assets/copy.svg" alt="copy" />
              </button>
              <div className={`copy-tooltip${copied ? ' show' : ''}`}>
                <p className="copy-tooltip-text">コピーしました！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
