<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const route = useRoute()

const categories = [
  { id: 'machinery', name: 'Оборудование, станки и техника — пошлина ~0–5%', dutyRate: 3 },
  { id: 'autoparts', name: 'Автозапчасти, шины и комплектующие — пошлина ~5%', dutyRate: 5 },
  { id: 'materials', name: 'Стройматериалы, плитка, сантехника — пошлина ~7.5%', dutyRate: 7.5 },
  { id: 'furniture', name: 'Мебель, освещение и товары для дома — пошлина ~8%', dutyRate: 8 },
  { id: 'clothes', name: 'Одежда, обувь и текстиль — пошлина ~10%', dutyRate: 10 },
  { id: 'electronics', name: 'Электроника, компьютеры и гаджеты — пошлина ~0–3%', dutyRate: 0 }
]

const queryDuty = route.query.duty !== undefined ? Number(route.query.duty) : NaN
const queryName = typeof route.query.name === 'string' ? route.query.name : ''
const customDutyRate = ref<number | null>(!Number.isNaN(queryDuty) ? queryDuty : null)

const selectedCategoryId = ref('machinery')
const invoiceUsd = ref(10000)
const deliveryUsd = ref(1500)
const usdRate = ref(495)

const currentCategory = computed(() => categories.find((c) => c.id === selectedCategoryId.value) || categories[0]!)
const effectiveDutyRate = computed(() => (customDutyRate.value !== null ? customDutyRate.value : currentCategory.value.dutyRate))

const customsValueUsd = computed(() => (Number(invoiceUsd.value) || 0) + (Number(deliveryUsd.value) || 0))
const customsFeeUsd = 50
const dutyUsd = computed(() => Math.round(customsValueUsd.value * (effectiveDutyRate.value / 100)))
const vatUsd = computed(() => Math.round((customsValueUsd.value + customsFeeUsd + dutyUsd.value) * 0.12))
const totalUsd = computed(() => customsFeeUsd + dutyUsd.value + vatUsd.value)
const totalKzt = computed(() => Math.round(totalUsd.value * (Number(usdRate.value) || 495)))

const whatsappCustomsUrl = computed(() => {
  const label = queryName || currentCategory.value.name.split('—')[0]?.trim()
  const text = `Здравствуйте! Хочу узнать стоимость растаможки груза:
• Категория / товар: ${label}
• Ставка пошлины: ${effectiveDutyRate.value}%
• Стоимость товара по инвойсу: $${invoiceUsd.value}
• Подскажите точный расчет таможенных платежей и ваших услуг.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как рассчитывается НДС 12% при растаможке товара?',
    a: 'НДС 12% начисляется на общую сумму: стоимость товара по счёту + стоимость доставки до границы + таможенная пошлина + таможенный сбор.'
  },
  {
    q: 'От чего зависит ставка таможенной пошлины?',
    a: 'Ставка зависит от точного кода товара. На промышленное оборудование пошлина часто составляет 0%, на автозапчасти — 5%, на одежду и обувь — 7.5–12%.'
  },
  {
    q: 'Какие документы нужны для белой растаможки?',
    a: 'Потребуются внешнеторговый контракт, счёт на оплату, упаковочный лист, транспортная накладная и сертификаты на товар при необходимости.'
  }
]

const relatedTools = [
  ...TOOLS_DATA.filter(x => x.slug !== 'customs-calculator'),
  { slug: 'container-load-calculator', shortTitle: 'Загрузка контейнера и объёмный вес' },
  { slug: 'tnved-directory', shortTitle: 'Справочник ТН ВЭД' }
]

usePageSeo({
  title: 'Калькулятор растаможки товара в Казахстане 2026 | INTER WAY',
  description: 'Простой онлайн-калькулятор растаможки товаров в Казахстане: рассчитайте примерную сумму таможенной пошлины и НДС 12% при ввозе груза.',
  path: '/tools/customs-calculator',
  keywords: 'таможенный калькулятор казахстан 2026, калькулятор растаможки товаров казахстан, расчет таможенных платежей рк онлайн',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Калькулятор растаможки', path: '/tools/customs-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор растаможки товаров в Казахстане INTER WAY',
    category: 'FinanceApplication'
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
          <span class="text-blue-400 font-semibold">Калькулятор растаможки</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор растаможки товаров в Казахстане
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Выберите категорию вашего товара и укажите его стоимость, чтобы заранее оценить примерную сумму таможенной пошлины и НДС.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <div class="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Данные по товару
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Какой товар планируете ввозить
              </label>
              <select
                v-model="selectedCategoryId"
                @change="customDutyRate = null"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="c in categories" :key="c.id" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
              <div v-if="queryName" class="mt-2 rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-medium text-blue-800">
                Выбран товар из справочника: <strong>{{ queryName }}</strong>, пошлина {{ effectiveDutyRate }}%
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Стоимость товара ($)
                </label>
                <input
                  v-model.number="invoiceUsd"
                  type="number"
                  min="0"
                  step="100"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Стоимость доставки ($)
                </label>
                <input
                  v-model.number="deliveryUsd"
                  type="number"
                  min="0"
                  step="100"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Ставка пошлины (%)
                </label>
                <input
                  :value="effectiveDutyRate"
                  @input="customDutyRate = Number(($event.target as HTMLInputElement).value) || 0"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Курс USD / KZT (₸)
                </label>
                <input
                  v-model.number="usdRate"
                  type="number"
                  min="100"
                  step="1"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white">
              <h3 class="text-xl font-bold border-b border-white/10 pb-4">
                Предварительная оценка таможенных платежей
              </h3>

              <div class="mt-5 space-y-3.5 text-sm">
                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">Таможенный сбор за декларацию:</span>
                  <span class="font-bold text-white">~$50</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">Таможенная пошлина, ~{{ effectiveDutyRate }}%:</span>
                  <span class="font-bold text-white">~${{ dutyUsd.toLocaleString('ru-RU') }}</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">НДС 12%:</span>
                  <span class="font-bold text-white">~${{ vatUsd.toLocaleString('ru-RU') }}</span>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-white/5 p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-xs text-gray-400">Ориентировочно всего платежей:</div>
                  <div class="text-2xl font-bold text-white mt-1">
                    ~${{ totalUsd.toLocaleString('ru-RU') }} · {{ totalKzt.toLocaleString('ru-RU') }} ₸
                  </div>
                </div>
              </div>

              <p class="mt-4 text-xs text-gray-400 leading-relaxed">
                Точная ставка пошлины зависит от описания и характеристик товара. Отправьте список товаров нашему специалисту для бесплатной проверки.
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  :href="whatsappCustomsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                >
                  Узнать точный расчет в WhatsApp
                </a>
                <NuxtLink
                  to="/#contacts"
                  class="rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
                >
                  Оставить заявку
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
            Услуги таможенного оформления и популярные маршруты
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink to="/services/customs" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Таможенное оформление в Казахстане →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка из Китая с декларацией →
            </NuxtLink>
            <NuxtLink to="/services/consolidated-cargo" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Сборные грузы из Китая и Турции →
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
