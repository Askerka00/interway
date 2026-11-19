<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const origins = [
  { id: 'china', label: 'Китай — Гуанчжоу, Иу, Шанхай, Урумчи', country: 'Китай', autoMin: 1.2, autoMax: 1.8, railMin: 0.6, railMax: 1.1, airMin: 3.8, airMax: 5.2, ftlMin: 3800, ftlMax: 4800, fclMin: 2400, fclMax: 3200 },
  { id: 'turkey', label: 'Турция — Стамбул, Мерсин, Бурса', country: 'Турция', autoMin: 1.8, autoMax: 2.5, railMin: 1.2, railMax: 1.7, airMin: 3.5, airMax: 4.8, ftlMin: 5200, ftlMax: 6400, fclMin: 3200, fclMax: 4100 },
  { id: 'russia', label: 'Россия — Москва, Екатеринбург, Новосибирск', country: 'Россия', autoMin: 0.3, autoMax: 0.6, railMin: 0.2, railMax: 0.4, airMin: 2.0, airMax: 3.2, ftlMin: 1600, ftlMax: 2600, fclMin: 1300, fclMax: 2100 },
  { id: 'europe', label: 'Европа — Германия, Италия, Польша', country: 'Европа', autoMin: 2.2, autoMax: 3.1, airMin: 4.8, airMax: 6.5, railMin: 1.5, railMax: 2.2, ftlMin: 5400, ftlMax: 6800, fclMin: 4100, fclMax: 5200 },
  { id: 'uae', label: 'ОАЭ — Дубай, Шарджа', country: 'ОАЭ', autoMin: 1.7, autoMax: 2.4, railMin: 1.2, railMax: 1.8, airMin: 3.4, airMax: 4.6, ftlMin: 4400, ftlMax: 5500, fclMin: 2500, fclMax: 3400 }
]

const destinations = [
  { id: 'almaty', label: 'Алматы', coef: 1.0 },
  { id: 'astana', label: 'Астана', coef: 1.08 },
  { id: 'shymkent', label: 'Шымкент', coef: 1.05 },
  { id: 'karaganda', label: 'Караганда', coef: 1.06 },
  { id: 'west', label: 'Атырау / Актау', coef: 1.15 }
]

const cargoTypes = [
  { id: 'general', label: 'Обычные товары, хозтовары, мебель' },
  { id: 'machinery', label: 'Оборудование, станки и запчасти' },
  { id: 'clothes', label: 'Одежда, обувь и текстиль' },
  { id: 'electronics', label: 'Электроника и бытовая техника' },
  { id: 'materials', label: 'Стройматериалы и сырье' }
]

const selectedOriginId = ref('china')
const selectedDestId = ref('almaty')
const selectedCargoId = ref('general')
const weightKg = ref(1000)
const volumeCbm = ref(5)

const currentOrigin = computed(() => origins.find((o) => o.id === selectedOriginId.value) || origins[0]!)
const currentDest = computed(() => destinations.find((d) => d.id === selectedDestId.value) || destinations[0]!)
const currentCargo = computed(() => cargoTypes.find((c) => c.id === selectedCargoId.value) || cargoTypes[0]!)

// Для расчета берем большее из реального веса и объемного веса (1 м3 = 250 кг)
const calcWeight = computed(() => Math.max(Number(weightKg.value) || 0, Math.round((Number(volumeCbm.value) || 0) * 250)))

const roadRange = computed(() => {
  const minVal = Math.min(currentOrigin.value.ftlMin, Math.max(120, Math.round(calcWeight.value * currentOrigin.value.autoMin * currentDest.value.coef)))
  const maxVal = Math.min(currentOrigin.value.ftlMax, Math.max(180, Math.round(calcWeight.value * currentOrigin.value.autoMax * currentDest.value.coef)))
  return `$${minVal.toLocaleString('ru-RU')} – $${Math.max(minVal + 100, maxVal).toLocaleString('ru-RU')}`
})

const railRange = computed(() => {
  const minVal = Math.min(currentOrigin.value.fclMin, Math.max(150, Math.round(calcWeight.value * currentOrigin.value.railMin * currentDest.value.coef)))
  const maxVal = Math.min(currentOrigin.value.fclMax, Math.max(220, Math.round(calcWeight.value * currentOrigin.value.railMax * currentDest.value.coef)))
  return `$${minVal.toLocaleString('ru-RU')} – $${Math.max(minVal + 100, maxVal).toLocaleString('ru-RU')}`
})

const airRange = computed(() => {
  const airW = Math.max(Number(weightKg.value) || 0, Math.round((Number(volumeCbm.value) || 0) * 167))
  const minVal = Math.max(180, Math.round(airW * currentOrigin.value.airMin * currentDest.value.coef))
  const maxVal = Math.max(250, Math.round(airW * currentOrigin.value.airMax * currentDest.value.coef))
  return `$${minVal.toLocaleString('ru-RU')} – $${maxVal.toLocaleString('ru-RU')}`
})

const selectedTransport = ref<'road' | 'rail' | 'air'>('road')

const selectedTransportLabel = computed(() => {
  if (selectedTransport.value === 'rail') return `ЖД доставка (${railRange.value})`
  if (selectedTransport.value === 'air') return `Авиадоставка (${airRange.value})`
  return `Автодоставка (${roadRange.value})`
})

const whatsappShareUrl = computed(() => {
  const text = `Здравствуйте! Хочу узнать точную стоимость доставки груза:
• Вариант: ${selectedTransportLabel.value}
• Откуда: ${currentOrigin.value.country}
• Куда: ${currentDest.value.label}
• Что везем: ${currentCargo.value.label}
• Примерный вес: ${weightKg.value} кг, объем: ${volumeCbm.value} м³
Подскажите точный расчет и сроки.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как рассчитывается оплачиваемый вес груза?',
    a: 'Мы сравниваем реальный вес груза и его объёмный вес. Для автодоставки 1 кубометр приравнивается к 250–333 кг, для авиа — к 167 кг. К расчёту берётся большее значение.'
  },
  {
    q: 'Что выгоднее: сборный груз или отдельный контейнер?',
    a: 'Для партий до 10–15 м³ и весом до 3–5 тонн выгоднее сборный груз — вы платите только за своё место в машине. При объёме от 18–20 м³ выгоднее заказать отдельный контейнер или фуру.'
  },
  {
    q: 'Включена ли растаможка в расчёт калькулятора?',
    a: 'Калькулятор показывает ориентировочную стоимость самой доставки. Таможенная пошлина и НДС 12% рассчитываются отдельно — их можно оценить в нашем таможенном калькуляторе.'
  }
]

const relatedTools = [
  ...TOOLS_DATA.filter(x => x.slug !== 'delivery-calculator'),
  { slug: 'container-load-calculator', shortTitle: 'Загрузка контейнера и объёмный вес' },
  { slug: 'tnved-directory', shortTitle: 'Справочник ТН ВЭД' }
]

usePageSeo({
  title: 'Калькулятор доставки грузов из Китая и мира в РК | INTER WAY',
  description: 'Удобный онлайн-калькулятор ориентировочной стоимости доставки грузов из Китая, Турции, России и Европы в Алматы и Астану.',
  path: '/tools/delivery-calculator',
  keywords: 'калькулятор доставки из китая в казахстан, рассчитать стоимость доставки из китая, калькулятор карго казахстан, калькулятор доставки из турции в казахстан',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Калькулятор доставки', path: '/tools/delivery-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор стоимости доставки грузов в Казахстан INTER WAY',
    category: 'BusinessApplication'
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
          <span class="text-blue-400 font-semibold">Калькулятор доставки</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор стоимости доставки грузов
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Укажите направление, примерный вес и объем вашего груза, чтобы сразу увидеть ориентировочный диапазон стоимости перевозки.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <!-- Левая колонка: Простые поля -->
          <div class="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Параметры груза
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Откуда отправляем
              </label>
              <select
                v-model="selectedOriginId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="o in origins" :key="o.id" :value="o.id">
                  {{ o.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Куда доставить в Казахстане
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="d in destinations"
                  :key="d.id"
                  type="button"
                  @click="selectedDestId = d.id"
                  class="rounded-xl px-3 py-2.5 text-xs font-bold border transition-colors"
                  :class="selectedDestId === d.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'"
                >
                  {{ d.label }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Примерный вес (кг)
                </label>
                <input
                  v-model.number="weightKg"
                  type="number"
                  min="1"
                  step="10"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Объем (м³)
                </label>
                <input
                  v-model.number="volumeCbm"
                  type="number"
                  min="0.1"
                  step="0.5"
                  data-clarity-unmask="true"
                  class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Что за товар
              </label>
              <select
                v-model="selectedCargoId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="c in cargoTypes" :key="c.id" :value="c.id">
                  {{ c.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Правая колонка: Выбираемые карточки диапазона цены -->
          <div class="lg:col-span-7 space-y-5">
            <button
              type="button"
              @click="selectedTransport = 'road'"
              class="w-full text-left cursor-pointer rounded-3xl border bg-white p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              :class="selectedTransport === 'road' ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'"
            >
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {{ selectedTransport === 'road' ? 'Выбрано • Удобная доставка до склада' : 'Удобная доставка до склада' }}
                </span>
                <h3 class="text-xl font-bold text-slate-900 mt-1">
                  Автодоставка: фура или сборный груз
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Забираем со склада отправителя и привозим в г. {{ currentDest.label }}.
                </p>
              </div>
              <div class="sm:text-right shrink-0">
                <div class="text-xs text-gray-400">Ориентировочно</div>
                <div class="text-2xl font-bold text-slate-900 mt-0.5">
                  {{ roadRange }}
                </div>
              </div>
            </button>

            <button
              type="button"
              @click="selectedTransport = 'rail'"
              class="w-full text-left cursor-pointer rounded-3xl border bg-white p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              :class="selectedTransport === 'rail' ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'"
            >
              <div>
                <span class="text-xs font-bold uppercase tracking-wider" :class="selectedTransport === 'rail' ? 'text-blue-600' : 'text-slate-500'">
                  {{ selectedTransport === 'rail' ? 'Выбрано • Выгодно для больших партий' : 'Выгодно для больших партий' }}
                </span>
                <h3 class="text-xl font-bold text-slate-900 mt-1">
                  Железнодорожная доставка
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Перевозка в контейнере или вагоне до станции в г. {{ currentDest.label }}.
                </p>
              </div>
              <div class="sm:text-right shrink-0">
                <div class="text-xs text-gray-400">Ориентировочно</div>
                <div class="text-2xl font-bold text-slate-900 mt-0.5">
                  {{ railRange }}
                </div>
              </div>
            </button>

            <button
              type="button"
              @click="selectedTransport = 'air'"
              class="w-full text-left cursor-pointer rounded-3xl border bg-white p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              :class="selectedTransport === 'air' ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'"
            >
              <div>
                <span class="text-xs font-bold uppercase tracking-wider" :class="selectedTransport === 'air' ? 'text-blue-600' : 'text-slate-500'">
                  {{ selectedTransport === 'air' ? 'Выбрано • Для срочных грузов' : 'Для срочных грузов' }}
                </span>
                <h3 class="text-xl font-bold text-slate-900 mt-1">
                  Авиадоставка
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Быстрая отправка самолетом в аэропорт г. {{ currentDest.label }}.
                </p>
              </div>
              <div class="sm:text-right shrink-0">
                <div class="text-xs text-gray-400">Ориентировочно</div>
                <div class="text-2xl font-bold text-slate-900 mt-0.5">
                  {{ airRange }}
                </div>
              </div>
            </button>

            <!-- Спокойный блок отправки заявки -->
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white flex flex-col gap-5">
              <div>
                <h4 class="text-xl font-bold">
                  Узнайте точную стоимость у менеджера за 15 минут
                </h4>
                <p class="mt-2 text-sm text-gray-300 leading-relaxed">
                  Расчет на сайте является предварительным. Нажмите кнопку ниже, чтобы отправить ваши данные в WhatsApp — мы подберем самый выгодный маршрут и назовем точную цену.
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <a
                  :href="whatsappShareUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                >
                  Узнать точную цену в WhatsApp
                </a>
                <NuxtLink
                  to="/#contacts"
                  class="rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
                >
                  Оставить заявку на сайте
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
            Популярные маршруты и услуги логистики
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink to="/routes/china-almaty" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка грузов Китай → Алматы →
            </NuxtLink>
            <NuxtLink to="/routes/china-astana" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка грузов Китай → Астана →
            </NuxtLink>
            <NuxtLink to="/routes/turkey-almaty" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка грузов Турция → Алматы →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка из Китая под ключ →
            </NuxtLink>
            <NuxtLink to="/services/consolidated-cargo" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Сборные грузы из Китая и Турции →
            </NuxtLink>
            <NuxtLink to="/services/customs" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Таможенное оформление в РК →
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
