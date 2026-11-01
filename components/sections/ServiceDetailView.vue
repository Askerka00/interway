<script setup lang="ts">
import { computed } from 'vue'
import { SERVICES_DATA, ROUTES_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const props = defineProps<{
  slug: string
}>()

const service = computed(() => SERVICES_DATA.find((s) => s.slug === props.slug) || SERVICES_DATA[0]!)
const otherServices = computed(() => SERVICES_DATA.filter((s) => s.slug !== props.slug))

usePageSeo({
  title: service.value.seoTitle,
  description: service.value.seoDescription,
  path: `/services/${service.value.slug}`,
  keywords: service.value.keywords,
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: service.value.shortTitle, path: `/services/${service.value.slug}` }
  ],
  faqs: service.value.faqs,
  service: service.value
})
</script>

<template>
  <div class="bg-white">
    <!-- Hero секция услуги -->
    <section class="bg-[#0B1120] py-16 md:py-24 text-white border-b border-white/10">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/services" class="hover:text-white transition">Услуги</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ service.shortTitle }}</span>
        </nav>

        <div class="max-w-4xl">
          <div class="mb-4 flex flex-wrap gap-3">
            <span class="rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
              Срок доставки: {{ service.transitTime }}
            </span>
            <span class="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-gray-200">
              Партии: {{ service.minWeight }}
            </span>
            <span class="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-1 text-xs font-bold text-emerald-300">
              Тариф: {{ service.priceFrom }}
            </span>
          </div>

          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            {{ service.h1 }}
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            {{ service.subtitle }}
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="#contacts"
              class="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-blue-500"
            >
              Рассчитать стоимость перевозки
            </NuxtLink>
            <a
              href="https://wa.me/77003003390"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-900"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Что входит в услугу + Виды грузов -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-12 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mb-6">
              Что входит в организацию перевозки
            </h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="(feature, idx) in service.features"
                :key="idx"
                class="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  ✓
                </div>
                <p class="text-sm leading-relaxed text-slate-700 font-medium">
                  {{ feature }}
                </p>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mt-14 mb-6">
              Ключевые преимущества для вашего бизнеса
            </h2>
            <div class="grid gap-6 md:grid-cols-3">
              <div
                v-for="(b, idx) in service.benefits"
                :key="idx"
                class="rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div class="mb-3 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Преимущество 0{{ idx + 1 }}
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">
                  {{ b.title }}
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ b.desc }}
                </p>
              </div>
            </div>
          </div>

          <aside class="space-y-8">
            <div class="rounded-3xl bg-slate-900 p-8 text-white">
              <h3 class="text-xl font-bold mb-4">
                Основные категории грузов
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(cargo, cIdx) in service.cargoTypes"
                  :key="cIdx"
                  class="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  {{ cargo }}
                </li>
              </ul>

              <div class="mt-8 border-t border-white/10 pt-6">
                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">География работы:</div>
                <div class="text-sm font-semibold text-white">{{ service.coverage }}</div>
              </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 class="text-base font-bold text-slate-900 mb-4">
                Другие услуги INTER WAY
              </h3>
              <div class="flex flex-col gap-2.5">
                <NuxtLink
                  v-for="other in otherServices"
                  :key="other.slug"
                  :to="`/services/${other.slug}`"
                  class="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/70 transition hover:text-blue-600 hover:ring-blue-500"
                >
                  <span>{{ other.shortTitle }}</span>
                  <span>→</span>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Этапы работы -->
    <section class="bg-slate-50 py-16 md:py-20 border-y border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mb-10">
          Как проходит работа по шагам
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, sIdx) in service.steps"
            :key="sIdx"
            class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              0{{ sIdx + 1 }}
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              {{ step.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Перелинковка с маршрутами -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
              Популярные направления для этой услуги
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Изучите сроки и ориентировочные ставки по конкретным странам отправления.
            </p>
          </div>
          <NuxtLink to="/routes" class="text-sm font-bold text-blue-600 hover:text-blue-700">
            Все маршруты →
          </NuxtLink>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="route in ROUTES_DATA.slice(0, 4)"
            :key="route.slug"
            :to="`/routes/${route.slug}`"
            class="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-500 hover:shadow-md"
          >
            <div class="text-xs font-bold text-blue-600 mb-1">
              {{ route.transportOptions[0]?.transitDays }}
            </div>
            <div class="font-bold text-slate-900">
              {{ route.fromCountry }} → {{ route.toCity }}
            </div>
            <div class="mt-2 text-xs text-gray-500">
              {{ route.transportOptions[0]?.priceEstimate }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ по услуге -->
    <section class="bg-slate-50 py-16 md:py-20 border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl mb-8 text-center">
          Частые вопросы: {{ service.shortTitle }}
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in service.faqs"
            :key="fIdx"
            class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h3 class="text-base font-bold text-slate-900">
              {{ faq.q }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
