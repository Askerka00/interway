<script setup lang="ts">
import { ref } from 'vue'
import logo from '~/assets/images/logo.png'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/#about' },
  { label: 'Услуги', to: '/services' },
  { label: 'Контакты', to: '/#contacts' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="absolute top-0 z-50 w-full border-b border-white/10">
    <div class="container mx-auto flex items-center justify-between px-6 py-3 md:px-12">
      <NuxtLink to="/" class="flex items-center gap-3 text-2xl font-bold text-white">
        <img :src="logo" alt="Inter Way" class="h-16 w-auto" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-xs font-bold uppercase tracking-widest text-white transition hover:text-blue-500"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <NuxtLink
          to="/#contacts"
          class="hidden items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-700 md:flex"
        >
          Получить предложение
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3 w-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>

        <button 
          @click="toggleMobileMenu" 
          class="relative z-50 flex h-10 w-10 items-center justify-center text-white focus:outline-none lg:hidden"
        >
          <span class="sr-only">Open menu</span>
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
        <div class="flex flex-col gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block text-center text-sm font-bold uppercase tracking-wider text-white transition hover:text-blue-500"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>

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
