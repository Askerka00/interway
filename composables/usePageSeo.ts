import { COMPANY_INFO, type ServiceItem, type RouteItem } from '~/data/seoData'

export function usePageSeo(options: {
  title: string
  description: string
  path: string
  keywords?: string
  breadcrumbs?: { name: string; path: string }[]
  faqs?: { q: string; a: string }[]
  service?: ServiceItem
  routeItem?: RouteItem
  webApp?: {
    name: string
    category: string
  }
}) {
  const canonicalUrl = `${COMPANY_INFO.url}${options.path === '/' ? '' : options.path}`

  useSeoMeta({
    title: options.title,
    description: options.description,
    keywords: options.keywords || 'грузоперевозки казахстан, логистическая компания алматы, доставка грузов из китая в казахстан, жд перевозки, автоперевозки, таможенное оформление алматы, inter way',
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonicalUrl,
    twitterTitle: options.title,
    twitterDescription: options.description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  })

  const schemaGraph: Record<string, any>[] = [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${COMPANY_INFO.url}/#organization`,
      name: COMPANY_INFO.name,
      alternateName: COMPANY_INFO.brand,
      url: COMPANY_INFO.url,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Кунаева, дом 32',
        addressLocality: COMPANY_INFO.city,
        addressRegion: 'Алматинская область',
        postalCode: COMPANY_INFO.postalCode,
        addressCountry: 'KZ'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY_INFO.geo.lat,
        longitude: COMPANY_INFO.geo.lng
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00'
        }
      ],
      areaServed: ['KZ', 'CN', 'RU', 'TR', 'UZ', 'AE', 'EU'],
      sameAs: [COMPANY_INFO.whatsapp, COMPANY_INFO.telegram]
    }
  ]

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    schemaGraph.push({
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${COMPANY_INFO.url}${item.path === '/' ? '' : item.path}`
      }))
    })
  }

  if (options.service) {
    schemaGraph.push({
      '@type': 'Service',
      name: options.service.title,
      description: options.service.seoDescription,
      provider: {
        '@id': `${COMPANY_INFO.url}/#organization`
      },
      areaServed: {
        '@type': 'Country',
        name: 'Казахстан'
      },
      serviceType: options.service.shortTitle
    })
  }

  if (options.routeItem) {
    schemaGraph.push({
      '@type': 'Service',
      name: `Доставка грузов ${options.routeItem.fromCountry} (${options.routeItem.fromCity}) — ${options.routeItem.toCity}`,
      description: options.routeItem.seoDescription,
      provider: {
        '@id': `${COMPANY_INFO.url}/#organization`
      },
      areaServed: [
        { '@type': 'Country', name: options.routeItem.fromCountry },
        { '@type': 'Country', name: options.routeItem.toCountry }
      ]
    })
  }

  if (options.webApp) {
    schemaGraph.push({
      '@type': 'WebApplication',
      name: options.webApp.name,
      url: canonicalUrl,
      description: options.description,
      applicationCategory: options.webApp.category,
      operatingSystem: 'All',
      inLanguage: 'ru-KZ',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KZT'
      },
      provider: {
        '@id': `${COMPANY_INFO.url}/#organization`
      }
    })
  }

  if (options.faqs && options.faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: options.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    })
  }

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemaGraph
        })
      }
    ]
  })
}
