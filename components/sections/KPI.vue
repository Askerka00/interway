<template>
  <section class="bg-white py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-14">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Надежная работа и ответственность
        </h2>
        <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Все условия перевозки, стоимость и ответственность за сохранность груза закрепляются в официальном договоре.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        <div 
          v-for="item in benefits" 
          :key="item.title"
          class="flex flex-col items-start p-7 rounded-2xl border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300"
        >
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
            </svg>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-2.5">
            {{ item.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed mb-5 text-sm">
            {{ item.description }}
          </p>

          <NuxtLink 
            to="/services" 
            class="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-500"
          >
            Подробнее об услугах →
          </NuxtLink>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const benefits = [
  {
    title: 'Фиксированная цена в договоре',
    description: 'Рассчитываем полную стоимость доставки до начала перевозки. Никаких скрытых доплат в пути или на границе.',
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  },
  {
    title: 'Сохранность груза',
    description: 'Проверяем упаковку при приемке на складе, делаем фотоотчет погрузки, пломбируем транспорт и оформляем страхование.',
    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
  },
  {
    title: 'Постоянная связь с менеджером',
    description: 'За вами закрепляется персональный специалист, который информирует о прохождении границы и готовит все закрывающие документы.',
    iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>
