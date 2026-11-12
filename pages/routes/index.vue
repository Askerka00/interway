<script setup lang="ts">
import { ROUTES_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Направления грузоперевозок в Казахстан: Китай, Турция, Россия, Европа, ОАЭ | INTER WAY',
  description: 'Международная доставка грузов в Алматы, Астану и по всему Казахстану из Китая, Турции, России, Европы, ОАЭ и Узбекистана. Авто, ЖД, авиа и контейнеры.',
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
    <section class="bg-[#0B1120] py-20 lg:py-28 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Направления</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Направления доставки грузов
          </h1>
          <p class="mt-5 text-lg text-gray-300 leading-relaxed max-w-2xl">
            Организуем перевозку и таможенное оформление грузов из ключевых стран-экспортеров в Алматы, Астану и любой город Казахстана.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 lg:py-28 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-6 md:grid-cols-2">
          <article
            v-for="route in ROUTES_DATA"
            :key="route.slug"
            class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-colors hover:border-slate-300"
          >
            <div>
              <h2 class="text-2xl font-bold text-slate-900">
                <NuxtLink :to="`/routes/${route.slug}`" class="hover:text-blue-600 transition-colors">
                  {{ route.fromCountry }} → {{ route.toCity }}
                </NuxtLink>
              </h2>
              <p class="mt-1.5 text-sm text-gray-500">
                Города отправления: {{ route.fromCity }}
              </p>

              <p class="mt-5 text-sm text-gray-600 leading-relaxed">
                {{ route.summary }}
              </p>

              <ul class="mt-5 space-y-2 border-t border-slate-100 pt-5">
                <li
                  v-for="(item, idx) in route.transportList"
                  :key="idx"
                  class="flex items-center gap-2.5 text-sm text-slate-700"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 flex items-center justify-between pt-5 border-t border-slate-100">
              <NuxtLink
                :to="`/routes/${route.slug}`"
                class="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
              >
                Подробнее о маршруте →
              </NuxtLink>
              <NuxtLink
                to="/#contacts"
                class="rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-600"
              >
                Оставить заявку
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
