<script setup lang="ts">
const services = [
  {
    title: 'Ж/Д перевозки',
    description: 'Железнодорожная доставка по всей России и СНГ с контролем сроков и подбором подходящего состава.',
    icon: 'rail',
    features: [
      'Маршруты по РФ и СНГ',
      'Работа с разными типами вагонов',
      'Контроль на каждом этапе',
      'Оптимальные тарифы',
      'Подбор подвижного состава'
    ]
  },
  {
    title: 'Авто перевозки',
    description: 'Гибкая автомобильная логистика для срочных и негабаритных отправок с маршрутом дверь‑в‑дверь.',
    icon: 'road',
    features: [
      'Доставка дверь‑в‑дверь',
      'Современный парк ТС',
      'Перевозка негабарита',
      'Срочная доставка',
      'Мультимодальные схемы'
    ]
  },
  {
    title: 'Контейнерные перевозки',
    description: 'Морские и наземные контейнерные маршруты с консолидацией и полным сопровождением.',
    icon: 'container',
    features: [
      'Морские и наземные маршруты',
      "20' и 40' контейнеры",
      'Консолидация грузов',
      'Складские решения',
      'Полное таможенное сопровождение'
    ]
  },
  {
    title: 'Таможенное оформление',
    description: 'Проходим таможню быстро и без задержек: документы, коды и представительство.',
    icon: 'customs',
    features: [
      'Подготовка документов',
      'Консультации по ВЭД',
      'Подбор кодов ТН ВЭД',
      'Представление интересов в таможне',
      'Минимизация платежей'
    ]
  },
  {
    title: 'Экспедиторские услуги',
    description: 'Комплексная организация перевозки с заботой о каждой детали и страхованием рисков.',
    icon: 'forwarding',
    features: [
      'Маршрутизация и планирование',
      'Подбор транспорта',
      'Организация перевалки',
      'Страхование грузов',
      'Трекинг в реальном времени'
    ]
  },
  {
    title: 'Складские услуги',
    description: 'Складские комплексы класса А+ с контролем температур и точным учетом.',
    icon: 'warehouse',
    features: [
      'Краткосрочное и долгосрочное хранение',
      'Температурные режимы',
      'Погрузочно-разгрузочные работы',
      'Комплектация и упаковка',
      'Система учета и контроль'
    ]
  }
]
</script>

<template>
  <section class="bg-slate-50 py-20 lg:py-32">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="mb-16 max-w-2xl">
        <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
          Наши услуги
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          Мы предлагаем полный цикл логистических решений, адаптированных под специфику вашего бизнеса.
        </p>
      </div>

      <div class="flex flex-col gap-8">
        
        <div 
          v-for="(service, idx) in services" 
          :key="idx"
          class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-blue-500/50 md:p-10 lg:flex lg:gap-12"
        >
          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

          <div class="relative z-10 flex flex-col items-start lg:w-1/3 lg:shrink-0">
            
            <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <svg v-if="service.icon === 'rail'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 19.5h16.5M3.75 15h16.5M3.75 10.5h16.5M8.25 6 12 4.5 15.75 6m-11.25 0h16.5v12a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5V6Z" />
              </svg>
              <svg v-else-if="service.icon === 'road'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 21h6m-3-3v3m0-18-7.5 15m7.5-15 7.5 15M9 9h6" />
              </svg>
              <svg v-else-if="service.icon === 'container'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 6v12m4.5-12v12m4.5-12v12" />
              </svg>
              <svg v-else-if="service.icon === 'customs'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <svg v-else-if="service.icon === 'forwarding'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <svg v-else-if="service.icon === 'warehouse'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .415.336.75.75.75Z" />
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {{ service.title }}
            </h3>
            <p class="mt-4 text-base leading-relaxed text-gray-500">
              {{ service.description }}
            </p>

            <a href="#" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-transform group-hover:translate-x-2">
              Подробнее
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <div class="my-8 h-px w-full bg-slate-100 lg:my-0 lg:h-auto lg:w-px"></div>

          <div class="relative z-10 flex-1 lg:pl-4">
            <h4 class="mb-6 text-sm font-bold uppercase tracking-wider text-slate-400">
              Что входит в услугу:
            </h4>
            
            <ul class="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <li 
                v-for="(feature, fIdx) in service.features" 
                :key="fIdx"
                class="flex items-start gap-3"
              >
                <div class="flex-none pt-1 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-sm text-gray-600">
                  {{ feature }}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <div class="mt-16 flex flex-col items-center justify-center rounded-2xl bg-slate-900 px-6 py-12 text-center md:px-12">
        <h3 class="text-2xl font-bold text-white md:text-3xl">Не нашли нужную услугу?</h3>
        <p class="mt-4 max-w-2xl text-gray-400">
          Мы разрабатываем индивидуальные логистические решения для нестандартных задач. Свяжитесь с нами для консультации.
        </p>
        <NuxtLink
          to="/#contacts"
          class="mt-8 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/50"
        >
          Получить консультацию
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
