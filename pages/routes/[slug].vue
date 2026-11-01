<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#app'
import { ROUTES_DATA, SERVICES_DATA } from '~/data/seoData'
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
    <section class="bg-[#0B1120] py-16 md:py-24 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/routes" class="hover:text-white transition">Направления</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}</span>
        </nav>

        <div class="max-w-4xl">
          <div class="mb-4 flex flex-wrap gap-3">
            <span class="rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
              Расстояние: ~{{ currentRoute.distanceKm }} км
            </span>
            <span class="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-gray-200">
              Хабы: {{ currentRoute.fromCity }}
            </span>
          </div>

          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Доставка грузов из {{ currentRoute.fromCountry }} ({{ currentRoute.fromCity }}) в {{ currentRoute.toCity }}
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-gray-300">
            {{ currentRoute.seoDescription }}
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="#contacts"
              class="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-blue-500"
            >
              Рассчитать этот маршрут за 15 мин
            </NuxtLink>
            <a
              href="https://wa.me/77003003390"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-900"
            >
              Консультация в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-12 lg:grid-cols-3">
          <div class="lg:col-span-2 space-y-12">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mb-6">
                Сроки и стоимость доставки по видам транспорта
              </h2>
              <div class="overflow-hidden rounded-2xl border border-slate-200">
                <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-5 py-4 font-bold text-slate-900">Вид транспорта</th>
                      <th class="px-5 py-4 font-bold text-slate-900">Расчетный срок</th>
                      <th class="px-5 py-4 font-bold text-slate-900">Ориентир тарифа</th>
                      <th class="px-5 py-4 font-bold text-slate-900">Для каких грузов</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 bg-white">
                    <tr v-for="(opt, idx) in currentRoute.transportOptions" :key="idx">
                      <td class="px-5 py-4 font-bold text-blue-600">
                        <NuxtLink :to="`/services/${opt.modeSlug}`" class="hover:underline">
                          {{ opt.mode }}
                        </NuxtLink>
                      </td>
                      <td class="px-5 py-4 font-semibold text-slate-900">{{ opt.transitDays }}</td>
                      <td class="px-5 py-4 text-slate-700 font-medium">{{ opt.priceEstimate }}</td>
                      <td class="px-5 py-4 text-gray-600">{{ opt.bestFor }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="rounded-3xl bg-slate-50 p-8 border border-slate-200">
              <h2 class="text-xl font-bold text-slate-900 mb-3">
                Таможенное оформление и пограничные переходы
              </h2>
              <p class="text-sm text-gray-700 leading-relaxed mb-5">
                {{ currentRoute.customsNotes }}
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Погранпереходы:</span>
                <span
                  v-for="(cp, cIdx) in currentRoute.borderCheckpoints"
                  :key="cIdx"
                  class="rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200"
                >
                  {{ cp }}
                </span>
              </div>
            </div>

            <div v-if="currentRoute.faqs.length > 0">
              <h2 class="text-2xl font-bold text-slate-900 mb-6">
                Частые вопросы по направлению {{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}
              </h2>
              <div class="space-y-4">
                <div
                  v-for="(faq, fIdx) in currentRoute.faqs"
                  :key="fIdx"
                  class="rounded-2xl border border-slate-200 p-6"
                >
                  <h3 class="text-base font-bold text-slate-900">{{ faq.q }}</h3>
                  <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ faq.a }}</p>
                </div>
              </div>
            </div>
          </div>

          <aside class="space-y-8">
            <div class="rounded-3xl bg-slate-900 p-8 text-white">
              <h3 class="text-lg font-bold mb-4">
                Что чаще всего возят по этому маршруту
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(cargo, idx) in currentRoute.popularCargo"
                  :key="idx"
                  class="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  {{ cargo }}
                </li>
              </ul>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 class="text-base font-bold text-slate-900 mb-4">
                Другие популярные маршруты
              </h3>
              <div class="flex flex-col gap-2.5">
                <NuxtLink
                  v-for="r in otherRoutes"
                  :key="r.slug"
                  :to="`/routes/${r.slug}`"
                  class="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/70 transition hover:text-blue-600 hover:ring-blue-500"
                >
                  <span>{{ r.fromCountry }} → {{ r.toCity }}</span>
                  <span>→</span>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
