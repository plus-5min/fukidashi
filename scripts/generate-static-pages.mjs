import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const metadataFile = JSON.parse(await readFile(new URL('../src/app/pageMetadata.json', import.meta.url), 'utf8'))
const metadataStartMarker = '<!-- page-metadata:start -->'
const metadataEndMarker = '<!-- page-metadata:end -->'
const metadataBlockPattern = /<!-- page-metadata:start -->[\s\S]*?<!-- page-metadata:end -->/

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function renderPageMetadata(metadata) {
  const title = escapeHtml(metadata.title)
  const description = escapeHtml(metadata.description)
  const pageUrl = metadata.path ? `${metadataFile.siteOrigin}${metadata.path}` : null
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    metadata.keywords ? `<meta name="keywords" content="${escapeHtml(metadata.keywords.join(','))}" />` : null,
    pageUrl ? `<link rel="canonical" href="${pageUrl}" />` : null,
    metadata.noIndex ? '<meta name="robots" content="noindex" />' : null,
    '',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    pageUrl ? `<meta property="og:url" content="${pageUrl}" />` : null,
    `<meta property="og:image" content="${metadataFile.ogImageUrl}" />`,
    '<meta property="og:site_name" content="fukidashi" />',
    '<meta property="og:type" content="website" />',
    '',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:creator" content="@asahinapipi_5m" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${metadataFile.ogImageUrl}" />`,
  ]

  return tags
    .filter((tag) => tag !== null)
    .map((tag) => (tag ? `    ${tag}` : ''))
    .join('\n')
}

export function injectPageMetadata(html, metadata) {
  if (!html.includes(metadataStartMarker) || !html.includes(metadataEndMarker)) {
    throw new Error('Page metadata markers were not found in index.html')
  }

  return html.replace(metadataBlockPattern, `${metadataStartMarker}\n${renderPageMetadata(metadata)}\n    ${metadataEndMarker}`)
}

export async function generateStaticPages() {
  const indexPath = new URL('../dist/index.html', import.meta.url)
  const indexHtml = injectPageMetadata(await readFile(indexPath, 'utf8'), metadataFile.pages.home)

  await writeFile(indexPath, indexHtml)

  await Promise.all(
    [
      ['terms.html', metadataFile.pages.terms],
      ['404.html', metadataFile.pages.notFound],
    ].map(([fileName, metadata]) => writeFile(new URL(`../dist/${fileName}`, import.meta.url), injectPageMetadata(indexHtml, metadata))),
  )
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await generateStaticPages()
}
