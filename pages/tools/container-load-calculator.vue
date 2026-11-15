<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

interface ContainerSpec {
  id: string
  name: string
  shortName: string
  lengthCm: number
  widthCm: number
  heightCm: number
  volumeCbm: number
  maxWeightKg: number
}

const containers: ContainerSpec[] = [
  { id: '20gp', name: '20’GP контейнер (33.2 м³)', shortName: '20’GP', lengthCm: 590, widthCm: 235, heightCm: 239, volumeCbm: 33.2, maxWeightKg: 21700 },
  { id: '40dv', name: '40’DV контейнер (67.7 м³)', shortName: '40’DV', lengthCm: 1203, widthCm: 235, heightCm: 239, volumeCbm: 67.7, maxWeightKg: 26680 },
  { id: '40hc', name: '40’HC High Cube (76.2 м³)', shortName: '40’HC', lengthCm: 1203, widthCm: 235, heightCm: 269, volumeCbm: 76.2, maxWeightKg: 26580 },
  { id: 'euro86', name: 'Еврофура 86 м³ (тент)', shortName: 'Фура 86 м³', lengthCm: 1360, widthCm: 245, heightCm: 258, volumeCbm: 86, maxWeightKg: 20000 },
  { id: 'euro120', name: 'Еврофура 120 м³ (сцепка)', shortName: 'Фура 120 м³', lengthCm: 1540, widthCm: 248, heightCm: 314, volumeCbm: 120, maxWeightKg: 20000 }
]

const selectedContainerId = ref('40hc')
const boxLengthCm = ref(60)
const boxWidthCm = ref(40)
const boxHeightCm = ref(40)
const boxWeightKg = ref(18)
const quantity = ref(120)
const allowRotate = ref(true)

const currentContainer = computed(() => containers.find((c) => c.id === selectedContainerId.value) || containers[2]!)

const oneBoxVolumeCbm = computed(() => {
  const l = Math.max(1, Number(boxLengthCm.value) || 0)
  const w = Math.max(1, Number(boxWidthCm.value) || 0)
  const h = Math.max(1, Number(boxHeightCm.value) || 0)
  return (l * w * h) / 1000000
})

const totalPartyVolumeCbm = computed(() => Number((oneBoxVolumeCbm.value * Math.max(1, Number(quantity.value) || 0)).toFixed(2)))
const totalPartyWeightKg = computed(() => Math.round((Number(boxWeightKg.value) || 0) * Math.max(1, Number(quantity.value) || 0)))

// Сколько штук помещается в 1 выбранный контейнер/фуру с учётом геометрии и грузоподъёмности
const fitStats = computed(() => {
  const c = currentContainer.value
  const l = Math.max(1, Number(boxLengthCm.value) || 1)
  const w = Math.max(1, Number(boxWidthCm.value) || 1)
  const h = Math.max(1, Number(boxHeightCm.value) || 1)
  const bw = Math.max(0.1, Number(boxWeightKg.value) || 1)

  const layers = Math.floor(c.heightCm / h)
  const fitStraight = Math.floor(c.lengthCm / l) * Math.floor(c.widthCm / w) * layers
  const fitRotated = allowRotate.value ? Math.floor(c.lengthCm / w) * Math.floor(c.widthCm / l) * layers : 0
  const maxByGeometry = Math.max(fitStraight, fitRotated)
  const maxByWeight = Math.floor(c.maxWeightKg / bw)

  const maxUnits = Math.max(0, Math.min(maxByGeometry, maxByWeight))
  const limitedBy = maxByWeight < maxByGeometry ? 'по весу' : 'по габаритам'

  return { maxUnits, maxByGeometry, maxByWeight, limitedBy }
})

const containersNeeded = computed(() => {
  if (fitStats.value.maxUnits <= 0) return 0
  return Math.ceil(Math.max(1, Number(quantity.value) || 0) / fitStats.value.maxUnits)
})

const volumeFillPercent = computed(() => {
  const pct = (totalPartyVolumeCbm.value / currentContainer.value.volumeCbm) * 100
  return Math.min(100, Math.round(pct))
})

const rawVolumeFillPercent = computed(() => Math.round((totalPartyVolumeCbm.value / currentContainer.value.volumeCbm) * 100))

const weightFillPercent = computed(() => {
  const pct = (totalPartyWeightKg.value / currentContainer.value.maxWeightKg) * 100
  return Math.min(100, Math.round(pct))
})

// Объёмный вес (Авиа K=5000, K=6000; Авто K=3000)
const volumetricAir6000 = computed(() => Math.round((oneBoxVolumeCbm.value * 1000000 / 6000) * Math.max(1, Number(quantity.value) || 0)))
const volumetricAir5000 = computed(() => Math.round((oneBoxVolumeCbm.value * 1000000 / 5000) * Math.max(1, Number(quantity.value) || 0)))
const volumetricAuto3000 = computed(() => Math.round((oneBoxVolumeCbm.value * 1000000 / 3000) * Math.max(1, Number(quantity.value) || 0)))

const lclVsFclRecommendation = computed(() => {
  const vol = totalPartyVolumeCbm.value
  const weight = totalPartyWeightKg.value
  const pct = rawVolumeFillPercent.value

  if (fitStats.value.maxUnits === 0) {
    return {
      badge: 'Негабарит',
      title: 'Место превышает внутренние размеры транспорта',
      desc: 'Уменьшите высоту/ширину упаковки или выберите контейнер 40’HC / фуру 120 м³.'
    }
  }
  if (vol <= 14 && weight <= 5000 && pct < 45) {
    return {
      badge: 'Рекомендуем LCL (Сборный груз)',
      title: `Заполнение ${currentContainer.value.shortName} всего ${pct}% — выгоднее сборная доставка`,
      desc: 'При заполнении менее 45% (до 14 м³) заказывать целый контейнер нецелесообразно. В сборном грузе (LCL / сборная фура) вы оплачиваете только занятые кубометры.'
    }
  }
  if (pct <= 100 && weight <= currentContainer.value.maxWeightKg) {
    return {
      badge: 'Рекомендуем FCL (Целый контейнер / фура)',
      title: `Оптимально под 1 × ${currentContainer.value.shortName} (заполнение ${pct}%)`,
      desc: 'При загрузке от 45–50% целый контейнер (FCL) или отдельная еврофура обходятся дешевле на 1 м³, едут быстрее и не требуют перегрузов на промежуточных складах.'
    }
  }
  return {
    badge: `Требуется ${containersNeeded.value} ед. транспорта`,
    title: `Партия превышает вместимость одного ${currentContainer.value.shortName}`,
    desc: `Понадобится ${containersNeeded.value} контейнера/фуры или отправка крытым ЖД-вагоном. Оставьте заявку — логист скомбинирует оптимальную схему.`
  }
})

const whatsappLoadUrl = computed(() => {
  const text = `Здравствуйте! Посчитал загрузку в калькуляторе:
• Транспорт: ${currentContainer.value.name}
• Место: ${boxLengthCm.value}×${boxWidthCm.value}×${boxHeightCm.value} см, ${boxWeightKg.value} кг
• Партия: ${quantity.value} шт. (${totalPartyVolumeCbm.value} м³, ${totalPartyWeightKg.value} кг)
• Рекомендация: ${lclVsFclRecommendation.value.badge}
Подскажите точную стоимость доставки в Казахстан.`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'В чём разница между контейнерами 40’DV и 40’HC (High Cube)?',
    a: 'Оба контейнера имеют длину 12.03 м и ширину 2.35 м, но 40’HC выше на 30 см (внутренняя высота 2.69 м против 2.39 м у 40’DV). За счёт этого полезный объём 40’HC составляет 76.2 м³ вместо 67.7 м³, что позволяет загрузить на 12–15% больше лёгких коробок.'
  },
  {
    q: 'Как рассчитывается объёмный вес по коэффициентам K=5000, K=6000 и K=3000?',
    a: 'Формула: (Длина × Ширина × Высота в см) / K. В авиаперевозках стандартом IATA является K=6000 (1 м³ = 166.7 кг), у некоторых экспресс-курьеров применяется K=5000 (1 м³ = 200 кг). Для авто и сборного карго часто используется K=3000 (1 м³ = 333.3 кг) или плотность 250 кг/м³.'
  },
  {
    q: 'Когда выгоднее выбирать LCL (сборный груз), а когда FCL (целый контейнер)?',
    a: 'LCL выгоден при объёме до 12–15 м³, когда вы платите только за фактические кубометры. Если ваша партия занимает от 50% объёма 20- или 40-футового контейнера (от 16–18 м³), ставка за целый контейнер FCL почти всегда оказывается выгоднее и безопаснее.'
  },
  {
    q: 'Какой максимальный вес груза можно загрузить в 20- и 40-футовый контейнер?',
    a: 'Полезная грузоподъёмность стандартного 20’GP контейнера составляет около 21.7 тонны (при общем весе брутто 24 т), а 40’DV/HC — около 26.5 тонны. Однако на автодорогах Казахстана действуют ограничения по осевым нагрузкам, поэтому для автовывоза оптимально до 20–22 тонн.'
  }
]

const relatedTools = [
  ...TOOLS_DATA,
  { slug: 'tnved-directory', shortTitle: 'Справочник ТН ВЭД ЕАЭС' }
]

usePageSeo({
  title: 'Калькулятор загрузки контейнера 20/40 футов и фуры | INTER WAY',
  description: 'Онлайн-калькулятор загрузки контейнера 20’GP, 40’DV, 40’HC и еврофуры 86–120 м³. Расчёт объёмного веса (K=5000, K=6000, K=3000) и сравнение LCL vs FCL.',
  path: '/tools/container-load-calculator',
  keywords: 'калькулятор загрузки контейнера 20 и 40 футов, расчет загрузки еврофуры онлайн, калькулятор объемного веса k 5000 6000 3000, lcl или fcl что выгоднее',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Загрузка контейнера и объёмный вес', path: '/tools/container-load-calculator' }
  ],
  faqs,
  webApp: {
    name: 'Калькулятор загрузки контейнера и объёмного веса INTER WAY',
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
          <span class="text-blue-400 font-semibold">Загрузка контейнера и объёмный вес</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Калькулятор загрузки контейнера и объёмного веса
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Узнайте, сколько коробок или паллет поместится в 20’GP, 40’DV, 40’HC или еврофуру 86–120 м³, рассчитайте объёмный вес и выберите выгодный формат (LCL или FCL).
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid gap-8 lg:grid-cols-12 items-start">
          <!-- Ввод параметров -->
          <div class="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
            <h2 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Тип транспорта и габариты места
            </h2>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Контейнер или еврофура
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="c in containers"
                  :key="c.id"
                  type="button"
                  @click="selectedContainerId = c.id"
                  class="rounded-xl px-3 py-2.5 text-xs font-bold border transition-colors text-left"
                  :class="selectedContainerId === c.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'"
                >
                  <div>{{ c.shortName }}</div>
                  <div class="text-[11px] font-normal opacity-80">{{ c.volumeCbm }} м³ / {{ (c.maxWeightKg / 1000).toFixed(1) }} т</div>
                </button>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                @click="boxLengthCm = 60; boxWidthCm = 40; boxHeightCm = 40; boxWeightKg = 18"
                class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Коробка 60×40×40
              </button>
              <button
                type="button"
                @click="boxLengthCm = 120; boxWidthCm = 80; boxHeightCm = 150; boxWeightKg = 350"
                class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Европаллета 120×80×150
              </button>
              <button
                type="button"
                @click="boxLengthCm = 120; boxWidthCm = 100; boxHeightCm = 150; boxWeightKg = 400"
                class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Фин-паллета 120×100×150
              </button>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Длина (см)</label>
                <input v-model.number="boxLengthCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Ширина (см)</label>
                <input v-model.number="boxWidthCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Высота (см)</label>
                <input v-model.number="boxHeightCm" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Вес 1 места (кг)</label>
                <input v-model.number="boxWeightKg" data-clarity-unmask="true" type="number" min="0.1" step="0.5" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Количество (шт)</label>
                <input v-model.number="quantity" data-clarity-unmask="true" type="number" min="1" class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:border-blue-600 focus:outline-none" />
              </div>
            </div>

            <label class="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
              <input v-model="allowRotate" data-clarity-unmask="true" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span>Оптимизировать укладку поворотом на 90° по горизонтали</span>
            </label>
          </div>

          <!-- Результаты -->
          <div class="lg:col-span-6 space-y-6">
            <div class="rounded-3xl bg-[#0B1120] p-8 text-white">
              <div class="flex items-center justify-between border-b border-white/10 pb-4 gap-3">
                <h3 class="text-xl font-bold">
                  Расчёт загрузки {{ currentContainer.shortName }}
                </h3>
                <span class="rounded-full bg-blue-600/20 border border-blue-500/40 px-3 py-1 text-xs font-bold text-blue-300">
                  {{ lclVsFclRecommendation.badge }}
                </span>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Поместится в 1 ед.</div>
                  <div class="mt-1 text-3xl font-bold text-blue-400">{{ fitStats.maxUnits }} шт.</div>
                  <div class="mt-1 text-[11px] text-gray-400">Ограничение {{ fitStats.limitedBy }}</div>
                </div>
                <div class="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div class="text-xs text-gray-400">Объём и вес партии</div>
                  <div class="mt-1 text-2xl font-bold text-white">{{ totalPartyVolumeCbm }} м³</div>
                  <div class="mt-1 text-xs text-gray-300">{{ totalPartyWeightKg.toLocaleString('ru-RU') }} кг</div>
                </div>
              </div>

              <!-- Прогресс-бары заполнения -->
              <div class="mt-6 space-y-3">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-gray-300">Заполнение по объёму ({{ currentContainer.volumeCbm }} м³)</span>
                    <span class="font-bold text-white">{{ rawVolumeFillPercent }}%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full bg-blue-500 transition-all" :style="{ width: `${volumeFillPercent}%` }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-gray-300">Загрузка по весу (макс. {{ currentContainer.maxWeightKg.toLocaleString('ru-RU') }} кг)</span>
                    <span class="font-bold text-white">{{ Math.round((totalPartyWeightKg / currentContainer.maxWeightKg) * 100) }}%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full bg-emerald-500 transition-all" :style="{ width: `${weightFillPercent}%` }"></div>
                  </div>
                </div>
              </div>

              <!-- Объёмный вес -->
              <div class="mt-6 rounded-2xl bg-white/5 p-5 border border-white/10">
                <div class="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                  Объёмный вес партии (сравните с фактическим {{ totalPartyWeightKg.toLocaleString('ru-RU') }} кг)
                </div>
                <div class="grid grid-cols-3 gap-3 text-center">
                  <div class="rounded-xl bg-white/5 p-3">
                    <div class="text-[11px] text-gray-400">Авиа (K=6000)</div>
                    <div class="mt-1 text-base font-bold text-white">{{ volumetricAir6000.toLocaleString('ru-RU') }} кг</div>
                  </div>
                  <div class="rounded-xl bg-white/5 p-3">
                    <div class="text-[11px] text-gray-400">Экспресс (K=5000)</div>
                    <div class="mt-1 text-base font-bold text-white">{{ volumetricAir5000.toLocaleString('ru-RU') }} кг</div>
                  </div>
                  <div class="rounded-xl bg-white/5 p-3">
                    <div class="text-[11px] text-gray-400">Авто (K=3000)</div>
                    <div class="mt-1 text-base font-bold text-blue-300">{{ volumetricAuto3000.toLocaleString('ru-RU') }} кг</div>
                  </div>
                </div>
              </div>

              <!-- Рекомендация LCL vs FCL -->
              <div class="mt-6 rounded-2xl bg-blue-950/50 p-5 border border-blue-500/30">
                <div class="text-sm font-bold text-white">{{ lclVsFclRecommendation.title }}</div>
                <p class="mt-1.5 text-xs text-gray-300 leading-relaxed">{{ lclVsFclRecommendation.desc }}</p>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <NuxtLink
                  to="/tools/delivery-calculator"
                  class="rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                >
                  Рассчитать стоимость доставки →
                </NuxtLink>
                <a
                  :href="whatsappLoadUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900"
                >
                  Отправить расчёт в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- SEO-блок -->
        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
            <h2 class="text-xl font-bold text-slate-900">
              Габариты контейнеров, еврофур и формула объёмного веса
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed">
              При планировании импорта из Китая, Турции или Европы важно заранее проверить не только общий кубаж, но и реальную укладку коробок/паллет с учётом внутренних размеров кузова и грузоподъёмности.
            </p>
            <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 space-y-2">
              <div><strong>20’GP (5.90 × 2.35 × 2.39 м):</strong> полезный объём 33.2 м³, до 11 европаллет, до 21.7 т.</div>
              <div><strong>40’HC (12.03 × 2.35 × 2.69 м):</strong> полезный объём 76.2 м³, до 25 европаллет, до 26.5 т.</div>
              <div><strong>Еврофура 86–120 м³:</strong> стандартная 13.6 м вмещает 33 европаллеты (до 20 т), сцепка/мега — до 38 паллет и 120 м³.</div>
              <div><strong>Объёмный вес:</strong> (Д × Ш × В в см) / K. Для авиа K=6000 (167 кг/м³) или K=5000 (200 кг/м³), для авто K=3000 (333 кг/м³).</div>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
            <h2 class="text-xl font-bold text-slate-900">
              Частые вопросы по загрузке и выбору LCL / FCL
            </h2>
            <div class="space-y-4">
              <div v-for="(item, idx) in faqs" :key="idx" class="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <h3 class="text-sm font-bold text-slate-900">{{ item.q }}</h3>
                <p class="mt-1 text-xs text-gray-600 leading-relaxed">{{ item.a }}</p>
              </div>
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
              Сборные грузы (LCL) из Китая и Турции →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка контейнерами из Китая →
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
