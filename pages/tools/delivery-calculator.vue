<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const origins = [
  { id: 'cn-south', label: 'Китай (Гуанчжоу / Шэньчжэнь / Фошань)', country: 'Китай', distance: 4650, autoPerKg: 1.45, railPerKg: 0.72, airPerKg: 4.6, fcl40: 2950, ftl20: 4600, autoDays: '9–13 дней', railDays: '14–19 дней', airDays: '2–5 дней', border: 'Нур Жолы (Хоргос) / Достык' },
  { id: 'cn-east', label: 'Китай (Иу / Шанхай / Нинбо)', country: 'Китай', distance: 4400, autoPerKg: 1.35, railPerKg: 0.65, airPerKg: 4.5, fcl40: 2700, ftl20: 4400, autoDays: '8–12 дней', railDays: '12–16 дней', airDays: '2–4 дня', border: 'Нур Жолы (Хоргос) / Алтынколь' },
  { id: 'cn-west', label: 'Китай (Урумчи / Хоргос склад)', country: 'Китай', distance: 980, autoPerKg: 0.85, railPerKg: 0.50, airPerKg: 3.9, fcl40: 1650, ftl20: 2200, autoDays: '3–5 дней', railDays: '6–9 дней', airDays: '1–2 дня', border: 'МАПП Нур Жолы' },
  { id: 'tr-ist', label: 'Турция (Стамбул / Мерсин / Бурса)', country: 'Турция', distance: 4600, autoPerKg: 2.10, railPerKg: 1.35, airPerKg: 3.9, fcl40: 3600, ftl20: 5600, autoDays: '12–16 дней', railDays: '18–24 дня (ТМТМ)', airDays: '1–3 дня', border: 'Сарпи / Актау (ТМТМ)' },
  { id: 'ru-msk', label: 'Россия (Москва / Екатеринбург / Новосибирск)', country: 'Россия (ЕАЭС)', distance: 3750, autoPerKg: 0.42, railPerKg: 0.28, airPerKg: 2.4, fcl40: 1750, ftl20: 2100, autoDays: '4–7 дней', railDays: '7–12 дней', airDays: '1–2 дня', border: 'ЕАЭС (оформление СНТ без пошлин)' },
  { id: 'eu-de', label: 'Европа (Германия / Италия / Польша)', country: 'Европа (ЕС)', distance: 5700, autoPerKg: 2.65, railPerKg: 1.75, airPerKg: 5.4, fcl40: 4700, ftl20: 5900, autoDays: '14–21 день', railDays: '20–28 дней', airDays: '2–5 дней', border: 'Козловичи / ТМТМ' },
  { id: 'ae-dxb', label: 'ОАЭ (Дубай / Jebel Ali / Шарджа)', country: 'ОАЭ', distance: 3400, autoPerKg: 1.95, railPerKg: 1.40, airPerKg: 3.8, fcl40: 2850, ftl20: 4900, autoDays: '12–17 дней (через Иран)', railDays: '15–20 дней', airDays: '1–3 дня (прямой рейс)', border: 'Бендер-Аббас / Сарахс / Аэропорт ALA' }
]

const destinations = [
  { id: 'ala', label: 'Алматы', coef: 1.0 },
  { id: 'nqz', label: 'Астана', coef: 1.08 },
  { id: 'cit', label: 'Шымкент', coef: 1.05 },
  { id: 'kgf', label: 'Караганда', coef: 1.06 },
  { id: 'guw', label: 'Атырау / Актау', coef: 1.15 }
]

const cargoCategories = [
  { id: 'general', label: 'Оборудование, станки и запчасти', dutyRate: 0.05 },
  { id: 'tnp', label: 'ТНП, хозтовары, мебель, стройматериалы', dutyRate: 0.08 },
  { id: 'textile', label: 'Одежда, обувь, ткани и текстиль', dutyRate: 0.10 },
  { id: 'electronics', label: 'Электроника, бытовая и компьютерная техника', dutyRate: 0.03 },
  { id: 'chem', label: 'Неопасная химия, сырье, полимеры', dutyRate: 0.05 }
]

const selectedOriginId = ref('cn-south')
const selectedDestId = ref('ala')
const selectedCategoryId = ref('general')

const weightKg = ref(1200)
const volumeCbm = ref(6.5)
const invoiceUsd = ref(8500)
const includeCustoms = ref(true)

const currentOrigin = computed(() => origins.find((o) => o.id === selectedOriginId.value) || origins[0]!)
const currentDest = computed(() => destinations.find((d) => d.id === selectedDestId.value) || destinations[0]!)
const currentCategory = computed(() => cargoCategories.find((c) => c.id === selectedCategoryId.value) || cargoCategories[0]!)

const density = computed(() => {
  if (!volumeCbm.value || volumeCbm.value <= 0) return 0
  return Math.round(weightKg.value / volumeCbm.value)
})

// Расчетный (оплачиваемый) вес: для авто/жд стандарт 1 м3 = 250 кг, для авиа 1 м3 = 167 кг
const chargeableWeightRoad = computed(() => Math.max(weightKg.value, Math.round(volumeCbm.value * 250)))
const chargeableWeightAir = computed(() => Math.max(weightKg.value, Math.round(volumeCbm.value * 167)))

const roadCost = computed(() => {
  const ltl = Math.round(chargeableWeightRoad.value * currentOrigin.value.autoPerKg * currentDest.value.coef)
  const ftl = Math.round(currentOrigin.value.ftl20 * currentDest.value.coef)
  return Math.max(120, Math.min(ltl, ftl))
})

const railCost = computed(() => {
  const lcl = Math.round(chargeableWeightRoad.value * currentOrigin.value.railPerKg * currentDest.value.coef)
  const fcl = Math.round(currentOrigin.value.fcl40 * currentDest.value.coef)
  return Math.max(150, Math.min(lcl, fcl))
})

const airCost = computed(() => {
  return Math.max(180, Math.round(chargeableWeightAir.value * currentOrigin.value.airPerKg * currentDest.value.coef))
})

const customsEstimateUsd = computed(() => {
  if (!includeCustoms.value) return 0
  // При импорте из РФ (ЕАЭС) пошлины нет, только косвенный НДС 12%
  if (selectedOriginId.value === 'ru-msk') {
    return Math.round(invoiceUsd.value * 0.12)
  }
  const customsFeeUsd = 45 // сбор за декларирование
  const duty = invoiceUsd.value * currentCategory.value.dutyRate
  const vat = (invoiceUsd.value + duty + customsFeeUsd) * 0.12
  return Math.round(customsFeeUsd + duty + vat)
})

const whatsappShareUrl = computed(() => {
  const text = `Здравствуйте, INTER WAY! Рассчитал доставку в калькуляторе на сайте:
• Маршрут: ${currentOrigin.value.label} → ${currentDest.value.label}
• Груз: ${currentCategory.value.label}
• Вес: ${weightKg.value} кг | Объем: ${volumeCbm.value} м³ (плотность ${density.value} кг/м³)
• Оценка калькулятора: Авто ~$${roadCost.value} / ЖД ~$${railCost.value}
Нужен точный просчет ставки и сроков.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как калькулятор считает объемный (оплачиваемый) вес груза?',
    a: 'В международной логистике действует правило соотношения веса и кубатуры: для автомобильных и сборных ЖД перевозок 1 м³ приравнивается к 250–300 кг, а для авиаперевозок — 1 м³ = 167 кг. Если ваш груз легкий, но объемный, расчет идет по кубометрам.'
  },
  {
    q: 'Когда выгоднее заказать целый контейнер (FCL) или еврофуру (FTL) вместо сборной доставки?',
    a: 'Как только ваш груз превышает 12–14 тонн или занимает более 25–30 м³, стоимость отправки в составе сборного груза приближается к цене выделенного 20-футового контейнера или отдельной машины. Калькулятор автоматически ограничивает верхнюю планку ставкой целой фуры/контейнера.'
  },
  {
    q: 'Входит ли в расчет оформление экспортной декларации и прохождение границы?',
    a: 'Да, базовые ставки фрахта включают консолидацию на складе отправления, транзитное прохождение погранпереходов (Нур Жолы, Достык, ТМТМ) и доставку до СВХ в городе назначения.'
  }
]

usePageSeo({
  title: 'Калькулятор доставки грузов из Китая, Турции и РФ в Казахстан онлайн | INTER WAY',
  description: 'Бесплатный онлайн-калькулятор стоимости доставки грузов из Китая (Гуанчжоу, Иу, Шанхай, Урумчи), Турции (Стамбул), России и Европы в Алматы и Астану. Мгновенный расчет Авто, ЖД и Авиа без ввода телефона.',
  path: '/tools/delivery-calculator',
  keywords: 'калькулятор доставки из китая в казахстан, рассчитать стоимость доставки из китая, калькулятор карго казахстан китай, калькулятор доставки из турции в казахстан, калькулятор грузоперевозок по казахстану',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и ВЭД-инструменты', path: '/tools' },
    { name: 'Калькулятор доставки грузов', path: '/tools/delivery-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор стоимости доставки и растаможки грузов в Казахстан INTER WAY',
    category: 'BusinessApplication'
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
          <span class="text-blue-400 font-semibold">Калькулятор доставки</span>
        </nav>

        <div class="max-w-4xl">
          <span class="mb-3 inline-block rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
            Мгновенный расчет на экране • Без регистрации и СМС
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор доставки грузов в Казахстан (Авто, Ж/Д, Авиа)
          </h1>
          <p class="mt-4 text-base md:text-lg text-gray-300 max-w-3xl">
            Укажите страну отправления, вес и объем партии — калькулятор автоматически рассчитает плотность груза, оплачиваемый вес и сравнит стоимость доставки разными видами транспорта.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-10 lg:grid-cols-12 items-start">
          <!-- Левая панель ввода параметров -->
          <div class="lg:col-span-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              1. Параметры вашего груза и маршрута
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Откуда забираем груз
              </label>
              <select
                v-model="selectedOriginId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <option v-for="o in origins" :key="o.id" :value="o.id">
                  {{ o.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Город доставки в Казахстане
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="d in destinations"
                  :key="d.id"
                  type="button"
                  @click="selectedDestId = d.id"
                  class="rounded-xl px-3 py-2.5 text-xs font-bold transition border"
                  :class="selectedDestId === d.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400'"
                >
                  {{ d.label }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Вес брутто (кг)
                </label>
                <input
                  v-model.number="weightKg"
                  type="number"
                  min="10"
                  max="100000"
                  step="50"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Объем партии (м³)
                </label>
                <input
                  v-model.number="volumeCbm"
                  type="number"
                  min="0.1"
                  max="500"
                  step="0.5"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-200 flex items-center justify-between text-xs">
              <span class="text-slate-600">Не знаете точный объем в м³?</span>
              <NuxtLink to="/tools/cbm-pallet-calculator" class="font-bold text-blue-600 hover:underline">
                Посчитать по коробкам →
              </NuxtLink>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Категория товара
              </label>
              <select
                v-model="selectedCategoryId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="c in cargoCategories" :key="c.id" :value="c.id">
                  {{ c.label }}
                </option>
              </select>
            </div>

            <div class="pt-2 border-t border-slate-100">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="includeCustoms"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span class="text-sm font-semibold text-slate-800">
                  Добавить оценку таможенных платежей в РК
                </span>
              </label>

              <div v-if="includeCustoms" class="mt-4">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Стоимость партии по инвойсу (USD $)
                </label>
                <input
                  v-model.number="invoiceUsd"
                  type="number"
                  min="100"
                  step="500"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Правая панель результатов -->
          <div class="lg:col-span-7 space-y-6">
            <!-- Сводка физических показателей -->
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white shadow-xl">
              <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-blue-400">
                    2. Результат инженерного расчета
                  </div>
                  <h3 class="text-xl font-bold mt-1">
                    {{ currentOrigin.country }} → {{ currentDest.label }} (~{{ currentOrigin.distance }} км)
                  </h3>
                </div>
                <span class="rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-gray-300">
                  Переход: {{ currentOrigin.border }}
                </span>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Плотность груза</div>
                  <div class="mt-1 text-xl font-bold text-white">{{ density }} кг/м³</div>
                  <div class="mt-1 text-[11px] text-blue-300">
                    {{ density > 250 ? 'Тяжелый (расчет по весу)' : 'Объемный (учет кубатуры)' }}
                  </div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Расчетный вес (Авто/ЖД)</div>
                  <div class="mt-1 text-xl font-bold text-white">{{ chargeableWeightRoad.toLocaleString('ru-RU') }} кг</div>
                  <div class="mt-1 text-[11px] text-gray-400">при норме 250 кг/м³</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Таможня и НДС (оценка)</div>
                  <div class="mt-1 text-xl font-bold text-emerald-400">
                    {{ includeCustoms ? `~$${customsEstimateUsd.toLocaleString('ru-RU')}` : 'Не выбрано' }}
                  </div>
                  <NuxtLink to="/tools/customs-calculator" class="mt-1 block text-[11px] text-blue-400 hover:underline">
                    Детальный расчет ДТ →
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Сравнение 3 видов транспорта -->
            <div class="grid gap-4">
              <!-- Вариант 1: Авто -->
              <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-2 ring-blue-600 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2.5 mb-2">
                    <span class="rounded-full bg-blue-600 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      Оптимально по цене/скорости
                    </span>
                    <span class="text-xs font-semibold text-slate-500">
                      Срок: {{ currentOrigin.autoDays }}
                    </span>
                  </div>
                  <h4 class="text-lg font-bold text-slate-900">
                    Автодоставка (Еврофура / Сборный LTL)
                  </h4>
                  <p class="mt-1 text-xs text-gray-500">
                    Доставка от склада отправителя до СВХ {{ currentDest.label }} без лишних перегрузов.
                  </p>
                </div>
                <div class="sm:text-right shrink-0">
                  <div class="text-xs text-gray-400 uppercase">Ориентир фрахта</div>
                  <div class="text-2xl md:text-3xl font-bold text-slate-900">
                    ${{ roadCost.toLocaleString('ru-RU') }}
                  </div>
                  <div v-if="includeCustoms" class="text-xs text-emerald-700 font-semibold mt-1">
                    + ~${{ customsEstimateUsd.toLocaleString('ru-RU') }} таможня
                  </div>
                </div>
              </div>

              <!-- Вариант 2: ЖД -->
              <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2.5 mb-2">
                    <span class="rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Экономичный тариф
                    </span>
                    <span class="text-xs font-semibold text-slate-500">
                      Срок: {{ currentOrigin.railDays }}
                    </span>
                  </div>
                  <h4 class="text-lg font-bold text-slate-900">
                    Железнодорожная доставка (Контейнер / Вагон)
                  </h4>
                  <p class="mt-1 text-xs text-gray-500">
                    Ускоренный контейнерный поезд или сборный вагон через {{ currentOrigin.border }}.
                  </p>
                </div>
                <div class="sm:text-right shrink-0">
                  <div class="text-xs text-gray-400 uppercase">Ориентир фрахта</div>
                  <div class="text-2xl md:text-3xl font-bold text-slate-900">
                    ${{ railCost.toLocaleString('ru-RU') }}
                  </div>
                  <div v-if="includeCustoms" class="text-xs text-emerald-700 font-semibold mt-1">
                    + ~${{ customsEstimateUsd.toLocaleString('ru-RU') }} таможня
                  </div>
                </div>
              </div>

              <!-- Вариант 3: Авиа -->
              <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2.5 mb-2">
                    <span class="rounded-full bg-amber-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Экспресс-доставка
                    </span>
                    <span class="text-xs font-semibold text-slate-500">
                      Срок: {{ currentOrigin.airDays }}
                    </span>
                  </div>
                  <h4 class="text-lg font-bold text-slate-900">
                    Авиафрахт в аэропорт {{ currentDest.label }}
                  </h4>
                  <p class="mt-1 text-xs text-gray-500">
                    Для срочных партий, электроники, запчастей и образцов (расчетный вес {{ chargeableWeightAir }} кг).
                  </p>
                </div>
                <div class="sm:text-right shrink-0">
                  <div class="text-xs text-gray-400 uppercase">Ориентир фрахта</div>
                  <div class="text-2xl md:text-3xl font-bold text-slate-900">
                    ${{ airCost.toLocaleString('ru-RU') }}
                  </div>
                  <div v-if="includeCustoms" class="text-xs text-emerald-700 font-semibold mt-1">
                    + ~${{ customsEstimateUsd.toLocaleString('ru-RU') }} таможня
                  </div>
                </div>
              </div>
            </div>

            <!-- Блок фиксации расчета -->
            <div class="rounded-3xl bg-blue-600 p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 class="text-lg font-bold">
                  Нужна точная ставка до доллара под ваш упаковочный лист?
                </h4>
                <p class="mt-1 text-sm text-blue-100">
                  Отправьте параметры этого расчета логисту INTER WAY в один клик — проверим габариты и пришлем КП за 15 минут.
                </p>
              </div>
              <div class="flex flex-wrap gap-3 shrink-0">
                <a
                  :href="whatsappShareUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-blue-700 hover:bg-blue-50 transition shadow-lg"
                >
                  Отправить расчет в WhatsApp
                </a>
                <NuxtLink
                  to="#contacts"
                  class="rounded-full border border-white/40 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition"
                >
                  Оставить заявку
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Перелинковка с остальными калькуляторами -->
        <div class="mt-16 pt-12 border-t border-slate-200">
          <h3 class="text-lg font-bold text-slate-900 mb-4">
            Другие бесплатные ВЭД-калькуляторы INTER WAY:
          </h3>
          <div class="grid gap-4 sm:grid-cols-3">
            <NuxtLink
              v-for="t in TOOLS_DATA.filter(x => x.slug !== 'delivery-calculator')"
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
          Частые вопросы по расчету доставки грузов
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
