// pages/sitemap.xml.js
// Dynamic sitemap served at news.novonavis.com/sitemap.xml
//
// Reads both intelligence/index.json and smb/index.json from S3 on every
// request. Generates a sitemap with every report URL plus the two landing
// pages. Each entry includes <lastmod> with the report's published date in
// ISO 8601 format — Google uses this to prioritize crawl budget on fresh
// content.
//
// This is a Next.js Pages Router pattern: the file exports
// getServerSideProps which writes the XML directly to res, then returns
// an empty props object so no page renders. Browsers and crawlers see
// pure XML at /sitemap.xml.
//
// After deploying, submit this URL once in Google Search Console:
//   https://news.novonavis.com/sitemap.xml
// GSC will then re-fetch it on its own cadence and discover new reports
// automatically.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const SITE_URL = 'https://news.novonavis.com'

// Static landing pages — these always appear in the sitemap.
const STATIC_PAGES = [
  { path: '/',     priority: '1.0', changefreq: 'daily'  },
  { path: '/smb',  priority: '0.9', changefreq: 'daily'  },
]

// Convert a human date string (e.g. "May 14, 2026") to ISO 8601.
// Falls back to current time if parsing fails so sitemap is never broken.
function toIsoDate(dateStr) {
  if (!dateStr) return new Date().toISOString()
  const ts = Date.parse(dateStr)
  if (isNaN(ts)) return new Date().toISOString()
  return new Date(ts).toISOString()
}

// XML-escape any string that might contain special characters.
function xmlEscape(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function fetchIndex(s3, key) {
  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    key,
    }))
    const parsed = JSON.parse(await obj.Body.transformToString())
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error(`[sitemap] Failed to fetch ${key}:`, err.message)
    return []
  }
}

export async function getServerSideProps({ res }) {
  const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

  // Fetch both indexes in parallel.
  const [intel, smb] = await Promise.all([
    fetchIndex(s3, 'intelligence/index.json'),
    fetchIndex(s3, 'smb/index.json'),
  ])

  // Today's date for the static landing pages — they change daily as new
  // reports are published, so lastmod follows the most recent publish.
  const allDates = [
    ...intel.map(r => r.date),
    ...smb.map(r => r.date),
  ].filter(Boolean)

  let mostRecent = new Date().toISOString()
  if (allDates.length) {
    const timestamps = allDates.map(toIsoDate).map(d => Date.parse(d))
    const max = Math.max(...timestamps.filter(t => !isNaN(t)))
    if (!isNaN(max) && max > 0) mostRecent = new Date(max).toISOString()
  }

  const entries = []

  // Static landing pages
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry(
      `${SITE_URL}${page.path}`,
      mostRecent,
      page.changefreq,
      page.priority,
    ))
  }

  // Enterprise intelligence reports → /news/{id}
  for (const r of intel) {
    if (!r.id) continue
    entries.push(urlEntry(
      `${SITE_URL}/news/${r.id}`,
      toIsoDate(r.date),
      'weekly',     // intelligence reports don't change much after publish
      '0.8',
    ))
  }

  // SMB reports → use the hierarchical url_path
  for (const r of smb) {
    if (!r.id || !r.url_path) continue
    entries.push(urlEntry(
      `${SITE_URL}${r.url_path}`,
      toIsoDate(r.date),
      'monthly',    // SMB tool-selection reports are durable, change rarely
      '0.7',
    ))
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join('\n'),
    '</urlset>',
  ].join('\n')

  res.setHeader('Content-Type',  'application/xml; charset=utf-8')
  // Cache the sitemap briefly so we don't hammer S3 on every crawler visit,
  // but short enough that new reports show up within minutes.
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300')
  res.write(xml)
  res.end()

  return { props: {} }
}

// This page renders nothing — getServerSideProps writes XML directly to res.
export default function Sitemap() {
  return null
}
