<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

interface HubPoint {
  id: string
  name: string
  stationCode: string
  lat: number
  lng: number
  type: 'border' | 'city'
}

const hubs: HubPoint[] = [
  { id: 'dostyk', name: 'Ст. Достык (Алашанькоу, граница КНР)', stationCode: '708409', lat: 45.253, lng: 82.484, type: 'border' },
  { id: 'altynkol', name: 'Ст. Алтынколь / МАПП Нур Жолы (Хоргос)', stationCode: '707603', lat: 44.197, lng: 80.511, type: 'border' },
  { id: 'saryagash', name: 'Ст. Сарыагаш (граница Узбекистана)', stationCode: '698309', lat: 41.460, lng: 69.168, type: 'border' },
  { id: 'petropavl', name: 'Петропавловск / Петухово (граница РФ)', stationCode: '688504', lat: 54.872, lng: 69.143, type: 'border' },
  { id: 'almaty', name: 'Алматы (Алматы-1 / Алматы-2)', stationCode: '700007', lat: 43.341, lng: 76.949, type: 'city' },
  { id: 'astana', name: 'Астана (Ст. Астана / Сороковая)', stationCode: '690006', lat: 51.196, lng: 71.408, type: 'city' },
  { id: 'shymkent', name: 'Шымкент (Ст. Шымкент)', stationCode: '698600', lat: 42.300, lng: 69.596, type: 'city' },
  { id: 'karaganda', name: 'Караганда (Ст. Караганда-Сорт.)', stationCode: '673903', lat: 49.804, lng: 73.109, type: 'city' },
  { id: 'aktau', name: 'Актау Порт (Ст. Мангышлак / ТМТМ)', stationCode: '66330X', lat: 43.653, lng: 51.197, type: 'city' },
  { id: 'atyrau', name: 'Атырау (Ст. Атырау)', stationCode: '661709', lat: 47.116, lng: 51.920, type: 'city' },
  { id: 'aktobe', name: 'Актобе (Ст. Актобе-1)', stationCode: '667902', lat: 50.283, lng: 57.167, type: 'city' },
  { id: 'pavlodar', name: 'Павлодар (Ст. Павлодар-Южный)', stationCode: '696106', lat: 52.287, lng: 76.967, type: 'city' }
]

const fromHubId = ref('altynkol')
const toHubId = ref('almaty')
const rollingStock = ref<'boxcar' | 'gondola' | 'cont20' | 'cont40' | 'truck20'>('cont40')
const cargoWeightTons = ref(24)

const fromHub = computed(() => hubs.find((h) => h.id === fromHubId.value) || hubs[0]!)
const toHub = computed(() => hubs.find((h) => h.id === toHubId.value) || hubs[4]!)

// Формула Гаверсинуса с коэффициентом извилистости ЖД/автодорожной сети Казахстана (~1.29)
const distanceKm = computed(() => {
  if (fromHub.value.id === toHub.value.id) return 50
  const R = 6371
  const dLat = ((toHub.value.lat - fromHub.value.lat) * Math.PI) / 180
  const dLng = ((toHub.value.lng - fromHub.value.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((fromHub.value.lat * Math.PI) / 180) *
      Math.cos((toHub.value.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const airDist = R * c
  return Math.round((airDist * 1.29) / 10) * 10
})

const transitDaysRail = computed(() => {
  // Нормативная скорость грузовой отправки КТЖ ~330–400 км/сутки + 1 сутки на станционные операции
  const days = Math.max(1, Math.ceil(distanceKm.value / 380))
  return `${days}–${days + 2} сут.`
})

const transitDaysRoad = computed(() => {
  // Автофура проходит 650–750 км в сутки
  const days = Math.max(1, Math.ceil(distanceKm.value / 700))
  return `${days}–${days + 1} дн.`
})

// Ориентир ставки в тенге (KZT)
const estimatedTariffKzt = computed(() => {
  const dist = distanceKm.value
  if (rollingStock.value === 'cont20') {
    return Math.round((95000 + dist * 165) / 1000) * 1000
  }
  if (rollingStock.value === 'cont40') {
    return Math.round((135000 + dist * 225) / 1000) * 1000
  }
  if (rollingStock.value === 'boxcar') {
    return Math.round((180000 + dist * 310 + cargoWeightTons.value * 2200) / 1000) * 1000
  }
  if (rollingStock.value === 'gondola') {
    return Math.round((165000 + dist * 285 + cargoWeightTons.value * 1950) / 1000) * 1000
  }
  // truck20 (Еврофура 20 т)
  return Math.round((85000 + dist * 290) / 1000) * 1000
})

const whatsappRailUrl = computed(() => {
  const text = `Здравствуйте, INTER WAY! Нужен точный расчет ЖД тарифа КТЖ / автоперевозки по маршруту:
• Станция отправления: ${fromHub.value.name} (код ${fromHub.value.stationCode})
• Станция назначения: ${toHub.value.name} (код ${toHub.value.stationCode})
• Тарифное расстояние: ~${distanceKm.value} км
• Вес груза: ${cargoWeightTons.value} т
• Оценка калькулятора: ~${estimatedTariffKzt.value.toLocaleString('ru-RU')} ₸`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Какие коды станций КТЖ у главных пограничных переходов с Китаем?',
    a: 'Два ключевых железнодорожных погранперехода между Китаем и Казахстаном: станция Достык (код ЕСР 708409, сопредельная станция Алашанькоу) и станция Алтынколь (код ЕСР 707603, сопредельная станция Хоргос).'
  },
  {
    q: 'От чего зависит итоговый ЖД тариф по территории Казахстана?',
    a: 'Железнодорожный тариф КТЖ складывается из базовой ставки за инфраструктуру и локомотивную тягу (зависит от тарифного расстояния, кода груза по ЕТСНГ/ГНГ и типа отправки — воинская, маршрутная или повагонная) плюс стоимость предоставления собственного вагона или фитинговой платформы оператора.'
  },
  {
    q: 'Предоставляет ли ТОО «INTER WAY» коды экспедитора для оплаты тарифа по РК и СНГ?',
    a: 'Да, мы оперативно выдаем провозные коды (подкорректированные телеграммы) для оплаты ж/д тарифа по территории Казахстана (КТЖ), России (РЖД), Узбекистана (УТЙ) и транзитных коридоров, а также подаем собственные крытые вагоны и контейнеры.'
  }
]

usePageSeo({
  title: 'Расчет ЖД тарифа Казахстан онлайн и калькулятор расстояний между станциями КТЖ | INTER WAY',
  description: 'Бесплатный онлайн-калькулятор расстояний между городами и ЖД станциями Казахстана (Достык, Алтынколь, Алматы, Астана, Шымкент, Актау) и расчет стоимости перевозки вагоном, контейнером и еврофурой.',
  path: '/tools/rail-distance-calculator',
  keywords: 'расчет жд тарифа казахстан онлайн бесплатно, рассчитать жд тариф по казахстану, расчет расстояния между городами казахстана, коды станций ктж достык алтынколь алматы',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и ВЭД-инструменты', path: '/tools' },
    { name: 'ЖД тариф и расстояния РК', path: '/tools/rail-distance-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор ЖД тарифа КТЖ и расстояний по Казахстану INTER WAY',
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
          <span class="text-blue-400 font-semibold">ЖД тариф и расстояния РК</span>
        </nav>

        <div class="max-w-4xl">
          <span class="mb-3 inline-block rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
            Коды станций ЕСР КТЖ • Достык • Алтынколь • Алматы • Астана • Актау
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор ЖД тарифа КТЖ и расстояний между станциями и городами Казахстана
          </h1>
          <p class="mt-4 text-base md:text-lg text-gray-300 max-w-3xl">
            Выберите пограничный переход или станцию отправления и город назначения — калькулятор определит коды станций ЕСР, тарифное расстояние в километрах, нормативное время в пути и ориентир провозной платы.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-10 lg:grid-cols-12 items-start">
          <!-- Левая часть -->
          <div class="lg:col-span-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              1. Выберите маршрут и подвижной состав
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Станция / Город отправления (или погранпереход)
              </label>
              <select
                v-model="fromHubId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="h in hubs" :key="h.id" :value="h.id">
                  {{ h.name }} [Код ЕСР: {{ h.stationCode }}]
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Станция / Город назначения в РК
              </label>
              <select
                v-model="toHubId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="h in hubs" :key="h.id" :value="h.id">
                  {{ h.name }} [Код ЕСР: {{ h.stationCode }}]
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Тип подвижного состава
              </label>
              <div class="grid sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  @click="rollingStock = 'cont40'"
                  class="rounded-xl p-3 text-left border text-xs font-bold transition"
                  :class="rollingStock === 'cont40' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Фитинговая платформа + 40'HC Контейнер
                </button>
                <button
                  type="button"
                  @click="rollingStock = 'cont20'"
                  class="rounded-xl p-3 text-left border text-xs font-bold transition"
                  :class="rollingStock === 'cont20' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Платформа + 20'DC Контейнер
                </button>
                <button
                  type="button"
                  @click="rollingStock = 'boxcar'"
                  class="rounded-xl p-3 text-left border text-xs font-bold transition"
                  :class="rollingStock === 'boxcar' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Крытый вагон (138–158 м³, до 68 т)
                </button>
                <button
                  type="button"
                  @click="rollingStock = 'gondola'"
                  class="rounded-xl p-3 text-left border text-xs font-bold transition"
                  :class="rollingStock === 'gondola' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Полувагон универсальный (до 70 т)
                </button>
                <button
                  type="button"
                  @click="rollingStock = 'truck20'"
                  class="sm:col-span-2 rounded-xl p-3 text-left border text-xs font-bold transition"
                  :class="rollingStock === 'truck20' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Альтернатива по автотрассе: Еврофура 20 тонн (90 м³)
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Вес нетто груза (тонн): {{ cargoWeightTons }} т
              </label>
              <input
                v-model.number="cargoWeightTons"
                type="range"
                min="5"
                max="68"
                step="1"
                class="w-full accent-blue-600"
              />
              <div class="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 т</span>
                <span>20 т (фура)</span>
                <span>40 т</span>
                <span>68 т (вагон)</span>
              </div>
            </div>
          </div>

          <!-- Правая часть -->
          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white shadow-xl">
              <div class="border-b border-white/10 pb-5">
                <span class="text-xs font-bold uppercase tracking-wider text-blue-400">
                  2. Карта маршрута и тарифная оценка
                </span>
                <h3 class="text-xl font-bold mt-1">
                  {{ fromHub.name.split('(')[0] }} → {{ toHub.name.split('(')[0] }}
                </h3>
                <p class="mt-1 text-xs text-gray-400">
                  Коды станций ЕСР КТЖ: {{ fromHub.stationCode }} → {{ toHub.stationCode }}
                </p>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Тарифное плечо</div>
                  <div class="mt-1 text-2xl font-bold text-blue-400">~{{ distanceKm }} км</div>
                  <div class="mt-1 text-[11px] text-gray-400">по сети РК</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Срок по Ж/Д</div>
                  <div class="mt-1 text-2xl font-bold text-white">{{ transitDaysRail }}</div>
                  <div class="mt-1 text-[11px] text-gray-400">без учета перегруза</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Срок Автофурой</div>
                  <div class="mt-1 text-2xl font-bold text-emerald-400">{{ transitDaysRoad }}</div>
                  <div class="mt-1 text-[11px] text-gray-400">от двери до двери</div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-white/5 p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-xs uppercase tracking-wider text-gray-400">
                    Ориентировочная провозная ставка (за 1 ед.):
                  </div>
                  <div class="text-3xl font-bold text-white mt-1">
                    {{ estimatedTariffKzt.toLocaleString('ru-RU') }} ₸
                  </div>
                  <div class="text-xs text-gray-400 mt-1">
                    Эквивалент: ~${{ Math.round(estimatedTariffKzt / 495).toLocaleString('ru-RU') }} (базовый тариф + предоставление ТС)
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  :href="whatsappRailUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition"
                >
                  Запросить точный код КТЖ по коду ЕТСНГ в WhatsApp
                </a>
                <NuxtLink
                  to="/services/air-rail"
                  class="rounded-full border border-white/25 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-slate-900 transition"
                >
                  Об услугах ЖД экспедирования
                </NuxtLink>
              </div>
            </div>

            <!-- Справочник кодов основных станций Казахстана -->
            <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200">
              <h4 class="text-base font-bold text-slate-900 mb-3">
                Справочник кодов ЕСР ключевых железнодорожных станций Казахстана
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div
                  v-for="h in hubs"
                  :key="h.id"
                  class="rounded-xl bg-slate-50 p-3 border border-slate-200/80"
                >
                  <div class="font-bold text-slate-900">{{ h.name.split('(')[0] }}</div>
                  <div class="text-blue-600 font-semibold mt-0.5">ЕСР: {{ h.stationCode }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-8 text-center">
          Частые вопросы по ЖД тарифам и станциям КТЖ
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
