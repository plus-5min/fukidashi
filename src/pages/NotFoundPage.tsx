import { Link } from 'react-router'

import { PageMetadata, type PageMetadataProps } from '../app/components/PageMetadata'

const metadata = {
  title: 'ページが見つかりません | fukidashi',
  description: 'お探しのページは見つかりませんでした。',
  noIndex: true,
} satisfies PageMetadataProps

export function NotFoundPage() {
  return (
    <>
      <PageMetadata {...metadata} />
      <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-sm font-bold tracking-widest text-violet-600 uppercase">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">ページが見つかりませんでした</h1>
        <p className="mt-5 text-slate-600">URLが正しいか確認して、もう一度お試しください。</p>
        <Link to="/" className="mt-8 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
          トップへ戻る
        </Link>
      </div>
    </>
  )
}
