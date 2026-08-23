import { readFile } from 'node:fs/promises'

import { describe, expect, it } from 'vitest'

import { injectPageMetadata } from './generate-static-pages.mjs'

const metadataFile = JSON.parse(await readFile(new URL('../src/app/pageMetadata.json', import.meta.url), 'utf8'))
const indexTemplate = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const indexHtml = injectPageMetadata(indexTemplate, metadataFile.pages.home)
const guideHtml = injectPageMetadata(indexHtml, metadataFile.pages.guide)
const termsHtml = injectPageMetadata(indexHtml, metadataFile.pages.terms)
const notFoundHtml = injectPageMetadata(indexHtml, metadataFile.pages.notFound)

describe('generate-static-pages', () => {
  it('includes homepage metadata in the initial HTML for non-JavaScript crawlers', () => {
    expect(indexHtml).toContain('<title>fukidashi | YouTube・TwitchコメントCSSジェネレーター</title>')
    expect(indexHtml).toContain('<link rel="canonical" href="https://fukidashi-css.com/" />')
    expect(indexHtml).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')
    expect(indexHtml).toContain('<meta property="og:image" content="https://fukidashi-css.com/image/ogp.png" />')
    expect(indexHtml).toContain('<meta name="twitter:card" content="summary_large_image" />')
  })

  it('includes terms metadata without the homepage canonical URL', () => {
    expect(termsHtml).toContain('<title>利用規約 | fukidashi</title>')
    expect(termsHtml).toContain('<link rel="canonical" href="https://fukidashi-css.com/terms" />')
    expect(termsHtml).toContain('<meta property="og:url" content="https://fukidashi-css.com/terms" />')
    expect(termsHtml).not.toContain('<link rel="canonical" href="https://fukidashi-css.com/" />')
  })

  it('includes guide metadata without the homepage canonical URL', () => {
    expect(guideHtml).toContain('<title>使い方 | fukidashi</title>')
    expect(guideHtml).toContain('<link rel="canonical" href="https://fukidashi-css.com/guide" />')
    expect(guideHtml).toContain('<meta property="og:url" content="https://fukidashi-css.com/guide" />')
    expect(guideHtml).not.toContain('<link rel="canonical" href="https://fukidashi-css.com/" />')
  })

  it('marks the not-found HTML as noindex without a canonical URL', () => {
    expect(notFoundHtml).toContain('<title>ページが見つかりません | fukidashi</title>')
    expect(notFoundHtml).toContain('<meta name="robots" content="noindex" />')
    expect(notFoundHtml).not.toContain('rel="canonical"')
    expect(notFoundHtml).not.toContain('property="og:url"')
  })
})
