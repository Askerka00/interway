<template>
  <section class="bg-white py-16 md:py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Стандарты работы и гарантии
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Работаем по KPI логистики: сроки отгрузки, сохранность груза, своевременность доставки (OTIF) и скорость реакции. Все показатели фиксируются в договоре.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        <div 
          v-for="item in benefits" 
          :key="item.title"
          class="group relative flex flex-col items-start p-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200"
        >
          <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <svg 
              class="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
            </svg>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            {{ item.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ item.description }}
          </p>

          <a 
            href="#" 
            class="mt-auto inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500"
          >
            Подробнее
            <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

      </div>

      <div class="mt-20 rounded-3xl bg-blue-600 overflow-hidden shadow-xl sm:mt-24">
        <div class="px-6 py-12 sm:px-12 lg:py-16 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          
          <div class="max-w-xl">
            <h3 class="text-2xl font-bold text-white mb-4">
              Гарантия уровня сервиса (SLA)
            </h3>
            <p class="text-blue-100 text-lg">
              Фиксируем в SLA время реакции, готовность транспорта, дедлайны документооборота и ответственность за простои. Нарушаем — компенсируем.
            </p>
          </div>

          <div class="mt-8 sm:mt-0 sm:ml-8">
            <button class="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition-colors duration-200 hover:bg-blue-50">
              Скачать пример SLA
            </button>
          </div>

        </div>
        
        <div class="grid grid-cols-1 divide-y divide-blue-500/50 bg-blue-700/30 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div class="p-6 text-center">
            <div class="text-4xl font-bold text-white">98.5%</div>
            <div class="mt-1 text-sm text-blue-200">OTIF (срок + сохранность)</div>
          </div>
          <div class="p-6 text-center">
            <div class="text-4xl font-bold text-white">&lt; 20 мин</div>
            <div class="mt-1 text-sm text-blue-200">Реакция на инциденты</div>
          </div>
          <div class="p-6 text-center">
            <div class="text-4xl font-bold text-white">0.02%</div>
            <div class="mt-1 text-sm text-blue-200">Повреждений/утрат</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Импорты больше не нужны

const benefits = [
  {
    title: 'Прозрачные KPI по доставке',
    description: 'Фиксируем SLA на подачу машины, оформление документов и время в пути. В договоре: OTIF, контроль повреждений, скорость погрузки/разгрузки.',
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  },
  {
    title: 'Гарантии сохранности',
    description: 'Страхуем грузы, делаем пломбировку, фото- и видеоконтроль. Ведём расследование по каждому инциденту и компенсируем подтверждённый ущерб.',
    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
  },
  {
    title: 'Онлайн-контроль 24/7',
    description: 'Трекинг рейсов, уведомления о статусе, аналитика по маршрутам и простоям. Один кабинет для склада, транспорта и документооборота.',
    iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>

<style scoped>
</style>
