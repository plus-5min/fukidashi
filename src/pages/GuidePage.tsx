import guideMarkdown from '../../GUIDE.md?raw'
import { PageMetadata } from '../app/components/PageMetadata'
import { pageMetadata } from '../app/pageMetadata'
import { MarkdownDocument } from '../components/ui/MarkdownDocument'

export function GuidePage() {
  return (
    <>
      <PageMetadata {...pageMetadata.guide} />
      <div className="h-full overflow-y-auto">
        <article className="mx-auto w-full max-w-3xl px-8 py-12 pb-16 max-lg:px-4">
          <MarkdownDocument markdown={guideMarkdown} variant="guide" />
        </article>
      </div>
    </>
  )
}
