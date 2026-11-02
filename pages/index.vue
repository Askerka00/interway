<script lang="ts" setup>
import Hero from '~/components/sections/HeroSection.vue'
import ProcessSection from '~/components/sections/ProcessSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import GeographySection from '~/components/sections/GeographySection.vue'
import KPI from '~/components/sections/KPI.vue'
import { ROUTES_DATA, TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'INTER WAY — Логистическая компания в Алматы и Казахстане | Международные грузоперевозки и таможня',
  description: 'ТОО «INTER WAY» — международные грузоперевозки в Казахстан из Китая, Турции, России, ОАЭ и Европы. Автоперевозки, ЖД вагоны и контейнеры, авиадоставка, склады и таможенное оформление в Алматы.',
  path: '/',
  keywords: 'логистическая компания алматы, грузоперевозки казахстан, доставка грузов из китая в алматы, международные перевозки рк, жд перевозки казахстан, автоперевозки алматы, таможенное оформление алматы, inter way',
  breadcrumbs: [
    { name: 'Главная', path: '/' }
  ]
})
</script>

<template>
  <div class="flex flex-col">
    <Hero />

    <AboutSection />

    <!-- Лаконичный блок онлайн-калькуляторов -->
    <section class="bg-[#0B1120] py-24 lg:py-32 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-400">
              Удобные сервисы
            </span>
            <h2 class="text-3xl font-bold text-white md:text-5xl">
              Онлайн-калькуляторы
            </h2>
          </div>
          <NuxtLink
            to="/tools"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
          >
            Все калькуляторы →
          </NuxtLink>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="tool in TOOLS_DATA"
            :key="tool.slug"
            :to="`/tools/${tool.slug}`"
            class="flex flex-col justify-between rounded-3xl bg-[#131B2D] border border-white/10 p-8 transition-colors hover:border-blue-500/60"
          >
            <div>
              <span class="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                {{ tool.badge }}
              </span>
              <h3 class="text-xl font-bold text-white">
                {{ tool.shortTitle }}
              </h3>
              <p class="mt-3 text-sm text-gray-400 leading-relaxed">
                {{ tool.subtitle }}
              </p>
            </div>
            <div class="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400">
              <span>Открыть расчет</span>
              <span>→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ProcessSection />

    <KPI id="advantages" />

    <!-- Спокойная сетка направлений без лишних цифр и теней -->
    <section class="bg-slate-50 py-24 lg:py-32">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
              География перевозок
            </span>
            <h2 class="text-3xl font-bold text-slate-900 md:text-5xl">
              Основные направления доставки
            </h2>
          </div>
          <NuxtLink
            to="/routes"
            class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 transition-colors hover:border-slate-900"
          >
            Все маршруты →
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="route in ROUTES_DATA"
            :key="route.slug"
            :to="`/routes/${route.slug}`"
            class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 transition-colors hover:border-slate-400"
          >
            <div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ route.fromCountry }} → {{ route.toCity }}
              </h3>
              <p class="mt-2 text-xs text-gray-500">
                {{ route.fromCity }}
              </p>
            </div>
            <div class="mt-6 text-xs font-bold uppercase tracking-wider text-blue-600">
              Подробнее →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <GeographySection />
  </div>
</template>
