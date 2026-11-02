<script setup lang="ts">
import logo from '~/assets/images/logo.png'
import { COMPANY_INFO, SERVICES_DATA, ROUTES_DATA, TOOLS_DATA } from '~/data/seoData'

const navigation = [
  { name: 'Главная', to: '/' },
  { name: 'Все услуги', to: '/services' },
  { name: 'Направления перевозок', to: '/routes' },
  { name: 'Калькуляторы ВЭД', to: '/tools' },
  { name: 'О компании', to: '/#about' },
  { name: 'Контакты и реквизиты', to: '/contacts' },
  { name: 'Политика конфиденциальности', to: '/privacy' },
]

const topRoutes = ROUTES_DATA.slice(0, 6)
</script>

<template>
  <footer class="bg-[#0B1120] pt-16 pb-10 text-white border-t border-white/5">
    <div class="container mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        <div class="flex flex-col space-y-6 lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img :src="logo" alt="ТОО INTER WAY — Логистическая компания Алматы" class="h-12 w-auto" width="120" height="48" loading="lazy" />
          </NuxtLink>
          <p class="max-w-sm text-sm leading-relaxed text-gray-400">
            {{ COMPANY_INFO.name }} — международная транспортно-логистическая компания в Алматы. Организуем авто-, Ж/Д, авиа- и морские контейнерные перевозки, складскую консолидацию и таможенное оформление грузов «под ключ» в Казахстане, Китае, СНГ, Турции и ЕС.
          </p>
          <div class="flex items-center gap-3 pt-1">
            <a
              :href="COMPANY_INFO.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
            >
              WhatsApp 24/7
            </a>
            <a
              :href="COMPANY_INFO.telegram"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition"
            >
              Telegram
            </a>
          </div>
        </div>

        <div>
          <h3 class="mb-6 text-sm font-bold uppercase tracking-wider text-white">Услуги</h3>
          <ul class="space-y-3.5">
            <li v-for="service in SERVICES_DATA" :key="service.slug">
              <NuxtLink
                :to="`/services/${service.slug}`"
                class="text-sm text-gray-400 transition-colors hover:text-blue-400"
              >
                {{ service.shortTitle }}
              </NuxtLink>
            </li>
          </ul>
          <h3 class="mt-8 mb-4 text-sm font-bold uppercase tracking-wider text-white">Онлайн-калькуляторы</h3>
          <ul class="space-y-3">
            <li v-for="tool in TOOLS_DATA" :key="tool.slug">
              <NuxtLink
                :to="`/tools/${tool.slug}`"
                class="text-sm text-gray-400 transition-colors hover:text-blue-400"
              >
                {{ tool.shortTitle }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-sm font-bold uppercase tracking-wider text-white">Популярные маршруты</h3>
          <ul class="space-y-3.5">
            <li v-for="route in topRoutes" :key="route.slug">
              <NuxtLink
                :to="`/routes/${route.slug}`"
                class="text-sm text-gray-400 transition-colors hover:text-blue-400"
              >
                {{ route.fromCountry }} → {{ route.toCity }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/routes" class="text-xs font-semibold text-blue-400 hover:text-blue-300">
                Все направления →
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-sm font-bold uppercase tracking-wider text-white">Контакты</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <a :href="`tel:${COMPANY_INFO.phoneRaw}`" class="text-sm text-gray-300 font-medium transition-colors hover:text-blue-400">
                {{ COMPANY_INFO.phone }}
              </a>
            </li>

            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <a :href="`mailto:${COMPANY_INFO.email}`" class="text-sm text-gray-400 transition-colors hover:text-blue-400">
                {{ COMPANY_INFO.email }}
              </a>
            </li>

            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span class="text-sm text-gray-400">
                {{ COMPANY_INFO.address }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} {{ COMPANY_INFO.name }}. Международные грузоперевозки и таможенное оформление в РК. Все права защищены.
        </p>
        <div class="flex flex-wrap gap-6">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
