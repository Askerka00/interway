import { COMPANY_INFO, SERVICES_DATA, ROUTES_DATA, TOOLS_DATA } from '~/data/seoData'

export default defineEventHandler((event) => {
  const baseUrl = COMPANY_INFO.url
  const lastmod = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/routes', priority: '0.9', changefreq: 'weekly' },
    { url: '/tools', priority: '0.95', changefreq: 'weekly' },
    { url: '/contacts', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' }
  ]

  const servicePages = SERVICES_DATA.map((s) => ({
    url: `/services/${s.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  }))

  const routePages = ROUTES_DATA.map((r) => ({
    url: `/routes/${r.slug}`,
    priority: '0.85',
    changefreq: 'weekly'
  }))

  const toolPages = TOOLS_DATA.map((t) => ({
    url: `/tools/${t.slug}`,
    priority: '0.95',
    changefreq: 'weekly'
  }))

  const allUrls = [...staticPages, ...toolPages, ...servicePages, ...routePages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
