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
  description: 'ТОО «INTER WAY» — международные грузоперевозки в Казахстан из Китая, Турции, России, ОАЭ и Европы. Автоперевозки (FTL/LTL), ЖД вагоны и контейнеры, авиафрахт, склады консолидации и таможенное оформление в Алматы за 1 день.',
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

    <!-- Лаконичный блок ВЭД-калькуляторов с воздухом -->
    <section class="bg-[#0B1120] py-24 lg:py-32 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-400">
              Онлайн-инструменты
            </span>
            <h2 class="text-3xl font-bold text-white md:text-5xl">
              Рассчитайте логистику за 30 секунд
            </h2>
          </div>
          <NuxtLink
            to="/tools"
            class="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
          >
            Все калькуляторы →
          </NuxtLink>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="tool in TOOLS_DATA"
            :key="tool.slug"
            :to="`/tools/${tool.slug}`"
            class="group flex flex-col justify-between rounded-3xl bg-[#131B2D] border border-white/10 p-8 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
          >
            <div>
              <span class="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                {{ tool.badge }}
              </span>
              <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {{ tool.shortTitle }}
              </h3>
            </div>
            <div class="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white">
              <span>Открыть</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ProcessSection />

    <KPI id="advantages" />

    <!-- Компактная сетка направлений -->
    <section class="bg-slate-50 py-24 lg:py-32">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
              Ключевые коридоры
            </span>
            <h2 class="text-3xl font-bold text-slate-900 md:text-5xl">
              Направления доставки
            </h2>
          </div>
          <NuxtLink
            to="/routes"
            class="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            Все маршруты →
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="route in ROUTES_DATA"
            :key="route.slug"
            :to="`/routes/${route.slug}`"
            class="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-blue-500"
          >
            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              {{ route.transportOptions[0]?.transitDays }}
            </div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-600">
              {{ route.fromCountry }} → {{ route.toCity }}
            </h3>
            <p class="mt-1 text-xs text-gray-500">
              {{ route.fromCity }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <GeographySection />
  </div>
</template>
