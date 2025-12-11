<script setup lang="ts">
const steps = [
  {
    id: '01',
    title: 'Оформление заявки',
    description: 'Вы оставляете заявку на сайте или связываетесь с менеджером. Мы рассчитываем точную стоимость и сроки.',
    icon: 'clipboard'
  },
  {
    id: '02',
    title: 'Прием и упаковка',
    description: 'Забираем груз с вашего склада. При необходимости производим надежную упаковку и маркировку.',
    icon: 'box'
  },
  {
    id: '03',
    title: 'Транспортировка',
    description: 'Груз отправляется выбранным маршрутом. Вы можете отслеживать его статус в режиме реального времени.',
    icon: 'truck'
  },
  {
    id: '04',
    title: 'Доставка получателю',
    description: 'Финальный этап — доставка "до двери" и передача закрывающих документов.',
    icon: 'check'
  }
]
</script>

<template>
  <section class="bg-white py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="mb-20 text-center">
        <span class="mb-4 block text-sm font-bold uppercase tracking-widest text-blue-600">
          Процесс работы
        </span>
        <h2 class="text-3xl font-bold text-slate-900 md:text-5xl">
          От заявки до получения — <br />
          <span class="text-blue-600">всего 4 простых шага</span>
        </h2>
      </div>

      <div class="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        
        <div class="absolute top-12 left-0 hidden h-0.5 w-full border-t-2 border-dashed border-slate-200 lg:block" aria-hidden="true"></div>

        <div 
          v-for="(step, index) in steps" 
          :key="step.id" 
          class="group relative pt-4"
        >
          <span class="absolute -top-6 left-0 -z-10 text-8xl font-bold text-slate-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 select-none">
            {{ step.id }}
          </span>

          <div class="relative mb-8 flex items-center justify-center lg:justify-start">
            <div class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-8 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-900">
              
              <svg v-if="step.icon === 'clipboard'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>

              <svg v-if="step.icon === 'box'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

              <svg v-if="step.icon === 'truck'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>

              <svg v-if="step.icon === 'check'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>
          </div>

          <div class="text-center lg:text-left">
            <h3 class="mb-3 text-xl font-bold text-slate-900">
              {{ step.title }}
            </h3>
            <p class="text-base leading-relaxed text-gray-500">
              {{ step.description }}
            </p>
          </div>

        </div>
      </div>

      <div class="mt-16 text-center">
        <NuxtLink to="/#contacts" class="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-600 hover:shadow-lg">
          Рассчитать стоимость
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
