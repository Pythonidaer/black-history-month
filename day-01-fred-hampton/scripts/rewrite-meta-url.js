/**
 * After build: replace placeholder domain in index.html with actual URL
 * so og:image and og:url work on Vercel (LinkedIn, Instagram, etc.).
 * Uses VERCEL_URL (set by Vercel) or VITE_SITE_URL (optional for other hosts).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distHtml = path.join(__dirname, '..', 'dist', 'index.html')
const placeholder = 'https://your-domain.com'
const url = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.VITE_SITE_URL || placeholder

if (!fs.existsSync(distHtml)) {
  console.warn('rewrite-meta-url: dist/index.html not found, skipping')
  process.exit(0)
}

let html = fs.readFileSync(distHtml, 'utf8')
html = html.split(placeholder).join(url)
fs.writeFileSync(distHtml, html, 'utf8')

if (url !== placeholder) {
  console.log('rewrite-meta-url: set meta URLs to', url)
}
