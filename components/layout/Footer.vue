<script setup lang="ts">
import logo from '~/assets/images/logo.png'
// Данные для меню, чтобы не захламлять шаблон
const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/services' },
  { name: 'О компании', href: '/#about' },
  { name: 'Контакты', href: '/#contacts' },
]

const services = [
  { name: 'Железнодорожный перевозка', href: '/services' },
  { name: 'Экспедиторские услуги', href: '/services' },
  { name: 'Автомобильные перевозки', href: '/services' },
  { name: 'Контейнерные перевозки', href: '/services' },
  { name: 'Таможенные оформления', href: '/services' },
]
</script>

<template>
  <footer class="bg-[#0B1120] pt-16 pb-8 text-white">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        
        <div class="flex flex-col space-y-6">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img :src="logo" alt="Inter Way" class="h-12 w-auto" />
          </NuxtLink>
          <p class="max-w-xs text-sm leading-relaxed text-gray-400">
            ТОО "INTER WAY" — современная логистическая компания. Комплексные решения по доставке, таможенному оформлению и экспедированию грузов в Казахстане и за его пределами.
          </p>
        </div>

        <div>
          <h3 class="mb-6 text-lg font-bold text-white">Навигация</h3>
          <ul class="space-y-4">
            <li v-for="item in navigation" :key="item.name">
              <a 
                :href="item.href" 
                class="text-sm text-gray-400 transition-colors hover:text-blue-500"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-lg font-bold text-white">Услуги</h3>
          <ul class="space-y-4">
            <li v-for="item in services" :key="item.name">
              <a 
                :href="item.href" 
                class="text-sm text-gray-400 transition-colors hover:text-blue-500"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-lg font-bold text-white">Контакты</h3>
          <ul class="space-y-4">
            
            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <a href="tel:+77003003390" class="text-sm text-gray-400 transition-colors hover:text-blue-500">
                +7 700 300 3390
              </a>
            </li>

            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:Inter_way@mail.ru" class="text-sm text-gray-400 transition-colors hover:text-blue-500">
                Inter_way@mail.ru
              </a>
            </li>

            <li class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span class="text-sm text-gray-400">
                г. Алматы, Медеуский район, ул. Кунаева, дом 32
              </span>
            </li>

          </ul>
        </div>

      </div>

      <div class="mt-16 border-t border-gray-800 pt-8 text-center">
        <p class="text-sm text-gray-500">
          © 2025 INTER WAY. Все права защищены.
        </p>
      </div>

    </div>
  </footer>
</template>
