<script setup lang="ts">
import HeroService from '~/components/sections/HeroService.vue'
import ServiceList from '~/components/sections/ServicesList.vue'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Логистические услуги в Алматы и Казахстане: Авто, ЖД, Контейнеры и Таможня | INTER WAY',
  description: 'Все виды логистических услуг ТОО «INTER WAY»: международные автоперевозки (FTL/LTL), ЖД вагоны и контейнеры, авиадоставка, морские мультимодальные перевозки, склады консолидации и таможенное оформление.',
  path: '/services',
  keywords: 'логистические услуги алматы, экспедиторские услуги казахстан, жд перевозки, автоперевозки, контейнерные перевозки, таможенное оформление грузов рк',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' }
  ]
})
</script>

<template>
  <div class="bg-white dark:bg-neutral-900">
    <HeroService />
    <ServiceList />
  </div>
</template>
