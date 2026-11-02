<script setup lang="ts">
import heroCargoShip from '~/assets/images/hero-cargo-ship.jpg'
</script>

<template>
  <section class="relative min-h-[82vh] w-full overflow-hidden bg-slate-900 py-24 flex items-center">
    <img
      :src="heroCargoShip"
      alt="Международные грузоперевозки и доставка грузов в Казахстан — ТОО INTER WAY"
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#0b1c39]/95 via-[#0b1c39]/75 to-transparent"></div>

    <div class="relative z-10 container mx-auto px-6 md:px-12">
      <div class="max-w-2xl">
        <span class="mb-4 block text-xs font-bold uppercase tracking-widest text-blue-400">
          Международная логистика и таможня
        </span>

        <h1 class="font-sans text-4xl font-bold leading-[1.12] text-white md:text-5xl lg:text-6xl">
          Глобальный логистический провайдер в Казахстане<span class="text-blue-500">.</span>
        </h1>

        <p class="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl max-w-xl">
          Доставляем грузы из Китая, Турции, России и Европы от фабрики до двери получателя: оптимизируем маршруты и проводим растаможку за 1 день.
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <NuxtLink
            to="/tools/delivery-calculator"
            class="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500"
          >
            Онлайн-калькулятор
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
            class="rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-slate-900"
          >
            Наши услуги
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
