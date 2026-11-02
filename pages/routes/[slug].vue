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
    <section class="bg-[#0B1120] py-24 lg:py-32 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-8 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/routes" class="hover:text-white transition">Направления</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}</span>
        </nav>

        <div class="max-w-3xl">
          <span class="mb-4 block text-xs font-bold uppercase tracking-widest text-blue-400">
            Дистанция ~{{ currentRoute.distanceKm }} км • Хабы: {{ currentRoute.fromCity }}
          </span>

          <h1 class="text-3xl font-bold leading-[1.15] md:text-5xl">
            Доставка грузов: {{ currentRoute.fromCountry }} → {{ currentRoute.toCity }}
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-gray-300">
            {{ currentRoute.seoDescription }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink
              to="/tools/delivery-calculator"
              class="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-blue-500"
            >
              Рассчитать в калькуляторе
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

    <section class="py-24 lg:py-32">
      <div class="container mx-auto px-6 md:px-12 max-w-5xl space-y-16">
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-8">
            Сроки и тарифы по видам транспорта
          </h2>
          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="(opt, idx) in currentRoute.transportOptions"
              :key="idx"
              class="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  {{ opt.transitDays }}
                </div>
                <h3 class="text-xl font-bold text-slate-900">
                  <NuxtLink :to="`/services/${opt.modeSlug}`" class="hover:text-blue-600 transition">
                    {{ opt.mode }}
                  </NuxtLink>
                </h3>
                <p class="mt-3 text-sm text-gray-600 leading-relaxed">
                  {{ opt.bestFor }}
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-slate-200 text-base font-bold text-slate-900">
                {{ opt.priceEstimate }}
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-slate-900 p-8 md:p-10 text-white">
          <h2 class="text-2xl font-bold mb-3">
            Таможня и пограничные переходы
          </h2>
          <p class="text-base text-gray-300 leading-relaxed mb-6">
            {{ currentRoute.customsNotes }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(cp, cIdx) in currentRoute.borderCheckpoints"
              :key="cIdx"
              class="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-blue-300"
            >
              {{ cp }}
            </span>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-200 flex flex-wrap gap-3">
          <NuxtLink
            v-for="r in otherRoutes"
            :key="r.slug"
            :to="`/routes/${r.slug}`"
            class="rounded-full bg-slate-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 ring-1 ring-slate-200 hover:ring-blue-600 hover:text-blue-600 transition"
          >
            {{ r.fromCountry }} → {{ r.toCity }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
