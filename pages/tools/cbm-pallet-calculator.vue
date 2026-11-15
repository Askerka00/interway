<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const lengthCm = ref(120)
const widthCm = ref(80)
const heightCm = ref(150)
const weightOneKg = ref(300)
const quantity = ref(10)

const totalVolumeCbm = computed(() => {
  const oneVol = ((Number(lengthCm.value) || 0) * (Number(widthCm.value) || 0) * (Number(heightCm.value) || 0)) / 1000000
  return Number((oneVol * (Number(quantity.value) || 0)).toFixed(2))
})

const totalWeightKg = computed(() => Math.round((Number(weightOneKg.value) || 0) * (Number(quantity.value) || 0)))

const recommendedTransport = computed(() => {
  if (totalVolumeCbm.value <= 15 && totalWeightKg.value <= 5000) {
    return 'Небольшая партия — выгоднее всего отправить в составе сборного груза: вы платите только за своё место в машине.'
  }
  if (totalVolumeCbm.value <= 33 && totalWeightKg.value <= 22000) {
    return 'Оптимально подойдёт 20-футовый контейнер до 33 м³ или половина еврофуры.'
  }
  if (totalVolumeCbm.value <= 76 && totalWeightKg.value <= 26000) {
    return 'Оптимально подойдёт 40-футовый контейнер до 76 м³ или отдельная еврофура до 90 м³.'
  }
  return 'Крупная партия — потребуется несколько фур, контейнеров или железнодорожный вагон.'
})

const whatsappCbmUrl = computed(() => {
  const text = `Здравствуйте! Посчитал объем своего груза на сайте:
• Количество мест: ${quantity.value} шт. (размер ${lengthCm.value}×${widthCm.value}×${heightCm.value} см)
• Общий объем: ${totalVolumeCbm.value} м³
• Общий вес: ${totalWeightKg.value} кг
Подскажите стоимость доставки.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как рассчитать объём груза в кубометрах?',
    a: 'Умножьте длину, ширину и высоту одной коробки в метрах, а затем умножьте полученное число на количество коробок.'
  },
  {
    q: 'Сколько стандартных паллет помещается в еврофуру и контейнер?',
    a: 'В стандартную еврофуру помещается до 33 паллет 120×80 см в один ярус. В 20-футовый контейнер — до 11 паллет, в 40-футовый — до 25 паллет.'
  },
  {
    q: 'Почему логисты считают объёмный вес, если груз лёгкий?',
    a: 'Лёгкий, но габаритный груз занимает много места в машине или самолёте. Для авто 1 м³ приравнивается к 250–333 кг, для авиа — к 167 кг. Оплата идёт по большему весу.'
  }
]

const relatedTools = [
  ...TOOLS_DATA.filter(x => x.slug !== 'cbm-pallet-calculator'),
  { slug: 'container-load-calculator', shortTitle: 'Загрузка контейнера и объёмный вес' },
  { slug: 'tnved-directory', shortTitle: 'Справочник ТН ВЭД' }
]

usePageSeo({
  title: 'Калькулятор объёма груза м³ и паллет в фуру и контейнер | INTER WAY',
  description: 'Простой онлайн-калькулятор объема груза в кубометрах по размерам коробок или паллет. Узнайте, какой транспорт подойдет под ваш груз.',
  path: '/tools/cbm-pallet-calculator',
  keywords: 'расчет объема груза м3 калькулятор, калькулятор объема и веса груза, расчет паллет в фуре, сколько паллет входит в фуру',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Расчет объема и паллет', path: '/tools/cbm-pallet-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор объема груза и паллет INTER WAY',
    category: 'UtilitiesApplication'
  }
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-16 lg:py-24 text-white">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/tools" class="hover:text-white transition">Калькуляторы</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Расчет объема и паллет</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор объема груза и паллет
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Введите размеры одной коробки или паллеты и их количество — мы сразу посчитаем общий объем в кубометрах и подскажем подходящий транспорт.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <div class="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <h2 class="text-xl font-bold text-slate-900">
                Размеры одного места
              </h2>
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="lengthCm = 120; widthCm = 80; heightCm = 150; weightOneKg = 350"
                  class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Стандартная паллета 120×80
                </button>
                <button
                  type="button"
                  @click="lengthCm = 60; widthCm = 40; heightCm = 40; weightOneKg = 15"
                  class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Коробка 60×40×40
                </button>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Длина (см)</label>
                <input v-model.number="lengthCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Ширина (см)</label>
                <input v-model.number="widthCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Высота (см)</label>
                <input v-model.number="heightCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Вес 1 места (кг)</label>
                <input v-model.number="weightOneKg" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Количество мест (шт)</label>
                <input v-model.number="quantity" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white">
              <h3 class="text-xl font-bold border-b border-white/10 pb-4">
                Итоговый объем и вес вашей партии
              </h3>

              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Общий объем</div>
                  <div class="mt-1 text-3xl font-bold text-blue-400">{{ totalVolumeCbm }} м³</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Общий вес</div>
                  <div class="mt-1 text-3xl font-bold text-white">{{ totalWeightKg.toLocaleString('ru-RU') }} кг</div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-white/5 p-5 border border-white/10">
                <div class="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Какой транспорт подойдет:</div>
                <p class="text-sm text-gray-200 leading-relaxed">
                  {{ recommendedTransport }}
                </p>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  :href="whatsappCbmUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                >
                  Узнать цену доставки в WhatsApp
                </a>
                <NuxtLink
                  to="/tools/delivery-calculator"
                  class="rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
                >
                  Рассчитать стоимость доставки →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Компактный блок: Частые вопросы -->
        <div class="mt-14 rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
          <h2 class="text-xl font-bold text-slate-900">
            Частые вопросы
          </h2>
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="(item, idx) in faqs" :key="idx">
              <h3 class="text-sm font-bold text-slate-900">{{ item.q }}</h3>
              <p class="mt-1.5 text-xs text-gray-600 leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>

        <!-- Перелинковка на маршруты и услуги -->
        <div class="mt-10 rounded-3xl border border-slate-200 bg-white p-8">
          <h2 class="text-lg font-bold text-slate-900 mb-4">
            Популярные маршруты и услуги доставки
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink to="/services/consolidated-cargo" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Сборные грузы от 1 паллеты →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка из Китая →
            </NuxtLink>
            <NuxtLink to="/services/customs" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Таможенное оформление и НДС 12% →
            </NuxtLink>
            <NuxtLink to="/routes/china-almaty" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка Китай → Алматы →
            </NuxtLink>
            <NuxtLink to="/routes/china-astana" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка Китай → Астана →
            </NuxtLink>
            <NuxtLink to="/routes/turkey-almaty" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка Турция → Алматы →
            </NuxtLink>
          </div>
        </div>

        <div class="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
          <NuxtLink
            v-for="t in relatedTools"
            :key="t.slug"
            :to="`/tools/${t.slug}`"
            class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-slate-400"
          >
            {{ t.shortTitle }} →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
