<script setup lang="ts">
import heroCargoShip from '~/assets/images/hero-cargo-ship.jpg'
import { ROUTES_DATA } from '~/data/seoData'

const quickRoutes = ROUTES_DATA.slice(0, 4)
</script>

<template>
  <section class="relative min-h-[680px] w-full overflow-hidden bg-slate-900 py-20 lg:py-28 flex items-center">
    <img
      :src="heroCargoShip"
      alt="Международные грузоперевозки и доставка грузов в Казахстан — ТОО INTER WAY"
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#0b1c39]/95 via-[#0b1c39]/80 to-[#0b1c39]/40"></div>

    <div class="relative z-10 container mx-auto px-6 md:px-12">
      <div class="max-w-3xl">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
          <span>Международная логистика и ВЭД • Алматы и весь Казахстан</span>
        </div>

        <h1 class="font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Международные грузоперевозки и таможенное оформление в Казахстане<span class="text-blue-500">.</span>
        </h1>

        <p class="mt-6 text-lg leading-relaxed text-gray-200 md:text-xl max-w-2xl">
          Доставляем генеральные и сборные грузы из <strong>Китая, Турции, России, ОАЭ и Европы</strong> в Алматы, Астану и любой регион РК. Авто, Ж/Д, авиа и морские контейнеры с финансовой гарантией сроков (SLA) и растаможкой за 1 день.
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <NuxtLink
            to="/#contacts"
            class="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500 shadow-lg shadow-blue-600/30"
          >
            Рассчитать стоимость за 15 мин
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/services"
            class="rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-slate-900"
          >
            Все услуги и тарифы
          </NuxtLink>
        </div>

        <div class="mt-12 border-t border-white/15 pt-6">
          <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Популярные направления доставки:
          </p>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="r in quickRoutes"
              :key="r.slug"
              :to="`/routes/${r.slug}`"
              class="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-gray-200 transition hover:bg-blue-600 hover:text-white"
            >
              {{ r.fromCountry }} → {{ r.toCity }}
            </NuxtLink>
            <NuxtLink
              to="/routes"
              class="rounded-full border border-blue-400/40 px-3.5 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20"
            >
              Все маршруты →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
