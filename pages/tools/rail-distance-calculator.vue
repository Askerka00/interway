<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const points = [
  { id: 'horgos', name: 'Граница Китая — Хоргос / Достык', lat: 44.197, lng: 80.511 },
  { id: 'almaty', name: 'Алматы', lat: 43.341, lng: 76.949 },
  { id: 'astana', name: 'Астана', lat: 51.196, lng: 71.408 },
  { id: 'shymkent', name: 'Шымкент', lat: 42.300, lng: 69.596 },
  { id: 'taraz', name: 'Тараз', lat: 42.900, lng: 71.367 },
  { id: 'karaganda', name: 'Караганда', lat: 49.804, lng: 73.109 },
  { id: 'aktau', name: 'Актау / Атырау', lat: 45.38, lng: 51.55 },
  { id: 'aktobe', name: 'Актобе', lat: 50.283, lng: 57.167 },
  { id: 'pavlodar', name: 'Павлодар / Усть-Каменогорск', lat: 52.287, lng: 76.967 }
]

const resultRef = ref<HTMLElement | null>(null)

const popularRailRoutes = [
  { label: 'Алматы — Астана', fromId: 'almaty', toId: 'astana', distance: '1 340 км', days: '2–4 дня' },
  { label: 'Достык — Алматы', fromId: 'horgos', toId: 'almaty', distance: '860 км', days: '2–3 дня' },
  { label: 'Алтынколь / Хоргос — Алматы', fromId: 'horgos', toId: 'almaty', distance: '370 км', days: '1–2 дня' },
  { label: 'Алматы — Шымкент', fromId: 'almaty', toId: 'shymkent', distance: '790 км', days: '2–3 дня' },
  { label: 'Алматы — Тараз', fromId: 'almaty', toId: 'taraz', distance: '530 км', days: '1–2 дня' },
  { label: 'Достык — Астана', fromId: 'horgos', toId: 'astana', distance: '1 560 км', days: '3–5 дней' },
  { label: 'Алматы — Караганда', fromId: 'almaty', toId: 'karaganda', distance: '1 100 км', days: '2–4 дня' },
  { label: 'Астана — Актобе', fromId: 'astana', toId: 'aktobe', distance: '1 480 км', days: '3–5 дней' },
  { label: 'Алматы — Атырау', fromId: 'almaty', toId: 'aktau', distance: '2 680 км', days: '5–7 дней' },
  { label: 'Алматы — Актау', fromId: 'almaty', toId: 'aktau', distance: '2 950 км', days: '6–8 дней' },
  { label: 'Алматы — Павлодар', fromId: 'almaty', toId: 'pavlodar', distance: '1 450 км', days: '3–5 дней' }
]

function selectPopularRoute(from: string, to: string) {
  fromId.value = from
  toId.value = to
  if (resultRef.value) {
    resultRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const fromId = ref('almaty')
const toId = ref('astana')
const transportType = ref<'truck' | 'container' | 'wagon'>('truck')

const fromPoint = computed(() => points.find((p) => p.id === fromId.value) || points[1]!)
const toPoint = computed(() => points.find((p) => p.id === toId.value) || points[2]!)

const distanceKm = computed(() => {
  if (fromPoint.value.id === toPoint.value.id) return 50
  const R = 6371
  const dLat = ((toPoint.value.lat - fromPoint.value.lat) * Math.PI) / 180
  const dLng = ((toPoint.value.lng - fromPoint.value.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((fromPoint.value.lat * Math.PI) / 180) *
      Math.cos((toPoint.value.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round((R * c * 1.28) / 10) * 10
})

const priceRangeKzt = computed(() => {
  const d = distanceKm.value
  let min = 0
  let max = 0
  if (transportType.value === 'truck') {
    min = Math.round((90000 + d * 260) / 10000) * 10000
    max = Math.round((130000 + d * 340) / 10000) * 10000
  } else if (transportType.value === 'container') {
    min = Math.round((110000 + d * 200) / 10000) * 10000
    max = Math.round((160000 + d * 270) / 10000) * 10000
  } else {
    min = Math.round((180000 + d * 310) / 10000) * 10000
    max = Math.round((250000 + d * 390) / 10000) * 10000
  }
  return `${min.toLocaleString('ru-RU')} – ${max.toLocaleString('ru-RU')} ₸`
})

const transportName = computed(() => {
  if (transportType.value === 'truck') return 'Отдельная еврофура до 20 тонн'
  if (transportType.value === 'container') return 'Контейнер по железной дороге — 20 или 40 футов'
  return 'Железнодорожный вагон до 68 тонн'
})

const whatsappRailUrl = computed(() => {
  const text = `Здравствуйте! Хочу узнать стоимость перевозки по Казахстану:
• Маршрут: ${fromPoint.value.name} → ${toPoint.value.name}
• Транспорт: ${transportName.value}
Подскажите точную ставку и наличие транспорта.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Как рассчитывается расстояние между городами Казахстана?',
    a: 'Калькулятор вычисляет протяжённость маршрута между ключевыми городами и погранпереходами Казахстана с учётом реальной дорожной и железнодорожной сети.'
  },
  {
    q: 'Когда выгоднее везти по железной дороге, а когда еврофурой?',
    a: 'Еврофура быстрее на коротких и средних расстояниях и удобна доставкой от двери до двери. Контейнер или вагон по железной дороге выгоднее на дальних маршрутах свыше 1500 км и при тяжёлых грузах от 22 до 68 тонн.'
  },
  {
    q: 'Включён ли НДС 12% в расчёт стоимости?',
    a: 'Внутренние перевозки по Казахстану стандартно включают НДС 12%. Точную стоимость с учётом подачи транспорта и погрузки менеджер рассчитает за 15 минут.'
  }
]

const relatedTools = [
  ...TOOLS_DATA.filter(x => x.slug !== 'rail-distance-calculator'),
  { slug: 'container-load-calculator', shortTitle: 'Загрузка контейнера и объёмный вес' },
  { slug: 'tnved-directory', shortTitle: 'Справочник ТН ВЭД' }
]

usePageSeo({
  title: 'Расстояние между ЖД станциями онлайн — расчёт км | INTER WAY',
  description: 'Узнайте точное расстояние между ЖД станциями и городами Казахстана онлайн: Алматы, Астана, Шымкент, Актау, Достык, Хоргос. Расчёт стоимости фурой, контейнером или вагоном.',
  path: '/tools/rail-distance-calculator',
  keywords: 'расстояние между жд станциями, расчет расстояния между жд станциями онлайн, расстояние по жд казахстан, калькулятор жд тарифа',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Расчет по Казахстану', path: '/tools/rail-distance-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор перевозок по Казахстану INTER WAY',
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
          <span class="text-blue-400 font-semibold">Расчет по Казахстану</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Расстояние между ЖД станциями и городами Казахстана
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Выберите город отправления, город назначения и тип транспорта, чтобы оценить расстояние и предварительную стоимость перевозки.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <div class="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Выберите маршрут
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Откуда
              </label>
              <select
                v-model="fromId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="p in points" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Куда
              </label>
              <select
                v-model="toId"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option v-for="p in points" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Чем везем
              </label>
              <div class="grid gap-2.5">
                <button
                  type="button"
                  @click="transportType = 'truck'"
                  class="rounded-xl p-3.5 text-left border text-sm font-bold transition-colors"
                  :class="transportType === 'truck' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Отдельная еврофура до 20 тонн
                </button>
                <button
                  type="button"
                  @click="transportType = 'container'"
                  class="rounded-xl p-3.5 text-left border text-sm font-bold transition-colors"
                  :class="transportType === 'container' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Контейнер по железной дороге — 20 или 40 футов
                </button>
                <button
                  type="button"
                  @click="transportType = 'wagon'"
                  class="rounded-xl p-3.5 text-left border text-sm font-bold transition-colors"
                  :class="transportType === 'wagon' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Крытый вагон или полувагон до 68 тонн
                </button>
              </div>
            </div>
          </div>

          <div ref="resultRef" class="lg:col-span-6 space-y-6 scroll-mt-24">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white">
              <h3 class="text-xl font-bold border-b border-white/10 pb-4">
                {{ fromPoint.name }} → {{ toPoint.name }}
              </h3>

              <div class="mt-6 grid sm:grid-cols-2 gap-4">
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Примерное расстояние</div>
                  <div class="mt-1 text-2xl font-bold text-white">~{{ distanceKm }} км</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Ориентировочная стоимость</div>
                  <div class="mt-1 text-2xl font-bold text-blue-400">{{ priceRangeKzt }}</div>
                </div>
              </div>

              <p class="mt-5 text-sm text-gray-300 leading-relaxed">
                Итоговая ставка зависит от даты погрузки и характера груза. Оставьте заявку в WhatsApp, чтобы узнать точную цену на сегодня.
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  :href="whatsappRailUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                >
                  Узнать точную цену в WhatsApp
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

        <!-- Таблица популярных ЖД-расстояний и сроков -->
        <div class="mt-14 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100">
            <h2 class="text-xl font-bold text-slate-900">
              Таблица популярных ЖД-расстояний и сроков
            </h2>
            <p class="text-xs text-slate-500">
              Нажмите на маршрут, чтобы сразу рассчитать стоимость выше
            </p>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th class="py-3 pr-4">Маршрут</th>
                  <th class="py-3 px-4">Расстояние по ЖД</th>
                  <th class="py-3 px-4">Срок в пути</th>
                  <th class="py-3 pl-4 text-right hidden sm:table-cell">Расчёт</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr
                  v-for="(row, idx) in popularRailRoutes"
                  :key="idx"
                  @click="selectPopularRoute(row.fromId, row.toId)"
                  class="cursor-pointer transition-colors hover:bg-blue-50/70 group"
                >
                  <td class="py-3.5 pr-4 font-bold text-slate-900 group-hover:text-blue-600">
                    {{ row.label }}
                  </td>
                  <td class="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                    {{ row.distance }}
                  </td>
                  <td class="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                    {{ row.days }}
                  </td>
                  <td class="py-3.5 pl-4 text-right text-xs font-bold text-blue-600 hidden sm:table-cell whitespace-nowrap">
                    Выбрать →
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Компактный блок: Частые вопросы -->
        <div class="mt-10 rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
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
              Доставка Китай → Алматы →
            </NuxtLink>
            <NuxtLink to="/routes/china-astana" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка Китай → Астана →
            </NuxtLink>
            <NuxtLink to="/routes/turkey-almaty" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Доставка Турция → Алматы →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка из Китая →
            </NuxtLink>
            <NuxtLink to="/services/consolidated-cargo" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Сборные грузы по РК и СНГ →
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
