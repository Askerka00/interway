<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#app'
import { ROUTES_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const currentRoute = computed(() => {
  const found = ROUTES_DATA.find((r) => r.slug === slug.value)
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Маршрут не найден' })
  }
  return found
})

const otherRoutes = computed(() => ROUTES_DATA.filter((r) => r.slug !== slug.value))

usePageSeo({
  title: currentRoute.value.seoTitle,
  description: currentRoute.value.seoDescription,
  path: `/routes/${currentRoute.value.slug}`,
  keywords: `доставка из ${currentRoute.value.fromCountry.toLowerCase()} в ${currentRoute.value.toCity.toLowerCase()}, грузоперевозки ${currentRoute.value.fromCountry.toLowerCase()} казахстан, растаможка ${currentRoute.value.toCity.toLowerCase()}, inter way`,
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Направления перевозок', path: '/routes' },
    { name: `${currentRoute.value.fromCountry} → ${currentRoute.value.toCity}`, path: `/routes/${currentRoute.value.slug}` }
  ],
  faqs: currentRoute.value.faqs,
  routeItem: currentRoute.value
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-20 lg:py-28 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/routes" class="hover:text-white transition">Направления</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Доставка грузов: {{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}
          </h1>

          <p class="mt-5 text-lg leading-relaxed text-gray-300">
            {{ currentRoute.summary }}
          </p>

          <p class="mt-3 text-sm text-gray-400">
            Основные города отправления: {{ currentRoute.fromCity }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink
              to="/tools/delivery-calculator"
              class="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
            >
              Рассчитать в калькуляторе
            </NuxtLink>
            <a
              href="https://wa.me/77003003390"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 lg:py-28">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl space-y-12">
        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">
            Способы доставки по этому направлению
          </h2>
          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="(item, idx) in currentRoute.transportList"
              :key="idx"
              class="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div class="mb-2 text-xs font-bold text-blue-600">Вариант 0{{ idx + 1 }}</div>
              <div class="text-base font-bold text-slate-900 leading-snug">{{ item }}</div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-slate-900 p-8 md:p-10 text-white">
          <h2 class="text-2xl font-bold mb-3">
            Оформление документов и таможня
          </h2>
          <p class="text-base text-gray-300 leading-relaxed">
            {{ currentRoute.customsNotes }}
          </p>
        </div>

        <div v-if="currentRoute.faqs.length > 0" class="space-y-4">
          <div
            v-for="(faq, fIdx) in currentRoute.faqs"
            :key="fIdx"
            class="rounded-2xl border border-slate-200 p-6"
          >
            <h3 class="text-base font-bold text-slate-900">{{ faq.q }}</h3>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-200 flex flex-wrap gap-3">
          <NuxtLink
            v-for="r in otherRoutes"
            :key="r.slug"
            :to="`/routes/${r.slug}`"
            class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-slate-400"
          >
            {{ r.fromCountry }} → {{ r.toCity }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
