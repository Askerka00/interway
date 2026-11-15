<script setup lang="ts">
import { ref, computed } from 'vue'
import { TOOLS_DATA } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

interface TnvedItem {
  code: string
  name: string
  category: string
  dutyRate: number
  dutyLabel: string
  vatRate: number
  certification: string
  note: string
}

const tnvedList: TnvedItem[] = [
  { code: '8479 89 970 8', name: 'Промышленные станки, линии и оборудование (прочие)', category: 'Оборудование', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Декларация ТР ТС 010/2011', note: 'Часто применяется нулевая ставка ЕТТ ЕАЭС для производственных линий.' },
  { code: '8422 30 000 8', name: 'Оборудование для розлива, упаковки и маркировки', category: 'Оборудование', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Декларация ТР ТС 010/2011', note: 'Требуется технический паспорт и руководство на русском языке.' },
  { code: '8414 80 800 0', name: 'Воздушные и газовые компрессоры промышленные', category: 'Оборудование', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Декларация ТР ТС 010/2011, 004/2011', note: 'При наличии электродвигателя проверяется также ТР ТС 020/2011.' },
  { code: '8427 20 190 9', name: 'Вилочные погрузчики и складская техника', category: 'Оборудование', dutyRate: 5, dutyLabel: '5%', vatRate: 12, certification: 'Декларация ТР ТС 010/2011', note: 'Для самоходной техники может оформляться ЭПСМ.' },
  { code: '8504 40 900 0', name: 'Преобразователи статические, инверторы, блоки питания', category: 'Электроника', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Сертификат ТР ТС 004/2011, 020/2011', note: 'Популярная позиция для солнечных станций и промышленной автоматики.' },
  { code: '8541 43 000 0', name: 'Солнечные панели и фотоэлектрические модули', category: 'Электроника', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Декларация ТР ТС 020/2011', note: 'Льготная нулевая пошлина для зелёной энергетики.' },
  { code: '8471 30 000 0', name: 'Ноутбуки, планшеты и портативные компьютеры', category: 'Электроника', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Сертификат ТР ТС 004/2011, 020/2011 + нотификация КНБ', note: 'Для устройств с Wi-Fi/Bluetooth и шифрованием нужна нотификация.' },
  { code: '8517 62 000 9', name: 'Сетевое оборудование, роутеры, коммутаторы', category: 'Электроника', dutyRate: 0, dutyLabel: '0%', vatRate: 12, certification: 'Декларация/Сертификат ТР ТС + нотификация', note: 'Важно заранее проверить наличие бренда в реестре нотификаций.' },
  { code: '8539 52 000 0', name: 'Светодиодные (LED) лампы и светильники', category: 'Электроника', dutyRate: 10, dutyLabel: '10%', vatRate: 12, certification: 'Сертификат ТР ТС 004/2011, 020/2011, 037/2016', note: 'Для промышленных прожекторов ставка может отличаться (0–10%).' },
  { code: '8708 99 970 9', name: 'Автозапчасти и комплектующие кузова и ходовой', category: 'Автозапчасти', dutyRate: 5, dutyLabel: '5%', vatRate: 12, certification: 'Сертификат/Декларация ТР ТС 018/2011', note: 'На новые запчасти обязателен ТР ТС 018/2011 «О безопасности колёсных ТС».' },
  { code: '4011 10 000 9', name: 'Шины пневматические для легковых автомобилей', category: 'Автозапчасти', dutyRate: 10, dutyLabel: '10%', vatRate: 12, certification: 'Сертификат ТР ТС 018/2011', note: 'Требуется обязательная маркировка и подтверждение соответствия.' },
  { code: '4011 20 900 0', name: 'Шины грузовые и для коммерческого транспорта', category: 'Автозапчасти', dutyRate: 10, dutyLabel: '10%', vatRate: 12, certification: 'Сертификат ТР ТС 018/2011', note: 'На отдельные типоразмеры действуют антидемпинговые меры при ввозе из КНР.' },
  { code: '6203 42 310 0', name: 'Одежда мужская хлопчатобумажная (брюки, джинсы)', category: 'Одежда и текстиль', dutyRate: 10, dutyLabel: '10% (но не менее 1.5 €/кг)', vatRate: 12, certification: 'Декларация ТР ТС 017/2011', note: 'Комбинированная ставка пошлины ЕТТ ЕАЭС; для 1-го слоя нужен сертификат.' },
  { code: '6109 10 000 0', name: 'Футболки, майки трикотажные из хлопка', category: 'Одежда и текстиль', dutyRate: 10, dutyLabel: '10% (но не менее 1.75 €/кг)', vatRate: 12, certification: 'Сертификат ТР ТС 017/2011', note: 'Одежда первого слоя подлежит обязательной сертификации.' },
  { code: '6403 99 960 0', name: 'Обувь повседневная на подошве из резины/пластмассы', category: 'Одежда и текстиль', dutyRate: 10, dutyLabel: '10% (или фикс. €/пара)', vatRate: 12, certification: 'Декларация ТР ТС 017/2011 + маркировка DataMatrix', note: 'В Казахстане обязательна цифровая маркировка обуви.' },
  { code: '6302 60 000 0', name: 'Текстиль для дома, полотенца, постельное бельё', category: 'Одежда и текстиль', dutyRate: 10, dutyLabel: '10% (но не менее 0.45 €/кг)', vatRate: 12, certification: 'Сертификат ТР ТС 017/2011', note: 'Постельное бельё требует сертификат соответствия, а не декларацию.' },
  { code: '9403 60 100 9', name: 'Мебель деревянная для жилых комнат и офиса', category: 'Мебель и товары', dutyRate: 9, dutyLabel: '9% (но не менее 0.4 €/кг)', vatRate: 12, certification: 'Декларация ТР ТС 025/2012', note: 'Для детской мебели вместо декларации оформляется сертификат.' },
  { code: '9401 39 000 0', name: 'Офисные кресла и стулья с регулировкой высоты', category: 'Мебель и товары', dutyRate: 9, dutyLabel: '9%', vatRate: 12, certification: 'Декларация ТР ТС 025/2012', note: 'Поставка в разобранном виде снижает стоимость фрахта.' },
  { code: '6907 21 000 9', name: 'Керамогранит и керамическая плитка', category: 'Стройматериалы', dutyRate: 7.5, dutyLabel: '7.5%', vatRate: 12, certification: 'Без обязательного ТР ТС (пожарный/добровольный)', note: 'Тяжёлый груз — выгоднее перевозить в 20-футовом контейнере или вагоне.' },
  { code: '7308 90 980 9', name: 'Металлоконструкции, профили и строительные фермы', category: 'Стройматериалы', dutyRate: 7.5, dutyLabel: '7.5%', vatRate: 12, certification: 'Без обязательного ТР ТС', note: 'Проверяется точный химсостав и назначение конструкции.' },
  { code: '3917 21 100 0', name: 'Трубы и фитинги полиэтиленовые и ПВХ', category: 'Стройматериалы', dutyRate: 6.5, dutyLabel: '6.5%', vatRate: 12, certification: 'СГР / Декларация (для питьевого водоснабжения)', note: 'Для питьевой воды требуется свидетельство о госрегистрации (СГР).' },
  { code: '3926 90 970 9', name: 'Изделия из пластмасс, упаковка, хозтовары', category: 'Мебель и товары', dutyRate: 6.5, dutyLabel: '6.5%', vatRate: 12, certification: 'Декларация (если контактирует с пищей)', note: 'Один из самых частых кодов для товаров маркетплейсов.' },
  { code: '9503 00 950 0', name: 'Игрушки детские (пластик, наборы, конструкторы)', category: 'Мебель и товары', dutyRate: 7.5, dutyLabel: '7.5%', vatRate: 12, certification: 'Сертификат ТР ТС 008/2011', note: 'Обязательны лабораторные испытания образцов для сертификата.' },
  { code: '3304 99 000 0', name: 'Косметические средства и уход за кожей', category: 'Мебель и товары', dutyRate: 6.5, dutyLabel: '6.5%', vatRate: 12, certification: 'Декларация или СГР ТР ТС 009/2011', note: 'На детскую косметику и отбеливающие средства нужно СГР.' }
]

const categories = ['Все', 'Оборудование', 'Электроника', 'Автозапчасти', 'Одежда и текстиль', 'Мебель и товары', 'Стройматериалы']

const searchQuery = ref('')
const selectedCategory = ref('Все')

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return tnvedList.filter((item) => {
    const matchCategory = selectedCategory.value === 'Все' || item.category === selectedCategory.value
    if (!matchCategory) return false
    if (!q) return true
    return (
      item.code.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.certification.toLowerCase().includes(q)
    )
  })
})

const whatsappTnvedUrl = computed(() => {
  const text = `Здравствуйте! Нужен подбор точного кода ТН ВЭД ЕАЭС и расчёт растаможки в Казахстане.${searchQuery.value ? `\nМой запрос: ${searchQuery.value}` : ''}`
  return `https://wa.me/77003003390?text=${encodeURIComponent(text)}`
})

const faqs = [
  {
    q: 'Что такое код ТН ВЭД ЕАЭС и сколько в нём знаков?',
    a: 'ТН ВЭД ЕАЭС (Товарная номенклатура внешнеэкономической деятельности) — это единый классификатор товаров для Казахстана, России, Беларуси, Кыргызстана и Армении. В таможенной декларации указывается полный 10-значный код товара, который определяет ставку пошлины и требования сертификации.'
  },
  {
    q: 'Где проверяются ставки пошлин ЕТТ ЕАЭС и НДС в Казахстане?',
    a: 'Ставки ввозных таможенных пошлин установлены Единым таможенным тарифом (ЕТТ ЕАЭС) и едины для всех стран союза, а ставка импортного НДС в Казахстане составляет 12% согласно Налоговому кодексу РК.'
  },
  {
    q: 'Что означает «комбинированная ставка» (например, 10%, но не менее 1.5 €/кг)?',
    a: 'При комбинированной ставке таможня рассчитывает оба значения (процент от таможенной стоимости и фиксированную сумму в евро за килограмм или штуку) и применяет к оплате большее из них. Это часто встречается для одежды и обуви.'
  },
  {
    q: 'Нужен ли сертификат или декларация ТР ТС на каждую партию товара?',
    a: 'Если код ТН ВЭД попадает под технические регламенты Таможенного союза (ТР ТС), оформить декларацию или сертификат соответствия нужно до выпуска товара в свободное обращение (на серию до 1–5 лет либо на конкретную партию по контракту).'
  }
]

const relatedTools = [
  ...TOOLS_DATA,
  { slug: 'container-load-calculator', shortTitle: 'Загрузка контейнера и объёмный вес' }
]

usePageSeo({
  title: 'Справочник кодов ТН ВЭД ЕАЭС и Казахстана — пошлины, НДС | INTER WAY',
  description: 'Интерактивный справочник популярных кодов ТН ВЭД ЕАЭС для Казахстана: поиск по товару и коду, ставки пошлин ЕТТ ЕАЭС, НДС 12% и требования сертификации ТР ТС.',
  path: '/tools/tnved-directory',
  keywords: 'справочник тн вэд еаэс казахстан, подбор кода тн вэд онлайн, ставка пошлины еэт еаэс, сертификация тр тс казахстан',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы', path: '/tools' },
    { name: 'Справочник ТН ВЭД ЕАЭС', path: '/tools/tnved-directory' }
  ],
  faqs,
  webApp: {
    name: 'Справочник кодов ТН ВЭД ЕАЭС и ставок пошлин INTER WAY',
    category: 'ReferenceApplication'
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
          <span class="text-blue-400 font-semibold">Справочник ТН ВЭД ЕАЭС</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold leading-tight md:text-5xl">
            Справочник кодов ТН ВЭД ЕАЭС и ставок пошлин
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-2xl">
            Найдите популярные коды ТН ВЭД для импорта в Казахстан, проверьте ставку пошлины ЕТТ ЕАЭС, НДС 12% и требования сертификации ТР ТС.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-slate-50">
      <div class="container mx-auto px-6 md:px-12">
        <!-- Поиск и фильтры -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 space-y-5">
          <div class="grid gap-4 md:grid-cols-12 items-center">
            <div class="md:col-span-8">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Поиск по названию товара, коду ТН ВЭД или регламенту
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Например: станки, 8479, обувь, шины, светильники..."
                data-clarity-unmask="true"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div class="md:col-span-4 md:text-right pt-2 md:pt-6">
              <a
                :href="whatsappTnvedUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
              >
                Подобрать код у брокера →
              </a>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              @click="selectedCategory = cat"
              class="rounded-full px-4 py-2 text-xs font-bold border transition-colors"
              :class="selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Список кодов -->
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <div
            v-for="item in filteredItems"
            :key="item.code"
            class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 md:p-7 transition-colors hover:border-slate-400"
          >
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span class="rounded-lg bg-slate-900 px-3 py-1 font-mono text-xs font-bold text-white">
                  {{ item.code }}
                </span>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {{ item.category }}
                </span>
              </div>

              <h2 class="text-lg font-bold text-slate-900 leading-snug">
                {{ item.name }}
              </h2>

              <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div class="text-slate-500">Пошлина ЕТТ ЕАЭС</div>
                  <div class="mt-0.5 text-sm font-bold text-slate-900">{{ item.dutyLabel }}</div>
                </div>
                <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div class="text-slate-500">Импортный НДС в РК</div>
                  <div class="mt-0.5 text-sm font-bold text-slate-900">{{ item.vatRate }}%</div>
                </div>
              </div>

              <div class="mt-3 rounded-xl bg-amber-50/70 border border-amber-200/70 p-3 text-xs text-slate-700">
                <strong>Сертификация:</strong> {{ item.certification }}
              </div>

              <p class="mt-3 text-xs text-gray-500 leading-relaxed">
                {{ item.note }}
              </p>
            </div>

            <div class="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <NuxtLink
                :to="{ path: '/tools/customs-calculator', query: { duty: item.dutyRate, name: `${item.code} — ${item.name}` } }"
                class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
              >
                Рассчитать растаможку →
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-if="filteredItems.length === 0" class="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <div class="text-lg font-bold text-slate-900">По вашему запросу коды не найдены</div>
          <p class="mt-2 text-sm text-gray-600">
            В ЕТТ ЕАЭС более 11 000 товарных позиций. Отправьте описание товара нашему декларанту — подберём точный 10-значный код бесплатно.
          </p>
          <a
            :href="whatsappTnvedUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500"
          >
            Запросить подбор кода в WhatsApp
          </a>
        </div>

        <!-- SEO-блок -->
        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
            <h2 class="text-xl font-bold text-slate-900">
              Как код ТН ВЭД ЕАЭС влияет на стоимость растаможки в РК
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed">
              От правильной классификации товара по ТН ВЭД ЕАЭС зависят сразу три вещи: ставка ввозной пошлины (от 0% на станки до 10–15% на готовую продукцию), необходимость разрешительных документов (ТР ТС, СГР, нотификация) и риск корректировки таможенной стоимости (КТС).
            </p>
            <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 space-y-2">
              <div><strong>База для пошлины:</strong> Таможенная стоимость (Инвойс + Доставка до границы ЕАЭС).</div>
              <div><strong>База для НДС 12%:</strong> Таможенная стоимость + Пошлина + Таможенный сбор.</div>
              <div><strong>Важно:</strong> При неверном подборе кода таможня может доначислить платежи и выписать штраф, поэтому перед отправкой партии рекомендуем сверять код с брокером.</div>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
            <h2 class="text-xl font-bold text-slate-900">
              Частые вопросы по кодам ТН ВЭД и сертификации
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
            Услуги таможенного оформления и популярные маршруты
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink to="/services/customs" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Таможенное оформление в Казахстане →
            </NuxtLink>
            <NuxtLink to="/services/white-delivery-china" class="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
              Белая доставка из Китая под ключ →
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
