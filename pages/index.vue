<script lang="ts" setup>
import Hero from '~/components/sections/HeroSection.vue'
import ProcessSection from '~/components/sections/ProcessSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import GeographySection from '~/components/sections/GeographySection.vue'
import KPI from '~/components/sections/KPI.vue'
import { SERVICES_DATA, ROUTES_DATA, TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const homeFaqs = [
  {
    q: 'Из каких стран ТОО «INTER WAY» доставляет грузы в Казахстан?',
    a: 'Мы организуем регулярные грузоперевозки из Китая (Гуанчжоу, Иу, Шанхай, Урумчи), Турции (Стамбул, Мерсин), России (Москва, Екатеринбург, Новосибирск), стран ЕС, ОАЭ (Дубай), Узбекистана, Кореи и Юго-Восточной Азии в Алматы, Астану и все регионы РК.'
  },
  {
    q: 'Как быстро рассчитывается стоимость перевозки и растаможки?',
    a: 'Предварительный расчет ставки фрахта и оптимального маршрута занимает 15–30 минут в рабочее время. При наличии упаковочного листа и инвойса наши декларанты также сразу рассчитают таможенные платежи и коды ТН ВЭД.'
  },
  {
    q: 'Какой минимальный вес груза вы принимаете к перевозке?',
    a: 'Для сборных автоперевозок (LTL) мы принимаем партии от 50–100 кг или от 1 паллеты, для экспресс-авиадоставки — от 10 кг, для генеральных перевозок — отдельные фуры 20 тонн и контейнеры 20/40 футов.'
  },
  {
    q: 'Несете ли вы финансовую ответственность за сроки и сохранность груза?',
    a: 'Да, все показатели SLA (своевременность подачи транспорта, нормативное время в пути OTIF 98.5% и сохранность) фиксируются в договоре транспортной экспедиции, а грузы страхуются от всех рисков.'
  }
]

usePageSeo({
  title: 'INTER WAY — Логистическая компания в Алматы и Казахстане | Международные грузоперевозки и таможня',
  description: 'ТОО «INTER WAY» — международные грузоперевозки в Казахстан из Китая, Турции, России, ОАЭ и Европы. Автоперевозки (FTL/LTL), ЖД вагоны и контейнеры, авиафрахт, склады консолидации и таможенное оформление в Алматы за 1 день.',
  path: '/',
  keywords: 'логистическая компания алматы, грузоперевозки казахстан, доставка грузов из китая в алматы, международные перевозки рк, жд перевозки казахстан, автоперевозки алматы, таможенное оформление алматы, inter way',
  breadcrumbs: [
    { name: 'Главная', path: '/' }
  ],
  faqs: homeFaqs
})
</script>

<template>
  <div class="flex flex-col">
    <Hero />

    <!-- Карточки ключевых услуг с прямыми ссылками -->
    <section class="bg-slate-50 py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
              Комплексная логистика и ВЭД
            </span>
            <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
              Услуги грузоперевозок и таможенной очистки
            </h2>
          </div>
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            Смотреть все услуги
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="service in SERVICES_DATA"
            :key="service.slug"
            :to="`/services/${service.slug}`"
            class="group flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-500"
          >
            <div>
              <div class="mb-5 flex items-center justify-between gap-2">
                <span class="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
                  {{ service.priceFrom }}
                </span>
                <span class="text-xs font-medium text-slate-500">
                  {{ service.transitTime }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {{ service.shortTitle }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-gray-600">
                {{ service.subtitle }}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-600">
              <span>Подробнее об услуге</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <AboutSection />

    <!-- Блок бесплатных ВЭД-калькуляторов на главной -->
    <section class="bg-[#0B1120] py-16 md:py-24 text-white border-b border-white/5">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-400">
              Онлайн-расчет без ожидания и ввода телефона
            </span>
            <h2 class="text-3xl font-bold text-white md:text-4xl">
              Бесплатные калькуляторы логистики и таможни РК
            </h2>
            <p class="mt-3 text-base text-gray-400 max-w-2xl">
              Считайте стоимость доставки из Китая, Турции и РФ, проверяйте пошлины и Перечень изъятий ВТО РК, рассчитывайте кубатуру (м³) и вместимость паллет прямо на сайте.
            </p>
          </div>
          <NuxtLink
            to="/tools"
            class="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
          >
            Все калькуляторы
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="tool in TOOLS_DATA"
            :key="tool.slug"
            :to="`/tools/${tool.slug}`"
            class="group flex flex-col justify-between rounded-3xl bg-[#131B2D] border border-white/10 p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
          >
            <div>
              <span class="inline-block rounded-full bg-blue-600/20 px-3 py-1 text-[11px] font-bold text-blue-300 mb-4">
                {{ tool.badge }}
              </span>
              <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {{ tool.shortTitle }}
              </h3>
              <p class="mt-2.5 text-xs leading-relaxed text-gray-400">
                {{ tool.subtitle }}
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400">
              <span>Открыть расчет</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ServicesSection />

    <!-- Популярные маршруты (Programmatic SEO хаб на главной) -->
    <section class="bg-white py-16 md:py-24 border-b border-slate-100">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
              География и тарифы по направлениям
            </span>
            <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
              Популярные маршруты доставки грузов в Казахстан
            </h2>
            <p class="mt-3 text-base text-gray-600 max-w-2xl">
              Выберите интересующий коридор, чтобы посмотреть расчетные сроки авто-, Ж/Д и авиадоставки, пограничные переходы и условия растаможки.
            </p>
          </div>
          <NuxtLink
            to="/routes"
            class="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            Все маршруты и страны
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="route in ROUTES_DATA"
            :key="route.slug"
            :to="`/routes/${route.slug}`"
            class="group rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-blue-500 hover:bg-white hover:shadow-lg"
          >
            <div class="flex items-center justify-between text-xs font-semibold text-blue-600 mb-2">
              <span>~{{ route.distanceKm }} км</span>
              <span>{{ route.transportOptions[0]?.transitDays }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-600">
              {{ route.fromCountry }} → {{ route.toCity }}
            </h3>
            <p class="mt-1 text-xs text-gray-500">
              {{ route.fromCity }}
            </p>
            <div class="mt-4 pt-3 border-t border-slate-200/70 text-xs font-semibold text-slate-700">
              {{ route.transportOptions[0]?.priceEstimate }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ProcessSection />

    <KPI id="advantages" />

    <GeographySection />

    <!-- SEO FAQ блок с микроразметкой FAQPage -->
    <section class="bg-slate-50 py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-12 max-w-5xl">
        <div class="text-center mb-12">
          <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
            Ответы на частые вопросы
          </span>
          <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
            Часто задаваемые вопросы о доставке и таможне
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="(faq, idx) in homeFaqs"
            :key="idx"
            class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h3 class="text-base font-bold text-slate-900">
              {{ faq.q }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
