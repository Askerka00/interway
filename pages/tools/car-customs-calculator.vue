<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const MRP_2026 = 4325

const engineTypes = [
  { id: 'petrol', name: 'Бензин или гибрид' },
  { id: 'diesel', name: 'Дизель' },
  { id: 'ev', name: 'Электромобиль' }
]

const volumes = [
  { id: 'v1000', name: 'До 1 000 см³', utilMrp: 75 },
  { id: 'v2000', name: 'От 1 001 до 2 000 см³', utilMrp: 175 },
  { id: 'v3000', name: 'От 2 001 до 3 000 см³', utilMrp: 250 },
  { id: 'v3001', name: 'Свыше 3 000 см³', utilMrp: 575 }
]

const ages = [
  { id: 'under2', name: 'До 2 лет', dutyRate: 15, regMrp: 0.25 },
  { id: '2to3', name: 'От 2 до 3 лет', dutyRate: 15, regMrp: 50 },
  { id: 'over3', name: 'Старше 3 лет', dutyRate: 20, regMrp: 500 }
]

const engineType = ref('petrol')
const volumeId = ref('v2000')
const ageId = ref('under2')
const carPriceUsd = ref(18000)
const deliveryUsd = ref(1800)
const usdRate = ref(495)

const currentVolume = computed(() => volumes.find((v) => v.id === volumeId.value) || volumes[1]!)
const currentAge = computed(() => ages.find((a) => a.id === ageId.value) || ages[0]!)

const customsBaseUsd = computed(() => (Number(carPriceUsd.value) || 0) + (Number(deliveryUsd.value) || 0))
const rate = computed(() => Number(usdRate.value) || 495)

const dutyRatePercent = computed(() => (engineType.value === 'ev' ? 0 : currentAge.value.dutyRate))
const dutyUsd = computed(() => Math.round(customsBaseUsd.value * (dutyRatePercent.value / 100)))
const customsFeeKzt = 6 * MRP_2026
const vatUsd = computed(() => Math.round((customsBaseUsd.value + dutyUsd.value) * 0.12))

const utilKzt = computed(() => (engineType.value === 'ev' ? 0 : Math.round(currentVolume.value.utilMrp * MRP_2026)))
const regKzt = computed(() => Math.round(currentAge.value.regMrp * MRP_2026))

const totalKzt = computed(() => {
  const dutyAndVatKzt = (dutyUsd.value + vatUsd.value) * rate.value
  return Math.round(dutyAndVatKzt + customsFeeKzt + utilKzt.value + regKzt.value)
})

const totalUsd = computed(() => Math.round(totalKzt.value / rate.value))

const formatKzt = (val: number) => new Intl.NumberFormat('ru-RU').format(Math.round(val)) + ' ₸'

const whatsappCarUrl = computed(() => {
  const engineLabel = engineTypes.find((e) => e.id === engineType.value)?.name || 'Авто'
  const volumeLabel = engineType.value === 'ev' ? 'Электро' : currentVolume.value.name
  const text = `Здравствуйте! Хочу рассчитать доставку и растаможку авто в Казахстан:
• Двигатель: ${engineLabel}, ${volumeLabel}
• Возраст: ${currentAge.value.name}
• Цена авто: $${carPriceUsd.value}
• Подскажите точную сумму платежей и стоимость доставки.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как считается растаможка автомобиля в Казахстане в 2026 году?',
    a: 'Итоговая сумма складывается из таможенной пошлины, НДС 12%, таможенного сбора, утилизационного сбора и первичной регистрации. Расчёт зависит от стоимости авто, возраста и объёма двигателя.'
  },
  {
    q: 'Есть ли льготы на растаможку электромобилей в Казахстане?',
    a: 'Для электромобилей действует нулевой утилизационный сбор, а при наличии квоты на ввоз таможенная пошлина составляет 0%. Оплачивается только сбор за оформление и регистрация.'
  },
  {
    q: 'Как выгодно привезти автомобиль из Китая, Кореи или ОАЭ?',
    a: 'Мы организуем доставку авто на автовозах или в контейнерах до Алматы и Астаны под ключ: от проверки на площадке до таможенного оформления и постановки на учёт.'
  }
]

const relatedTools = TOOLS_DATA.filter((x) => x.slug !== 'car-customs-calculator')

usePageSeo({
  title: 'Калькулятор растаможки авто в Казахстане 2026 | INTER WAY',
  description: 'Удобный калькулятор растаможки авто в Казахстане на 2026 год: быстрый расчёт пошлины, НДС 12%, утильсбора и первичной регистрации в тенге и долларах.',
  path: '/tools/car-customs-calculator',
  keywords: 'калькулятор растаможки авто в казахстане 2026, растаможка авто казахстан калькулятор, сколько стоит растаможка авто в рк, утильсбор казахстан 2026',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Калькулятор растаможки авто', path: '/tools/car-customs-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор растаможки авто в Казахстане INTER WAY',
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
          <span class="text-blue-400 font-semibold">Растаможка авто 2026</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор растаможки авто в Казахстане 2026
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Укажите цену, возраст и объём двигателя автомобиля, чтобы сразу увидеть примерные расходы на таможню, утильсбор и регистрацию.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <div class="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Параметры автомобиля
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Тип двигателя
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="e in engineTypes"
                  :key="e.id"
                  type="button"
                  @click="engineType = e.id"
                  class="rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors"
                  :class="engineType === e.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700 hover:border-slate-300'"
                >
                  {{ e.name }}
                </button>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div v-if="engineType !== 'ev'">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Объём двигателя
                </label>
                <select
                  v-model="volumeId"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  <option v-for="v in volumes" :key="v.id" :value="v.id">
                    {{ v.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Возраст автомобиля
                </label>
                <select
                  v-model="ageId"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  <option v-for="a in ages" :key="a.id" :value="a.id">
                    {{ a.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Цена автомобиля, $
                </label>
                <input
                  v-model.number="carPriceUsd"
                  type="number"
                  min="1000"
                  step="500"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Доставка до границы, $
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

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Курс доллара, ₸
              </label>
              <input
                v-model.number="usdRate"
                type="number"
                min="300"
                step="5"
                data-clarity-unmask="true"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white">
              <h3 class="text-xl font-bold border-b border-white/10 pb-4">
                Ориентировочные платежи в РК 2026
              </h3>

              <div class="mt-6 space-y-4 text-sm">
                <div class="flex justify-between text-gray-300">
                  <span>Таможенная стоимость авто с доставкой</span>
                  <span class="font-bold text-white">${{ customsBaseUsd.toLocaleString('ru-RU') }}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Таможенная пошлина, {{ dutyRatePercent }}%</span>
                  <span class="font-bold text-white">${{ dutyUsd.toLocaleString('ru-RU') }}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>НДС 12%</span>
                  <span class="font-bold text-white">${{ vatUsd.toLocaleString('ru-RU') }}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Утилизационный сбор</span>
                  <span class="font-bold text-white">{{ formatKzt(utilKzt) }}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Первичная регистрация и сбор</span>
                  <span class="font-bold text-white">{{ formatKzt(regKzt + customsFeeKzt) }}</span>
                </div>

                <div class="border-t border-white/10 pt-4 flex items-baseline justify-between">
                  <span class="text-base font-bold text-white">Итого к уплате</span>
                  <div class="text-right">
                    <div class="text-2xl font-extrabold text-blue-400">~ {{ formatKzt(totalKzt) }}</div>
                    <div class="text-xs text-gray-400">или около ${{ totalUsd.toLocaleString('ru-RU') }}</div>
                  </div>
                </div>
              </div>

              <p class="mt-6 text-xs text-gray-400 leading-relaxed">
                Расчёт ориентировочный по МРП 4 325 ₸ на 2026 год. Для точного расчёта под конкретный VIN и год выпуска напишите нашему менеджеру.
              </p>

              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  :href="whatsappCarUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center rounded-xl bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
                >
                  Уточнить в WhatsApp
                </a>
                <NuxtLink
                  to="/#contacts"
                  class="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Оставить заявку
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 rounded-3xl border border-slate-200 bg-white p-8">
          <h2 class="text-xl font-bold text-slate-900 mb-6">
            Частые вопросы по растаможке авто
          </h2>
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="(item, idx) in faqs" :key="idx" class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900">{{ item.q }}</h3>
              <p class="text-xs text-gray-600 leading-relaxed">{{ item.a }}</p>
            </div>
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
