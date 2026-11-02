<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

const points = [
  { id: 'horgos', name: 'Граница Китая (Хоргос / Достык)', lat: 44.197, lng: 80.511 },
  { id: 'almaty', name: 'Алматы', lat: 43.341, lng: 76.949 },
  { id: 'astana', name: 'Астана', lat: 51.196, lng: 71.408 },
  { id: 'shymkent', name: 'Шымкент', lat: 42.300, lng: 69.596 },
  { id: 'karaganda', name: 'Караганда', lat: 49.804, lng: 73.109 },
  { id: 'aktau', name: 'Актау / Атырау', lat: 45.38, lng: 51.55 },
  { id: 'aktobe', name: 'Актобе', lat: 50.283, lng: 57.167 },
  { id: 'pavlodar', name: 'Павлодар / Усть-Каменогорск', lat: 52.287, lng: 76.967 }
]

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
  if (transportType.value === 'truck') return 'Отдельная еврофура (до 20 тонн)'
  if (transportType.value === 'container') return 'Контейнер по Ж/Д (20 или 40 футов)'
  return 'Железнодорожный вагон (до 68 тонн)'
})

const whatsappRailUrl = computed(() => {
  const text = `Здравствуйте! Хочу узнать стоимость перевозки по Казахстану:
• Маршрут: ${fromPoint.value.name} → ${toPoint.value.name}
• Транспорт: ${transportName.value}
Подскажите точную ставку и наличие транспорта.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

usePageSeo({
  title: 'Расчет ЖД и автоперевозки по Казахстану онлайн | INTER WAY',
  description: 'Простой онлайн-калькулятор стоимости перевозки между городами Казахстана (Алматы, Астана, Шымкент, Актау, Хоргос) фурой, контейнером или вагоном.',
  path: '/tools/rail-distance-calculator',
  keywords: 'расчет жд тарифа казахстан онлайн, расчет расстояния между городами казахстана для грузоперевозок, грузоперевозки алматы астана цена',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Расчет по Казахстану', path: '/tools/rail-distance-calculator' }
  ],
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
            Калькулятор перевозок по Казахстану (Авто и Ж/Д)
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
                  Отдельная еврофура (до 20 тонн)
                </button>
                <button
                  type="button"
                  @click="transportType = 'container'"
                  class="rounded-xl p-3.5 text-left border text-sm font-bold transition-colors"
                  :class="transportType === 'container' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Контейнер по железной дороге (20 или 40 футов)
                </button>
                <button
                  type="button"
                  @click="transportType = 'wagon'"
                  class="rounded-xl p-3.5 text-left border text-sm font-bold transition-colors"
                  :class="transportType === 'wagon' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'"
                >
                  Крытый вагон или полувагон (до 68 тонн)
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-6">
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
                  to="#contacts"
                  class="rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
                >
                  Оставить заявку
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-14 pt-10 border-t border-slate-200 flex flex-wrap gap-3">
          <NuxtLink
            v-for="t in TOOLS_DATA.filter(x => x.slug !== 'rail-distance-calculator')"
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
