// pages/news/sitemap.xml.js
// Dynamic sitemap for news.novonavis.com
// Fetches intelligence/index.json from S3 and generates XML sitemap on every request.
// Submit https://news.novonavis.com/news/sitemap.xml to Google Search Console once.
// Google will check it regularly and discover new report pages automatically.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const BASE_URL = 'https://news.novonavis.com'

function generateSitemap(reports) {
  const staticPages = [
    {
      url:        `${BASE_URL}`,
      lastmod:    new Date().toISOString().split('T')[0],
      changefreq: 'hourly',
      priority:   '1.0',
    },
  ]

  const reportPages = (reports || []).map(report => {
    // Parse date from order ID format intel_DDMMYY_NNNN
    let lastmod = new Date().toISOString().split('T')[0]
    try {
      const datePart = report.id.replace('intel_', '').split('_')[0]
      if (datePart && datePart.length === 6) {
        const dd = datePart.slice(0, 2)
        const mm = datePart.slice(2, 4)
        const yy = datePart.slice(4, 6)
        lastmod = `20${yy}-${mm}-${dd}`
      }
    } catch {}

    return {
      url:        `${BASE_URL}/news/${report.id}`,
      lastmod,
      changefreq: 'weekly',
      priority:   '0.8',
    }
  })

  const allPages = [...staticPages, ...reportPages]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

export default async function handler(req, res) {
  try {
    const s3  = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    'intelligence/index.json',
    }))
    const reports = JSON.parse(await obj.Body.transformToString())
    const sitemap = generateSitemap(reports)

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=3600')
    res.status(200).send(sitemap)

  } catch (err) {
    // If S3 fails or index doesn't exist yet, return sitemap with just the homepage
    console.error('[sitemap] S3 fetch failed:', err.message)
    const sitemap = generateSitemap([])
    res.setHeader('Content-Type', 'application/xml')
    res.status(200).send(sitemap)
  }
}
