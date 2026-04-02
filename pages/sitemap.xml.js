const SITE_URL = 'https://www.novonavis.com'

const pages = [
  '',
  '/blog',
  '/report',
  '/about',
  '/blog/hvac',
  '/blog/dental',
  '/blog/real-estate',
  '/blog/plumbing',
  '/blog/accounting',
  '/blog/law-firm',
  '/blog/property-management',
  '/blog/restaurant',
  '/blog/chiropractic',
  '/blog/construction',
]

function generateSitemap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'daily' : page.includes('/blog/') ? 'weekly' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/blog' ? '0.9' : page === '/report' ? '0.9' : '0.7'}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`
}

export default function Sitemap() {
  return null
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap(pages)
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return { props: {} }
}