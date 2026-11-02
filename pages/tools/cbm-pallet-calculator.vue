<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

interface CargoRow {
  id: number
  title: string
  lengthCm: number
  widthCm: number
  heightCm: number
  weightPerUnitKg: number
  quantity: number
}

const rows = ref<CargoRow[]>([
  { id: 1, title: 'Европаллеты (120×80 см)', lengthCm: 120, widthCm: 80, heightCm: 150, weightPerUnitKg: 350, quantity: 8 },
  { id: 2, title: 'Коробки с товаром', lengthCm: 60, widthCm: 40, heightCm: 40, weightPerUnitKg: 18, quantity: 45 }
])

const addRow = (preset?: { title: string; l: number; w: number; h: number; weight: number; qty: number }) => {
  rows.value.push({
    id: Date.now() + Math.random(),
    title: preset?.title || `Место #${rows.value.length + 1}`,
    lengthCm: preset?.l ?? 80,
    widthCm: preset?.w ?? 60,
    heightCm: preset?.h ?? 50,
    weightPerUnitKg: preset?.weight ?? 25,
    quantity: preset?.qty ?? 10
  })
}

const removeRow = (id: number) => {
  if (rows.value.length > 1) {
    rows.value = rows.value.filter((r) => r.id !== id)
  }
}

const totalUnits = computed(() => rows.value.reduce((acc, r) => acc + (Number(r.quantity) || 0), 0))

const totalVolumeCbm = computed(() => {
  const sum = rows.value.reduce((acc, r) => {
    const volOne = ((Number(r.lengthCm) || 0) * (Number(r.widthCm) || 0) * (Number(r.heightCm) || 0)) / 1000000
    return acc + volOne * (Number(r.quantity) || 0)
  }, 0)
  return Number(sum.toFixed(2))
})

const totalWeightKg = computed(() => {
  return Math.round(
    rows.value.reduce((acc, r) => acc + (Number(r.weightPerUnitKg) || 0) * (Number(r.quantity) || 0), 0)
  )
})

const cargoDensity = computed(() => {
  if (totalVolumeCbm.value <= 0) return 0
  return Math.round(totalWeightKg.value / totalVolumeCbm.value)
})

const vehicles = [
  { id: 'c20', name: "20' DC Контейнер", maxCbm: 33, maxKg: 24000, euroPallets: 11, finPallets: 10, dims: '5.89 × 2.35 × 2.39 м' },
  { id: 'c40', name: "40' HC Контейнер (High Cube)", maxCbm: 76, maxKg: 26500, euroPallets: 25, finPallets: 22, dims: '12.03 × 2.35 × 2.69 м' },
  { id: 'truck90', name: 'Еврофура 90 м³ (тент / реф)', maxCbm: 90, maxKg: 21500, euroPallets: 33, finPallets: 26, dims: '13.60 × 2.45 × 2.70 м' },
  { id: 'wagon138', name: 'Крытый ЖД вагон (138 м³)', maxCbm: 138, maxKg: 68000, euroPallets: 38, finPallets: 32, dims: '15.72 × 2.76 × 3.20 м' }
]

const vehicleFillStats = computed(() => {
  return vehicles.map((v) => {
    const volPercent = Math.round((totalVolumeCbm.value / v.maxCbm) * 100)
    const weightPercent = Math.round((totalWeightKg.value / v.maxKg) * 100)
    const maxPercent = Math.max(volPercent, weightPercent)
    return {
      ...v,
      volPercent,
      weightPercent,
      maxPercent,
      unitsNeeded: Math.max(1, Math.ceil(maxPercent / 100))
    }
  })
})

const whatsappCbmUrl = computed(() => {
  const text = `Здравствуйте, INTER WAY! Посчитал габариты груза в вашем калькуляторе CBM:
• Общий объем: ${totalVolumeCbm.value} м³
• Общий вес: ${totalWeightKg.value} кг (плотность ${cargoDensity.value} кг/м³)
• Количество грузовых мест: ${totalUnits.value} шт.
Подскажите оптимальный вариант доставки (сборный груз LTL или отдельный контейнер/фура).`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Сколько европаллет (1200×800 мм) помещается в стандартную еврофуру и контейнер?',
    a: 'В стандартную еврофуру длиной 13,6 метра на пол в один ярус входит 33 европаллеты (1200×800 мм) или 26 финских паллет (1200×1000 мм). В 20-футовый морской контейнер помещается 11 европаллет, а в 40-футовый контейнер High Cube — 25 европаллет.'
  },
  {
    q: 'Как перевести сантиметры коробки в кубические метры (м³ / CBM)?',
    a: 'Перемножьте длину, ширину и высоту одной коробки в сантиметрах, разделите полученное число на 1 000 000 и умножьте на количество коробок. Например, коробка 60×40×40 см имеет объем 0,096 м³.'
  },
  {
    q: 'Почему реальная загрузка контейнера всегда на 10–15% меньше его паспортного объема?',
    a: 'Из-за зазоров между паллетами, неровностей упаковки и ограничений по штабелированию хрупких коробок полезный коэффициент заполнения (укладка) составляет в среднем 85% от геометрического объема кузова.'
  }
]

usePageSeo({
  title: 'Калькулятор объема груза в м3 (CBM) и расчет загрузки паллет в фуру и контейнер | INTER WAY',
  description: 'Бесплатный онлайн-калькулятор объема груза в кубометрах (м3 / CBM), расчет плотности (кг/м3) и количества паллет в еврофуре 90 м3, контейнерах 20 и 40 футов и ЖД вагоне.',
  path: '/tools/cbm-pallet-calculator',
  keywords: 'расчет объема груза м3 калькулятор, калькулятор объема и веса груза, расчет паллет в фуре, калькулятор загрузки контейнера 20 и 40 футов, сколько паллет входит в фуру, габариты контейнеров',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и ВЭД-инструменты', path: '/tools' },
    { name: 'Расчет объема (м³) и паллет', path: '/tools/cbm-pallet-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор объема груза (CBM / м³) и загрузки контейнеров и фур INTER WAY',
    category: 'UtilitiesApplication'
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
          <span class="text-blue-400 font-semibold">Расчет кубатуры (м³) и паллет</span>
        </nav>

        <div class="max-w-4xl">
          <span class="mb-3 inline-block rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-1 text-xs font-bold text-blue-300">
            Точный расчет CBM • 20'DC / 40'HC / Еврофура 90 м³ / Вагон КТЖ
          </span>
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор объема груза (м³ / CBM) и загрузки паллет в фуру и контейнер
          </h1>
          <p class="mt-4 text-base md:text-lg text-gray-300 max-w-3xl">
            Добавьте размеры ваших коробок или паллет — калькулятор мгновенно посчитает суммарную кубатуру, вес, плотность и покажет, какую долю контейнера или еврофуры займет партия.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-10 lg:grid-cols-12 items-start">
          <!-- Левая часть: таблица грузовых мест -->
          <div class="lg:col-span-7 rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <h2 class="text-xl font-bold text-slate-900">
                1. Габариты грузовых мест (в сантиметрах)
              </h2>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  @click="addRow({ title: 'Европаллет 120×80', l: 120, w: 80, h: 150, weight: 350, qty: 1 })"
                  class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  + Европаллет (120×80)
                </button>
                <button
                  type="button"
                  @click="addRow({ title: 'Финский паллет 120×100', l: 120, w: 100, h: 150, weight: 420, qty: 1 })"
                  class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  + Финпаллет (120×100)
                </button>
                <button
                  type="button"
                  @click="addRow()"
                  class="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition"
                >
                  + Добавить коробку
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="row in rows"
                :key="row.id"
                class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3"
              >
                <div class="flex items-center justify-between gap-3">
                  <input
                    v-model="row.title"
                    type="text"
                    class="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900"
                  />
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-blue-600">
                      {{ (((row.lengthCm * row.widthCm * row.heightCm) / 1000000) * row.quantity).toFixed(2) }} м³
                    </span>
                    <button
                      v-if="rows.length > 1"
                      type="button"
                      @click="removeRow(row.id)"
                      class="text-xs font-bold text-red-500 hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-500 mb-1">Длина (см)</label>
                    <input v-model.number="row.lengthCm" type="number" min="1" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-500 mb-1">Ширина (см)</label>
                    <input v-model.number="row.widthCm" type="number" min="1" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-500 mb-1">Высота (см)</label>
                    <input v-model.number="row.heightCm" type="number" min="1" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-500 mb-1">Вес 1 шт (кг)</label>
                    <input v-model.number="row.weightPerUnitKg" type="number" min="0.1" step="1" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-500 mb-1">Кол-во (шт)</label>
                    <input v-model.number="row.quantity" type="number" min="1" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Справочная таблица внутренних габаритов -->
            <div class="pt-4 border-t border-slate-200">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Справочник вместимости контейнеров, еврофур и вагонов:
              </h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-left text-xs divide-y divide-slate-200">
                  <thead>
                    <tr class="text-slate-500">
                      <th class="py-2 pr-3 font-bold">Тип транспорта</th>
                      <th class="py-2 px-3 font-bold">Внутр. размеры</th>
                      <th class="py-2 px-3 font-bold">Объем</th>
                      <th class="py-2 px-3 font-bold">Европаллет</th>
                      <th class="py-2 pl-3 font-bold">Макс. вес</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-slate-700">
                    <tr v-for="v in vehicles" :key="v.id">
                      <td class="py-2.5 pr-3 font-bold text-slate-900">{{ v.name }}</td>
                      <td class="py-2.5 px-3">{{ v.dims }}</td>
                      <td class="py-2.5 px-3 font-semibold text-blue-600">{{ v.maxCbm }} м³</td>
                      <td class="py-2.5 px-3 font-semibold">{{ v.euroPallets }} шт.</td>
                      <td class="py-2.5 pl-3">{{ (v.maxKg / 1000).toFixed(1) }} т</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Правая часть: Итоги и заполняемость транспорта -->
          <div class="lg:col-span-5 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white shadow-xl">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-400">
                2. Итоговые габариты партии
              </span>

              <div class="mt-5 grid grid-cols-3 gap-4">
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Общий объем</div>
                  <div class="mt-1 text-2xl font-bold text-blue-400">{{ totalVolumeCbm }} м³</div>
                  <div class="mt-1 text-[11px] text-gray-400">{{ totalUnits }} мест</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Общий вес</div>
                  <div class="mt-1 text-2xl font-bold text-white">{{ totalWeightKg.toLocaleString('ru-RU') }} кг</div>
                  <div class="mt-1 text-[11px] text-gray-400">{{ (totalWeightKg / 1000).toFixed(2) }} тонн</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div class="text-xs text-gray-400">Плотность</div>
                  <div class="mt-1 text-2xl font-bold text-emerald-400">{{ cargoDensity }}</div>
                  <div class="mt-1 text-[11px] text-gray-400">кг на 1 м³</div>
                </div>
              </div>

              <!-- Шкалы заполнения контейнеров и фуры -->
              <div class="mt-8 space-y-4">
                <div class="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Заполняемость транспорта вашим грузом:
                </div>

                <div
                  v-for="stat in vehicleFillStats"
                  :key="stat.id"
                  class="rounded-2xl bg-white/5 p-4 border border-white/10"
                >
                  <div class="flex items-center justify-between text-xs mb-2">
                    <span class="font-bold text-white">{{ stat.name }}</span>
                    <span class="font-semibold" :class="stat.maxPercent > 100 ? 'text-amber-300' : 'text-blue-300'">
                      Объем: {{ stat.volPercent }}% | Вес: {{ stat.weightPercent }}%
                    </span>
                  </div>
                  <div class="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      class="h-full rounded-full transition-all duration-300"
                      :class="stat.maxPercent > 100 ? 'bg-amber-400' : 'bg-blue-500'"
                      :style="{ width: `${Math.min(100, stat.maxPercent)}%` }"
                    ></div>
                  </div>
                  <div class="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                    <span>Вместимость: {{ stat.maxCbm }} м³ / {{ (stat.maxKg / 1000).toFixed(1) }} т</span>
                    <span v-if="stat.maxPercent < 65" class="text-emerald-400 font-semibold">
                      Выгодно везти сборным грузом (LTL/LCL)
                    </span>
                    <span v-else-if="stat.maxPercent <= 100" class="text-blue-300 font-semibold">
                      Оптимально под 1 полную единицу
                    </span>
                    <span v-else class="text-amber-300 font-semibold">
                      Потребуется единиц: {{ stat.unitsNeeded }} шт.
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                <a
                  :href="whatsappCbmUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full rounded-full bg-blue-600 px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition"
                >
                  Узнать цену доставки для {{ totalVolumeCbm }} м³ в WhatsApp
                </a>
                <NuxtLink
                  to="/tools/delivery-calculator"
                  class="w-full rounded-full border border-white/25 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-white hover:text-slate-900 transition"
                >
                  Перейти в калькулятор стоимости доставки →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white border-t border-slate-200/80">
      <div class="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 class="text-2xl font-bold text-slate-900 mb-8 text-center">
          Частые вопросы по расчету объема (CBM) и паллет
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
