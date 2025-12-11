<script setup lang="ts">
const services = [
  {
    title: 'Экспедиторские услуги',
    description: 'Комплексная организация перевозок с заботой о каждой детали вашего груза. Мы берем на себя всю бюрократию и логистику.',
    icon: 'forwarding',
    features: [
      'Маршрутизация и планирование',
      'Подбор оптимального транспорта',
      'Организация перевалки грузов',
      'Страхование от всех рисков',
      'Отслеживание 24/7',
      'Подготовка документов'
    ]
  },
  {
    title: 'Складские услуги',
    description: 'Современные складские комплексы класса А+ с полным спектром услуг по безопасному хранению и обработке грузов.',
    icon: 'warehouse',
    features: [
      'Краткосрочное хранение',
      'Температурные режимы',
      'Погрузочно-разгрузочные работы',
      'Комплектация и стикеровка',
      'Система учета WMS',
      'Кросс-докинг операций'
    ]
  },
  {
    title: 'Таможенное оформление',
    description: 'Проходим таможню быстро и без задержек. Помогаем с классификацией товаров и расчетом пошлин.',
    icon: 'customs',
    features: [
      'Подбор кодов ТН ВЭД',
      'Расчет таможенных платежей',
      'Оформление деклараций (ДТ)',
      'Сертификация продукции',
      'Представление в таможне',
      'Консультации по ВЭД'
    ]
  }
]
</script>

<template>
  <section class="w-full bg-[#0B1120]">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="flex flex-col gap-8">
        
        <div 
          v-for="(service, idx) in services" 
          :key="idx"
          class="group relative overflow-hidden rounded-3xl bg-[#131B2D] border border-white/5 p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 md:p-10 lg:flex lg:gap-12"
        >
          
          <div class="relative z-10 flex flex-col items-start lg:w-[40%] lg:shrink-0">
            
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
              <svg v-if="service.icon === 'forwarding'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <svg v-if="service.icon === 'warehouse'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .415.336.75.75.75Z" />
              </svg>
              <svg v-if="service.icon === 'customs'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {{ service.title }}
            </h3>
            <p class="mt-4 text-base leading-relaxed text-gray-400">
              {{ service.description }}
            </p>

            <NuxtLink to="/#contacts" class="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500 transition-all group-hover:gap-3 group-hover:text-blue-400">
              Оставить заявку
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <div class="my-8 h-px w-full bg-white/5 lg:my-0 lg:h-auto lg:w-px"></div>

          <div class="relative z-10 flex-1 lg:pl-12 lg:pt-2">
            <h4 class="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">
              Что входит в услугу:
            </h4>
            
            <ul class="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <li 
                v-for="(feature, fIdx) in service.features" 
                :key="fIdx"
                class="flex items-start gap-3"
              >
                <div class="flex-none pt-0.5 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-300">
                  {{ feature }}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
