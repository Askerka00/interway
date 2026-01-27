<script setup lang="ts">
// Логика не требуется для чистого отображения
import heroCargoShip from '~/assets/images/hero-cargo-ship.png'
</script>

<template>
  <section class="relative h-screen min-h-[600px] w-full overflow-hidden bg-slate-900">
    
    <img 
      :src="heroCargoShip" 
      alt="Грузовое судно" 
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#0b1c39]/95 via-[#0b1c39]/70 to-transparent"></div>

    <div class="relative z-10 flex h-full items-center">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-2xl">
          
          <h1 class="font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[4rem]">
            Мы — глобальный <br />
            логистический провайдер<span class="text-blue-500">.</span>
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            Мы организуем цепочки поставок от фабрики до двери получателя: оптимизируем маршруты, контролируем сроки и держим вас в курсе на каждом этапе.
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink 
              to="/#contacts"
              class="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700"
            >
              Рассчитать стоимость
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
              to="/#contacts"
              class="rounded-full border border-gray-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-slate-900"
            >
              Наши услуги
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
