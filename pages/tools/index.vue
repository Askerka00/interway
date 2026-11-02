<script setup lang="ts">
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const toolsFaqs = [
  {
    q: 'Нужно ли оставлять номер телефона, чтобы увидеть расчет в калькуляторах INTER WAY?',
    a: 'Нет. Все 4 калькулятора работают прямо в браузере в реальном времени и сразу показывают расчет ставок фрахта, кубатуры, загрузки транспорта и таможенных пошлин. Контакты нужны только в том случае, если вы захотите зафиксировать ставку в договоре или получить официальное КП.'
  },
  {
    q: 'Насколько точны расчеты в онлайн-калькуляторах?',
    a: 'Калькуляторы используют актуальные коридоры ставок 2026 года, действующие формулы таможенных платежей РК и реальные габариты подвижного состава (еврофур 90 м³, контейнеров 20/40 футов и вагонов КТЖ). Точность оценки составляет 85–95%.'
  },
  {
    q: 'Можно ли отправить результаты расчета менеджеру в один клик?',
    a: 'Да, в каждом инструменте есть кнопка прямой выгрузки ваших параметров расчета в WhatsApp дежурному логисту или таможенному декларанту ТОО «INTER WAY».'
  }
]

usePageSeo({
  title: 'Онлайн-калькуляторы логистики и ВЭД в Казахстане: доставка, растаможка, объем м3, ЖД тариф | INTER WAY',
  description: 'Бесплатные онлайн-инструменты для импортеров и логистов Казахстана: калькулятор доставки из Китая, Турции и РФ, таможенный калькулятор РК 2026 (НДС и Перечень изъятий ВТО), расчет объема м3 (CBM) и паллет в фуре, ЖД тарифы КТЖ.',
  path: '/tools',
  keywords: 'калькулятор доставки из китая в казахстан, таможенный калькулятор казахстан 2026, расчет объема груза м3 калькулятор, расчет паллет в фуре, расчет жд тарифа казахстан онлайн',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и ВЭД-инструменты', path: '/tools' }
  ],
  faqs: toolsFaqs
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-16 md:py-24 text-white border-b border-white/10">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Калькуляторы и ВЭД-инструменты</span>
        </nav>

        <div class="max-w-3xl">
          <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-400">
            Бесплатные B2B-сервисы без ввода телефона
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Инженерные калькуляторы логистики и таможни РК
          </h1>
          <p class="mt-6 text-lg text-gray-300 leading-relaxed">
            Рассчитайте ориентировочный фрахт из Китая, Турции и РФ, проверьте таможенные пошлины и Перечень изъятий ВТО РК, посчитайте кубатуру (CBM) и загрузку паллет в фуру или контейнер прямо на экране за 30 секунд.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 md:grid-cols-2">
          <article
            v-for="(tool, idx) in TOOLS_DATA"
            :key="tool.slug"
            class="group flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-blue-500 md:p-10"
          >
            <div>
              <div class="mb-5 flex items-center justify-between gap-3">
                <span class="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
                  {{ tool.badge }}
                </span>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Инструмент 0{{ idx + 1 }}
                </span>
              </div>

              <h2 class="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                <NuxtLink :to="`/tools/${tool.slug}`">
                  {{ tool.title }}
                </NuxtLink>
              </h2>

              <p class="mt-4 text-base text-gray-600 leading-relaxed">
                {{ tool.subtitle }}
              </p>
            </div>

            <div class="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <NuxtLink
                :to="`/tools/${tool.slug}`"
                class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
              >
                Открыть калькулятор
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </NuxtLink>
              <span class="text-xs font-semibold text-emerald-600">
                Мгновенный расчет
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-white border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mb-8 text-center">
          Частые вопросы об онлайн-расчетах
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in toolsFaqs"
            :key="fIdx"
            class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/80"
          >
            <h3 class="text-base font-bold text-slate-900">{{ faq.q }}</h3>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
