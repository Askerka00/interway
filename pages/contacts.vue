<script setup lang="ts">
import { COMPANY_INFO } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Контакты ТОО «INTER WAY» в Алматы — адрес офиса, телефон и расчет доставки',
  description: 'Свяжитесь с логистической компанией ТОО «INTER WAY»: г. Алматы, Медеуский район, ул. Кунаева, д. 32. Телефон +7 700 300 3390, WhatsApp, Telegram. Расчет стоимости перевозки за 15 минут.',
  path: '/contacts',
  keywords: 'контакты inter way, логистическая компания алматы кунаева 32, телефон inter way алматы, заказать грузоперевозку алматы',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Контакты', path: '/contacts' }
  ]
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-16 md:py-20 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Контакты</span>
        </nav>

        <h1 class="text-3xl font-bold md:text-5xl">
          Контакты и офис {{ COMPANY_INFO.name }}
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-gray-300">
          Работаем с юридическими лицами и ИП по всему Казахстану, СНГ, Китаю и Европе. Отвечаем на запросы по расчету ставок в течение 15 минут.
        </p>
      </div>
    </section>

    <section class="py-12 md:py-16 border-b border-slate-100">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-2xl border border-slate-200 p-6 bg-slate-50">
            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Центральный офис</div>
            <div class="text-lg font-bold text-slate-900">{{ COMPANY_INFO.name }}</div>
            <p class="mt-2 text-sm text-gray-600">{{ COMPANY_INFO.address }}</p>
            <p class="mt-2 text-xs text-gray-500">Пн–Сб: 09:00 – 19:00 (дежурный диспетчер 24/7)</p>
          </div>

          <div class="rounded-2xl border border-slate-200 p-6 bg-slate-50">
            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Телефон и мессенджеры</div>
            <a :href="`tel:${COMPANY_INFO.phoneRaw}`" class="text-xl font-bold text-slate-900 hover:text-blue-600">
              {{ COMPANY_INFO.phone }}
            </a>
            <div class="mt-4 flex gap-3">
              <a :href="COMPANY_INFO.whatsapp" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500">
                Написать в WhatsApp
              </a>
              <a :href="COMPANY_INFO.telegram" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500">
                Telegram
              </a>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 p-6 bg-slate-50">
            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Отдел расчетов и ВЭД</div>
            <a :href="`mailto:${COMPANY_INFO.email}`" class="text-lg font-bold text-slate-900 hover:text-blue-600">
              {{ COMPANY_INFO.email }}
            </a>
            <p class="mt-2 text-sm text-gray-600">
              Для коммерческих предложений, инвойсов, упаковочных листов и тендеров на логистику.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
