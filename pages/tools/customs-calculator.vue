<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

interface TnvedPreset {
  id: string
  code: string
  name: string
  ettRate: number // Ставка Единого таможенного тарифа ЕАЭС (%)
  wtoRate: number // Пониженная ставка ВТО для Казахстана (%)
  inExemptionList: boolean // Входит ли в Перечень изъятий ВТО РК
  certRequired: string
}

const tnvedPresets: TnvedPreset[] = [
  { id: 'machinery', code: '8479 89 970 8', name: 'Промышленное оборудование, станки и производственные линии', ettRate: 0, wtoRate: 0, inExemptionList: false, certRequired: 'Декларация ТР ТС 010/2011 («О безопасности машин и оборудования»)' },
  { id: 'electronics', code: '8471 30 000 0', name: 'Ноутбуки, серверы, планшеты и компьютерная техника', ettRate: 0, wtoRate: 0, inExemptionList: false, certRequired: 'Нотификация КНБ РК (криптография) + Сертификат ТР ТС 004/020' },
  { id: 'autoparts', code: '8708 99 970 9', name: 'Автозапчасти, узлы, фильтры и элементы подвески', ettRate: 5, wtoRate: 3, inExemptionList: true, certRequired: 'Сертификат / Декларация ТР ТС 018/2011' },
  { id: 'clothes', code: '6109 10 000 0', name: 'Одежда трикотажная, текстиль, футболки и костюмы', ettRate: 10, wtoRate: 7.5, inExemptionList: true, certRequired: 'Декларация / Сертификат ТР ТС 017/2011 («Легкая промышленность»)' },
  { id: 'shoes', code: '6403 99 960 0', name: 'Обувь кожаная и текстильная (подлежит маркировке DataMatrix)', ettRate: 8, wtoRate: 5, inExemptionList: true, certRequired: 'ТР ТС 017/2011 + обязательная цифровая маркировка обуви в РК' },
  { id: 'furniture', code: '9403 60 100 0', name: 'Мебель для дома, офиса и коммерческих помещений', ettRate: 9, wtoRate: 6, inExemptionList: true, certRequired: 'Декларация соответствия ТР ТС 025/2012' },
  { id: 'ceramics', code: '6907 21 000 9', name: 'Керамогранит, кафельная плитка, сантехника и стройматериалы', ettRate: 7.5, wtoRate: 5, inExemptionList: true, certRequired: 'Санитарно-эпидемиологическое заключение / ГОСТ РК' },
  { id: 'cosmetics', code: '3304 99 000 0', name: 'Косметика, средства ухода и бытовая химия', ettRate: 6.5, wtoRate: 4.5, inExemptionList: true, certRequired: 'Декларация ТР ТС 009/2011 или СГР' },
  { id: 'tires', code: '4011 10 000 9', name: 'Шины и покрышки автомобильные и грузовые', ettRate: 10, wtoRate: 6.5, inExemptionList: true, certRequired: 'Сертификат ТР ТС 018/2011 + обязательная маркировка шин' }
]

const selectedPresetId = ref('autoparts')
const invoiceAmount = ref(15000)
const freightToBorder = ref(1800)
const usdToKzt = ref(495)
const tariffMode = ref<'ett' | 'wto'>('ett')
const hasCertSt1 = ref(false)
const vatRatePercent = ref(12)

const currentPreset = computed(() => tnvedPresets.find((p) => p.id === selectedPresetId.value) || tnvedPresets[0]!)

// Таможенная стоимость = Инвойс + Доставка до границы ЕАЭС
const customsValueUsd = computed(() => invoiceAmount.value + freightToBorder.value)
const customsValueKzt = computed(() => Math.round(customsValueUsd.value * usdToKzt.value))

// Ставка пошлины (%)
const effectiveDutyPercent = computed(() => {
  if (hasCertSt1.value) return 0
  return tariffMode.value === 'wto' ? currentPreset.value.wtoRate : currentPreset.value.ettRate
})

// Таможенный сбор за декларирование в РК (фиксированно ~25 000 ₸ / ~$50)
const customsFeeKzt = 25000
const customsFeeUsd = computed(() => Math.round(customsFeeKzt / usdToKzt.value))

// Пошлина
const dutyUsd = computed(() => Math.round(customsValueUsd.value * (effectiveDutyPercent.value / 100)))
const dutyKzt = computed(() => Math.round(dutyUsd.value * usdToKzt.value))

// НДС в РК считается от: (Таможенная стоимость + Таможенный сбор + Ввозная пошлина) * ставка НДС
const vatBaseUsd = computed(() => customsValueUsd.value + customsFeeUsd.value + dutyUsd.value)
const vatUsd = computed(() => Math.round(vatBaseUsd.value * (vatRatePercent.value / 100)))
const vatKzt = computed(() => Math.round(vatUsd.value * usdToKzt.value))

// Итого таможенные платежи
const totalPaymentsUsd = computed(() => customsFeeUsd.value + dutyUsd.value + vatUsd.value)
const totalPaymentsKzt = computed(() => customsFeeKzt + dutyKzt.value + vatKzt.value)

// Экономия при выборе ставки ВТО вместо ЕТТ
const wtoSavingsUsd = computed(() => {
  if (!currentPreset.value.inExemptionList || hasCertSt1.value) return 0
  const diffRate = (currentPreset.value.ettRate - currentPreset.value.wtoRate) / 100
  const dutyDiff = customsValueUsd.value * diffRate
  const vatOnDutyDiff = dutyDiff * (vatRatePercent.value / 100)
  return Math.round(dutyDiff + vatOnDutyDiff)
})

const whatsappCustomsUrl = computed(() => {
  const text = `Здравствуйте, INTER WAY! Нужна консультация таможенного брокера по расчету ДТ:
• Категория / ТН ВЭД: ${currentPreset.value.code} (${currentPreset.value.name})
• Стоимость инвойса: $${invoiceAmount.value} + фрахт до границы $${freightToBorder.value}
• Тариф: ${tariffMode.value === 'wto' ? 'Пониженная ставка ВТО' : 'Ставка ЕТТ ЕАЭС'} (пошлина ${effectiveDutyPercent.value}%)
• Расчет калькулятора: ~$${totalPaymentsUsd.value} (${totalPaymentsKzt.value.toLocaleString('ru-RU')} ₸)`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'В чем разница между ставкой ВТО и ЕТТ ЕАЭС при растаможке в Казахстане?',
    a: 'При вступлении в ВТО Казахстан согласовал пониженные ставки ввозных пошлин по тысячам кодов ТН ВЭД (так называемый Перечень изъятий). Если вы ввозите товар для продажи исключительно внутри Казахстана, можно растаможить его по пониженной ставке ВТО (признак «0» в ЭСФ). Если же товар планируется вывозить в Россию или другие страны ЕАЭС, оформлять его необходимо только по полной ставке ЕТТ ЕАЭС (признак «1»).'
  },
  {
    q: 'Как правильно считается НДС при импорте товаров в Казахстан?',
    a: 'По Таможенному и Налоговому кодексу РК база для начисления НДС включает в себя: Таможенную стоимость товара (инвойс + расходы на доставку до границы ЕАЭС) + сумму таможенного сбора за подачу ДТ + сумму начисленной ввозной пошлины.'
  },
  {
    q: 'Когда ввозная пошлина составляет 0%?',
    a: 'Нулевая пошлина действует на большинство видов промышленного оборудования и станков, ноутбуки и серверы, а также на товары из стран СНГ (например, Узбекистан, Россия) или Вьетнама/Сербии при предоставлении оригинала сертификата происхождения (СТ-1, EAV).'
  }
]

usePageSeo({
  title: 'Таможенный калькулятор Казахстан 2026 онлайн — расчет растаможки, пошлины, НДС и ВТО | INTER WAY',
  description: 'Рассчитайте таможенные платежи при ввозе товаров в Казахстан онлайн: таможенный сбор, пошлина по коду ТН ВЭД (ставка ВТО или ЕТТ ЕАЭС) и НДС на импорт. Проверка Перечня изъятий ВТО РК.',
  path: '/tools/customs-calculator',
  keywords: 'таможенный калькулятор казахстан 2026, калькулятор растаможки товаров казахстан, расчет таможенных платежей рк онлайн, перечень изъятий вто казахстан проверка, калькулятор ндс при импорте казахстан',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и ВЭД-инструменты', path: '/tools' },
    { name: 'Таможенный калькулятор РК', path: '/tools/customs-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Таможенный калькулятор РК и проверка Перечня изъятий ВТО INTER WAY',
    category: 'FinanceApplication'
  }
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-[#0B1120] py-14 md:py-20 text-white border-b border-white/10">
      <div class="container mx-auto px-6 md:px-12">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="hover:text-white transition">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/tools" class="hover:text-white transition">Калькуляторы</NuxtLink>
          <span>/</span>
          <span class="text-blue-400 font-semibold">Таможенный калькулятор РК</span>
        </nav>

        <div class="max-w-4xl">
          <span class="mb-3 inline-block rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
            Формула ИС «АСТАНА-1» • Сравнение ставок ВТО и ЕТТ ЕАЭС
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Таможенный калькулятор Казахстана (2026) и проверка Перечня изъятий ВТО
          </h1>
          <p class="mt-4 text-base md:text-lg text-gray-300 max-w-3xl">
            Рассчитайте таможенный сбор, ввозную пошлину и НДС при импорте коммерческой партии в РК, сравните выгоду оформления по ставке ВТО и проверьте требования по сертификации.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-10 lg:grid-cols-12 items-start">
          <!-- Левая колонка: Ввод данных -->
          <div class="lg:col-span-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              1. Выберите товарную группу и параметры инвойса
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Товарная категория и ориентир кода ТН ВЭД ЕАЭС
              </label>
              <select
                v-model="selectedPresetId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="p in tnvedPresets" :key="p.id" :value="p.id">
                  [{{ p.code }}] {{ p.name }}
                </option>
              </select>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Сумма инвойса (USD $)
                </label>
                <input
                  v-model.number="invoiceAmount"
                  type="number"
                  min="100"
                  step="500"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Доставка до границы ЕАЭС ($)
                </label>
                <input
                  v-model.number="freightToBorder"
                  type="number"
                  min="0"
                  step="100"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Курс USD / KZT (НБ РК)
                </label>
                <input
                  v-model.number="usdToKzt"
                  type="number"
                  min="400"
                  max="700"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Ставка НДС на импорт (%)
                </label>
                <select
                  v-model.number="vatRatePercent"
                  class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  <option :value="12">12% (Базовая ставка НДС РК)</option>
                  <option :value="16">16% (Проектируемая ставка НК РК)</option>
                  <option :value="0">0% (Освобождение / методом зачета)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Режим таможенного тарифа в Казахстане
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="tariffMode = 'ett'"
                  class="rounded-xl p-3.5 text-left border transition"
                  :class="tariffMode === 'ett' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  <div class="text-xs font-bold">Ставка ЕТТ ЕАЭС ({{ currentPreset.ettRate }}%)</div>
                  <div class="text-[11px] opacity-80 mt-0.5">С правом вывоза в РФ и страны ЕАЭС</div>
                </button>
                <button
                  type="button"
                  @click="tariffMode = 'wto'"
                  class="rounded-xl p-3.5 text-left border transition"
                  :class="tariffMode === 'wto' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  <div class="text-xs font-bold">Пониженная ВТО ({{ currentPreset.wtoRate }}%)</div>
                  <div class="text-[11px] opacity-80 mt-0.5">Только для реализации внутри РК</div>
                </button>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="hasCertSt1"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span class="text-sm font-semibold text-slate-800">
                  Есть оригинал сертификата СТ-1 (СНГ) или EAV (пошлина 0%)
                </span>
              </label>
            </div>
          </div>

          <!-- Правая колонка: Расчет ДТ и индикатор Перечня изъятий ВТО -->
          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white shadow-xl">
              <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-blue-400">
                    2. Сводка таможенной декларации (ДТ)
                  </span>
                  <h3 class="text-xl font-bold mt-1">
                    Код ТН ВЭД: {{ currentPreset.code }}
                  </h3>
                </div>
                <span
                  class="rounded-full px-3.5 py-1 text-xs font-bold"
                  :class="currentPreset.inExemptionList ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'"
                >
                  {{ currentPreset.inExemptionList ? 'Входит в Перечень изъятий ВТО РК' : 'Вне Перечня изъятий (свободный оборот)' }}
                </span>
              </div>

              <!-- Детализация платежей -->
              <div class="mt-6 space-y-3.5 text-sm">
                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">Таможенная стоимость (Инвойс + Фрахт):</span>
                  <span class="font-bold text-white">${{ customsValueUsd.toLocaleString('ru-RU') }} ({{ customsValueKzt.toLocaleString('ru-RU') }} ₸)</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">Таможенный сбор за подачу ДТ:</span>
                  <span class="font-semibold text-white">${{ customsFeeUsd }} ({{ customsFeeKzt.toLocaleString('ru-RU') }} ₸)</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">Ввозная таможенная пошлина ({{ effectiveDutyPercent }}%):</span>
                  <span class="font-bold text-blue-300">${{ dutyUsd.toLocaleString('ru-RU') }} ({{ dutyKzt.toLocaleString('ru-RU') }} ₸)</span>
                </div>

                <div class="flex items-center justify-between py-2 border-b border-white/10">
                  <span class="text-gray-400">НДС на импорт ({{ vatRatePercent }}% на сумму ТС + Сбор + Пошлина):</span>
                  <span class="font-bold text-white">${{ vatUsd.toLocaleString('ru-RU') }} ({{ vatKzt.toLocaleString('ru-RU') }} ₸)</span>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-white/5 p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-xs uppercase tracking-wider text-gray-400">Итого к уплате в бюджет РК:</div>
                  <div class="text-2xl md:text-3xl font-bold text-emerald-400 mt-1">
                    {{ totalPaymentsKzt.toLocaleString('ru-RU') }} ₸
                  </div>
                </div>
                <div class="sm:text-right">
                  <div class="text-xs text-gray-400">В валюте контракта:</div>
                  <div class="text-xl font-bold text-white">~${{ totalPaymentsUsd.toLocaleString('ru-RU') }}</div>
                </div>
              </div>

              <div v-if="wtoSavingsUsd > 0" class="mt-4 rounded-xl bg-blue-600/20 border border-blue-500/30 p-4 text-xs text-blue-200 leading-relaxed">
                <strong>Совет декларанта INTER WAY:</strong> Если товар остается внутри Казахстана, оформление по пониженной ставке ВТО ({{ currentPreset.wtoRate }}% вместо {{ currentPreset.ettRate }}%) сэкономит вам <strong>${{ wtoSavingsUsd.toLocaleString('ru-RU') }} ({{ (wtoSavingsUsd * usdToKzt).toLocaleString('ru-RU') }} ₸)</strong> на этой партии.
              </div>
            </div>

            <!-- Справка по сертификации и нетарифному контролю -->
            <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200 space-y-4">
              <h4 class="text-base font-bold text-slate-900">
                Требования по сертификации и ЭСФ для кода {{ currentPreset.code }}
              </h4>
              <p class="text-sm text-gray-600">
                <strong>Разрешительные документы:</strong> {{ currentPreset.certRequired }}
              </p>
              <p class="text-sm text-gray-600">
                <strong>Статус Перечня изъятий ВТО:</strong>
                <span v-if="currentPreset.inExemptionList">
                  Код входит в Перечень изъятий. При продаже в РК обязательно выписывается ЭСФ. Для вывоза в РФ необходимо оформлять ДТ по ставке ЕТТ ({{ currentPreset.ettRate }}%).
                </span>
                <span v-else>
                  Ставка ЕТТ и ВТО совпадает ({{ currentPreset.ettRate }}%), товар свободно перемещается по всей территории ЕАЭС.
                </span>
              </p>

              <div class="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  :href="whatsappCustomsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700 transition"
                >
                  Проверить мой инвойс у брокера в WhatsApp
                </a>
                <NuxtLink
                  to="/services/customs"
                  class="rounded-full border border-slate-300 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
                >
                  Об услуге растаможки (от 45 000 ₸)
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-12 border-t border-slate-200">
          <h3 class="text-lg font-bold text-slate-900 mb-4">
            Другие бесплатные ВЭД-калькуляторы INTER WAY:
          </h3>
          <div class="grid gap-4 sm:grid-cols-3">
            <NuxtLink
              v-for="t in TOOLS_DATA.filter(x => x.slug !== 'customs-calculator')"
              :key="t.slug"
              :to="`/tools/${t.slug}`"
              class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:ring-blue-500 transition flex items-center justify-between"
            >
              <div>
                <div class="text-xs font-bold text-blue-600">{{ t.badge }}</div>
                <div class="text-sm font-bold text-slate-900 mt-1">{{ t.shortTitle }}</div>
              </div>
              <span class="text-slate-400">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-8 text-center">
          Частые вопросы по растаможке товаров в Казахстане
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
          >
            <h3 class="text-base font-bold text-slate-900">{{ faq.q }}</h3>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
