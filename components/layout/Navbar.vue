<script setup lang="ts">
import { ref } from 'vue'
import logo from '~/assets/images/logo.png'
import { COMPANY_INFO, SERVICES_DATA, TOOLS_DATA } from '~/data/seoData'

const isMobileMenuOpen = ref(false)
const isServicesOpen = ref(false)

const navLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Услуги', to: '/services', dropdownType: 'services' },
  { label: 'Направления', to: '/routes' },
  { label: 'Калькуляторы', to: '/tools', dropdownType: 'tools' },
  { label: 'О компании', to: '/#about' },
  { label: 'Контакты', to: '/contacts' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B1120]/95 backdrop-blur-md">
    <div class="container mx-auto flex items-center justify-between px-6 py-3 md:px-12">
      <NuxtLink to="/" class="flex items-center gap-3 text-2xl font-bold text-white" aria-label="INTER WAY — На главную">
        <img :src="logo" alt="INTER WAY — Логистическая компания в Алматы и Казахстане" class="h-14 w-auto" width="140" height="56" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
        <template v-for="link in navLinks" :key="link.to">
          <div
            v-if="link.dropdownType"
            class="relative group"
          >
            <NuxtLink
              :to="link.to"
              class="flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:text-blue-400"
            >
              {{ link.label }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5 transition-transform group-hover:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </NuxtLink>

            <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-72">
              <div v-if="link.dropdownType === 'services'" class="rounded-2xl border border-white/10 bg-[#0F172A] p-3 shadow-2xl">
                <NuxtLink
                  v-for="service in SERVICES_DATA"
                  :key="service.slug"
                  :to="`/services/${service.slug}`"
                  class="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-blue-600/20 hover:text-white"
                >
                  {{ service.shortTitle }}
                </NuxtLink>
                <div class="my-2 border-t border-white/10"></div>
                <NuxtLink
                  to="/services"
                  class="block rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                >
                  Все услуги →
                </NuxtLink>
              </div>

              <div v-else-if="link.dropdownType === 'tools'" class="rounded-2xl border border-white/10 bg-[#0F172A] p-3 shadow-2xl">
                <NuxtLink
                  v-for="tool in TOOLS_DATA"
                  :key="tool.slug"
                  :to="`/tools/${tool.slug}`"
                  class="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-blue-600/20 hover:text-white"
                >
                  <div>{{ tool.shortTitle }}</div>
                  <div class="text-[11px] text-gray-400">{{ tool.badge }}</div>
                </NuxtLink>
                <div class="my-2 border-t border-white/10"></div>
                <NuxtLink
                  to="/tools"
                  class="block rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                >
                  Все ВЭД-калькуляторы →
                </NuxtLink>
              </div>
            </div>
          </div>

          <NuxtLink
            v-else
            :to="link.to"
            class="text-xs font-bold uppercase tracking-widest text-white transition hover:text-blue-400"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center gap-4">
        <a
          :href="`tel:${COMPANY_INFO.phoneRaw}`"
          class="hidden xl:flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-white transition"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {{ COMPANY_INFO.phone }}
        </a>

        <NuxtLink
          to="/#contacts"
          class="hidden items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-500 md:flex"
        >
          Рассчитать доставку
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3 w-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>

        <button
          @click="toggleMobileMenu"
          class="relative z-50 flex h-10 w-10 items-center justify-center text-white focus:outline-none lg:hidden"
          aria-label="Открыть меню"
        >
          <div class="relative flex h-6 w-6 items-center justify-center overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute h-6 w-6 transition-all duration-300 transform"
              :class="isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute h-6 w-6 transition-all duration-300 transform"
              :class="isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute left-0 top-full w-full border-b border-white/10 bg-[#0B1120] p-6 shadow-2xl lg:hidden"
      >
        <div class="flex flex-col gap-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block py-1 text-center text-sm font-bold uppercase tracking-wider text-white transition hover:text-blue-400"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="border-t border-white/10 pt-3 flex flex-wrap justify-center gap-2">
            <NuxtLink
              v-for="s in SERVICES_DATA"
              :key="s.slug"
              :to="`/services/${s.slug}`"
              class="rounded-full bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-blue-600 hover:text-white"
              @click="isMobileMenuOpen = false"
            >
              {{ s.shortTitle }}
            </NuxtLink>
          </div>

          <a
            :href="`tel:${COMPANY_INFO.phoneRaw}`"
            class="text-center text-base font-bold text-blue-400 pt-2"
          >
            {{ COMPANY_INFO.phone }}
          </a>

          <NuxtLink
            to="/#contacts"
            class="block w-full rounded-full bg-blue-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:bg-blue-700"
            @click="isMobileMenuOpen = false"
          >
            Получить предложение
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
