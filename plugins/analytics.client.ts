export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return

  const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventName, params)
    }
  }

  // --- 1. Отслеживание глубины скролла (25%, 50%, 75%, 90%, 100%) ---
  let trackedScrollPercentages = new Set<number>()
  let formViewTracked = false

  const calculateScroll = () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (docHeight <= 0) return

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const currentPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100))

    const checkpoints = [25, 50, 75, 90, 100]
    for (const cp of checkpoints) {
      if (currentPercent >= cp && !trackedScrollPercentages.has(cp)) {
        trackedScrollPercentages.add(cp)
        trackEvent('scroll_depth', {
          percent_scrolled: cp,
          page_path: window.location.pathname
        })
      }
    }

    // Проверка попадания формы контактов в область видимости
    if (!formViewTracked) {
      const contactSection = document.getElementById('contacts')
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          formViewTracked = true
          trackEvent('view_contact_form', {
            event_category: 'engagement',
            page_path: window.location.pathname
          })
        }
      }
    }
  }

  // Троттлинг скролла через requestAnimationFrame
  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        calculateScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  // Сброс при переходе на другую страницу
  nuxtApp.hook('page:finish', () => {
    trackedScrollPercentages.clear()
    formViewTracked = false
    setTimeout(calculateScroll, 500)
  })

  // --- 2. Отслеживание кликов по контактам (WhatsApp, Телефон, Почта) ---
  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement)?.closest('a')
    if (!target) return

    const href = target.getAttribute('href') || ''

    if (href.startsWith('tel:')) {
      trackEvent('click_phone', {
        event_category: 'lead_click',
        phone_number: href.replace('tel:', ''),
        page_path: window.location.pathname
      })
    } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      trackEvent('click_whatsapp', {
        event_category: 'lead_click',
        link: href,
        page_path: window.location.pathname
      })
    } else if (href.startsWith('mailto:')) {
      trackEvent('click_email', {
        event_category: 'lead_click',
        email: href.replace('mailto:', ''),
        page_path: window.location.pathname
      })
    }
  })

  // --- 3. Детектор «Rage Click» (быстрые нервные клики мыши по элементу) ---
  let lastClickTime = 0
  let clickCount = 0
  let lastTarget: EventTarget | null = null

  document.addEventListener('click', (event) => {
    const now = Date.now()
    if (event.target === lastTarget && now - lastClickTime < 500) {
      clickCount++
      if (clickCount >= 3) {
        trackEvent('rage_click', {
          event_category: 'user_friction',
          element_tag: (event.target as HTMLElement)?.tagName?.toLowerCase() || 'unknown',
          page_path: window.location.pathname
        })
        clickCount = 0
      }
    } else {
      clickCount = 1
      lastTarget = event.target
    }
    lastClickTime = now
  })
})
