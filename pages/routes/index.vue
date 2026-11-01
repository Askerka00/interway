<script setup lang="ts">
import { ROUTES_DATA, SERVICES_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Направления и маршруты грузоперевозок в Казахстан: Китай, Турция, РФ, ЕС, ОАЭ | INTER WAY',
  description: 'Сроки, тарифы и пограничные переходы по ключевым маршрутам доставки грузов в Алматы и Астану: из Китая, Турции, России, Европы, ОАЭ и Узбекистана.',
  path: '/routes',
  keywords: 'доставка грузов из китая в алматы, доставка из турции в казахстан, грузоперевозки из россии в казахстан, доставка из дубая в алматы, грузоперевозки алматы астана',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Направления перевозок', path: '/routes' }
  ]
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-16 md:py-24 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Направления перевозок</span>
        </nav>

        <div class="max-w-3xl">
          <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-400">
            География и логистические коридоры
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Маршруты доставки грузов в Казахстан и по СНГ
          </h1>
          <p class="mt-6 text-lg text-gray-300 leading-relaxed">
            Выберите нужное направление, чтобы узнать точные сроки авто-, Ж/Д и авиадоставки, используемые пограничные переходы (Хоргос, Достык, ТМТМ), ориентировочные ставки фрахта и правила таможенного оформления.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 md:grid-cols-2">
          <article
            v-for="route in ROUTES_DATA"
            :key="route.slug"
            class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-500 hover:shadow-xl"
          >
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span class="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
                  Дистанция: ~{{ route.distanceKm }} км
                </span>
                <span class="text-xs font-semibold text-slate-500">
                  {{ route.borderCheckpoints[0] }}
                </span>
              </div>

              <h2 class="text-2xl font-bold text-slate-900 hover:text-blue-600 transition">
                <NuxtLink :to="`/routes/${route.slug}`">
                  Доставка {{ route.fromCountry }} → {{ route.toCity }}
                </NuxtLink>
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                Хабы отправления: {{ route.fromCity }}
              </p>

              <div class="mt-6 space-y-2.5 border-t border-slate-100 pt-4">
                <div
                  v-for="(opt, idx) in route.transportOptions"
                  :key="idx"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="font-medium text-slate-700">{{ opt.mode }}</span>
                  <div class="text-right">
                    <span class="font-bold text-slate-900">{{ opt.transitDays }}</span>
                    <span class="ml-2 text-xs text-blue-600 font-semibold">({{ opt.priceEstimate }})</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
              <NuxtLink
                :to="`/routes/${route.slug}`"
                class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
              >
                Подробный разбор маршрута →
              </NuxtLink>
              <NuxtLink
                to="#contacts"
                class="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition"
              >
                Запросить ставку
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="mt-16 rounded-3xl bg-slate-50 p-8 border border-slate-200">
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            Виды транспорта по всем направлениям
          </h2>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="s in SERVICES_DATA"
              :key="s.slug"
              :to="`/services/${s.slug}`"
              class="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-blue-600 hover:ring-blue-500 transition"
            >
              {{ s.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
