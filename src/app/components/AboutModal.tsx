import { Modal } from '../../components/ui/Modal'
import { creatorLinks } from '../data'

type AboutModalProps = {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <Modal open={open} titleId="about-modal-title" onClose={onClose} fitContentOnDesktop>
      <div className="grid shrink-0 gap-12 max-lg:gap-4">
        <div>
          <h2 className="mb-12 font-poppins text-center text-4xl font-bold text-primary max-lg:mb-4 max-lg:text-3xl" id="about-modal-title">
            fukidashi
          </h2>
          <div className="text-left text-base/relaxed text-primary max-lg:text-sm/relaxed">
            <p>fukidashiは、YouTube / Twitchの配信コメントを自分好みにカスタマイズできるCSSジェネレーターです。</p>
            <p>カラーやレイアウト、テンプレートを組み合わせて、配信画面に合ったコメントデザインをかんたんに作成できます。</p>
            <p>生成したCSSをコピーして、配信活動にお役立てください。</p>
          </div>
        </div>
        <div>
          <h3 className="font-poppins text-2xl font-bold text-primary max-lg:text-xl">Creator</h3>
          <div className="mt-8 flex items-center justify-center gap-4 rounded-2xl bg-secondary p-8 max-lg:mt-4 max-lg:flex-col max-lg:gap-2 max-lg:p-4">
            <div className="size-32 shrink-0 max-lg:size-24">
              <img className="h-auto w-full rounded-full object-contain" src="/image/icon.jpg" width="104" height="104" alt="アサヒナピピ" />
            </div>
            <div className="grid gap-4 max-lg:gap-2">
              <p className="text-left text-xl font-bold text-primary max-lg:text-center">アサヒナピピ</p>
              <nav aria-label="クリエイターリンク">
                <ul className="flex flex-wrap items-center gap-4 max-lg:justify-center max-lg:gap-2">
                  {creatorLinks.map(({ label, href, iconSrc, iconClassName }) => (
                    <li key={href}>
                      <a
                        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary-subtle px-4 py-2 text-primary transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:px-2 max-lg:text-sm max-lg:hover:bg-transparent"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${label}を開く`}
                      >
                        <img className={`${iconClassName} object-contain`} src={iconSrc} alt="" />
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="text-left text-sm max-lg:text-center">ご不明な点がありましたら、XのDMまでお気軽にご連絡ください。</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
