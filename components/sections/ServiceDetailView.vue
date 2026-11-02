<script setup lang="ts">
import { computed, ref } from 'vue'
import { SERVICES_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const props = defineProps<{
  slug: string
}>()

const service = computed(() => SERVICES_DATA.find((s) => s.slug === props.slug) || SERVICES_DATA[0]!)
const otherServices = computed(() => SERVICES_DATA.filter((s) => s.slug !== props.slug))

const openFaqIdx = ref<number | null>(0)
const toggleFaq = (idx: number) => {
  openFaqIdx.value = openFaqIdx.value === idx ? null : idx
}

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
    <!-- Просторная Hero секция -->
    <section class="bg-[#0B1120] py-24 lg:py-32 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-8 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/services" class="hover:text-white transition">Услуги</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ service.shortTitle }}</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-[1.15] md:text-5xl">
            {{ service.h1 }}
          </h1>

          <p class="mt-6 text-lg leading-relaxed text-gray-300 max-w-2xl">
            {{ service.subtitle }}
          </p>

          <!-- Ключевые метрики в чистой плашке -->
          <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div class="text-xs text-gray-400">Сроки доставки</div>
              <div class="mt-1 text-base font-bold text-white">{{ service.transitTime }}</div>
            </div>
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div class="text-xs text-gray-400">Ориентир тарифа</div>
              <div class="mt-1 text-base font-bold text-blue-400">{{ service.priceFrom }}</div>
            </div>
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div class="text-xs text-gray-400">Объем партии</div>
              <div class="mt-1 text-base font-bold text-white">{{ service.minWeight }}</div>
            </div>
          </div>

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
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Секция: Что входит + Преимущества (с большим воздухом) -->
    <section class="py-24 lg:py-32">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-2xl mb-14">
          <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
            Состав услуги
          </span>
          <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
            Что мы берем на себя
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(feature, idx) in service.features"
            :key="idx"
            class="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200/70"
          >
            <div class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
              0{{ idx + 1 }}
            </div>
            <p class="text-base leading-relaxed text-slate-800 font-medium">
              {{ feature }}
            </p>
          </div>
        </div>

        <!-- 3 главных преимущества на всю ширину -->
        <div class="mt-24">
          <div class="max-w-2xl mb-14">
            <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
              Стандарты работы
            </span>
            <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
              Почему выбирают этот формат
            </h2>
          </div>

          <div class="grid gap-8 md:grid-cols-3">
            <div
              v-for="(b, idx) in service.benefits"
              :key="idx"
              class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
            >
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                {{ b.title }}
              </h3>
              <p class="text-base text-gray-600 leading-relaxed">
                {{ b.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Компактный FAQ-аккордеон и переключение услуг -->
    <section class="bg-slate-50 py-24 lg:py-32 border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-3xl font-bold text-slate-900 mb-10 text-center">
          Частые вопросы
        </h2>

        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in service.faqs"
            :key="fIdx"
            class="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden"
          >
            <button
              type="button"
              @click="toggleFaq(fIdx)"
              class="w-full flex items-center justify-between px-7 py-5 text-left text-base font-bold text-slate-900 hover:text-blue-600 transition"
            >
              <span>{{ faq.q }}</span>
              <span class="ml-4 text-xl text-blue-600">{{ openFaqIdx === fIdx ? '−' : '+' }}</span>
            </button>
            <div v-show="openFaqIdx === fIdx" class="px-7 pb-6 text-sm leading-relaxed text-gray-600">
              {{ faq.a }}
            </div>
          </div>
        </div>

        <div class="mt-16 pt-12 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            v-for="other in otherServices"
            :key="other.slug"
            :to="`/services/${other.slug}`"
            class="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 ring-1 ring-slate-200 hover:ring-blue-600 hover:text-blue-600 transition"
          >
            {{ other.shortTitle }} →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
