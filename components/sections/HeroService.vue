<script setup lang="ts">
// Логика не требуется
</script>

<template>
  <section class="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#0B1120]">
    
    <img 
      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
      alt="Logistics Services Terminal" 
      class="absolute inset-0 h-full w-full object-cover opacity-90"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent"></div>

    <div class="relative z-10 flex h-full items-center pt-20"> <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-3xl">
          
          <span class="mb-6 block text-sm font-bold uppercase tracking-widest text-blue-500">
            Наши услуги
          </span>

          <h1 class="font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[4rem]">
            Комплексные <br />
            решения для бизнеса<span class="text-blue-600">.</span>
          </h1>

          <p class="mt-8 text-lg leading-relaxed text-gray-300 md:text-xl max-w-2xl">
            От международных грузоперевозок до складской логистики и таможенного оформления. Мы обеспечиваем полный цикл движения вашего товара.
          </p>

          <div class="mt-12 flex flex-wrap gap-4">
            <NuxtLink 
              to="/#contacts"
              class="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
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
              class="rounded-full border-2 border-gray-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:border-white hover:text-[#0B1120]"
            >
              Получить консультацию
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
