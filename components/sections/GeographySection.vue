<script setup lang="ts">
import { ref } from 'vue'

// Данные для точек на карте. 
// top/left - координаты в процентах относительно картинки карты.
const locations = [
  { id: 1, name: 'Европа (Германия, Италия)', top: '28%', left: '49%' },
  { id: 2, name: 'Россия (Москва)', top: '22%', left: '58%' },
  { id: 3, name: 'Казахстан (Алматы)', top: '32%', left: '65%' },
  { id: 4, name: 'Китай (Шанхай)', top: '40%', left: '78%' },
  { id: 5, name: 'ОАЭ (Дубай)', top: '42%', left: '60%' },
  { id: 6, name: 'Турция (Стамбул)', top: '33%', left: '53%' },
]

// Активная точка (для мобилок по клику)
const activeLocation = ref<number | null>(null)

const toggleLocation = (id: number) => {
  if (activeLocation.value === id) {
    activeLocation.value = null
  } else {
    activeLocation.value = id
  }
}
</script>

<template>
  <section class="bg-slate-900 py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="mb-16 text-center">
        <span class="mb-4 block text-sm font-bold uppercase tracking-widest text-blue-500">
          География работы
        </span>
        <h2 class="mb-6 text-3xl font-bold text-white md:text-5xl">
          Работаем по всему миру
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-400">
          Наша логистическая сеть охватывает Россию, страны СНГ, Европу и Азию. 
          Мы обеспечиваем бесперебойные поставки в любую точку континента.
        </p>
      </div>

      <div class="relative mx-auto w-full max-w-6xl">
        
        <div class="relative aspect-[1.7/1] w-full overflow-hidden rounded-3xl bg-[#0F2445] border border-white/5 shadow-2xl">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
            alt="World Map" 
            class="h-full w-full object-cover opacity-30 invert filter" 
          />
          <div 
            v-for="loc in locations" 
            :key="loc.id"
            class="absolute cursor-pointer"
            :style="{ top: loc.top, left: loc.left }"
            @click="toggleLocation(loc.id)"
          >
            <div class="group relative flex items-center justify-center">
              
              <span class="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-blue-500 opacity-75 duration-1000"></span>
              
              <span class="relative inline-flex h-3 w-3 rounded-full bg-blue-500 ring-4 ring-slate-900/50 transition-colors group-hover:bg-white"></span>

              <div 
                class="absolute bottom-full mb-3 w-max translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                :class="{ 'opacity-100 translate-y-0': activeLocation === loc.id }"
              >
                <div class="relative rounded-lg bg-white px-4 py-2 shadow-xl">
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {{ loc.name }}
                  </p>
                  <div class="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 border-t border-white/10 pt-8">
          <div>
            <h4 class="text-3xl font-bold text-white">50+</h4>
            <p class="text-sm text-gray-400">Стран доставки</p>
          </div>
          <div>
            <h4 class="text-3xl font-bold text-white">1200+</h4>
            <p class="text-sm text-gray-400">Партнеров</p>
          </div>
          <div>
            <h4 class="text-3xl font-bold text-white">24/7</h4>
            <p class="text-sm text-gray-400">Поддержка</p>
          </div>
          <div>
             <NuxtLink to="/#contacts" class="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400">
              Рассчитать доставку
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
             </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
