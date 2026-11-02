<script setup lang="ts">
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Онлайн-калькуляторы логистики и растаможки в Казахстане | INTER WAY',
  description: 'Удобные онлайн-калькуляторы для расчета стоимости доставки грузов из Китая, Турции и России, расчета таможенных платежей в Казахстане и объема груза в кубометрах.',
  path: '/tools',
  keywords: 'калькулятор доставки из китая в казахстан, таможенный калькулятор казахстан, расчет объема груза м3 калькулятор, расчет грузоперевозки по казахстану',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' }
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
          <span class="text-blue-400 font-semibold">Калькуляторы</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Онлайн-калькуляторы доставки и растаможки
          </h1>
          <p class="mt-5 text-lg text-gray-300 leading-relaxed max-w-2xl">
            Выберите нужный инструмент, чтобы быстро оценить бюджет перевозки, сумму таможенных платежей или объем вашей партии.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 lg:py-28 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="tool in TOOLS_DATA"
            :key="tool.slug"
            :to="`/tools/${tool.slug}`"
            class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-colors hover:border-slate-400 md:p-10"
          >
            <div>
              <span class="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 mb-4">
                {{ tool.badge }}
              </span>

              <h2 class="text-2xl font-bold text-slate-900">
                {{ tool.title }}
              </h2>

              <p class="mt-3 text-base text-gray-600 leading-relaxed">
                {{ tool.subtitle }}
              </p>
            </div>

            <div class="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <span class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">
                Открыть калькулятор →
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
