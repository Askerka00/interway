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
    <section class="bg-[#0B1120] py-20 lg:py-28 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/services" class="hover:text-white transition">Услуги</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">{{ service.shortTitle }}</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            {{ service.h1 }}
          </h1>

          <p class="mt-5 text-lg leading-relaxed text-gray-300 max-w-2xl">
            {{ service.subtitle }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <NuxtLink
              to="#contacts"
              class="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
            >
              Оставить заявку на расчет
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
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-2xl mb-12">
          <h2 class="text-3xl font-bold text-slate-900">
            Что входит в услугу
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(feature, idx) in service.features"
            :key="idx"
            class="rounded-3xl border border-slate-200 bg-slate-50 p-7"
          >
            <div class="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
              ✓
            </div>
            <p class="text-base leading-relaxed text-slate-800">
              {{ feature }}
            </p>
          </div>
        </div>

        <div class="mt-20">
          <div class="max-w-2xl mb-12">
            <h2 class="text-3xl font-bold text-slate-900">
              Почему это удобно для вас
            </h2>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="(b, idx) in service.benefits"
              :key="idx"
              class="rounded-3xl border border-slate-200 bg-white p-8"
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

    <section class="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
      <div class="container mx-auto px-6 md:px-12 max-w-3xl">
        <h2 class="text-3xl font-bold text-slate-900 mb-10 text-center">
          Частые вопросы
        </h2>

        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in service.faqs"
            :key="fIdx"
            class="rounded-2xl border border-slate-200 bg-white overflow-hidden"
          >
            <button
              type="button"
              @click="toggleFaq(fIdx)"
              class="w-full flex items-center justify-between px-7 py-5 text-left text-base font-bold text-slate-900"
            >
              <span>{{ faq.q }}</span>
              <span class="ml-4 text-xl text-blue-600">{{ openFaqIdx === fIdx ? '−' : '+' }}</span>
            </button>
            <div v-show="openFaqIdx === fIdx" class="px-7 pb-6 text-sm leading-relaxed text-gray-600">
              {{ faq.a }}
            </div>
          </div>
        </div>

        <div class="mt-14 pt-10 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            v-for="other in otherServices"
            :key="other.slug"
            :to="`/services/${other.slug}`"
            class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-slate-400"
          >
            {{ other.shortTitle }} →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
