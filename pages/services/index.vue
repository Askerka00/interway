<template>
  <div class="bg-white dark:bg-neutral-900">
    <HeroService />
    <ServiceList />
  </div>
</template>

<script setup lang="ts">
import HeroService from '~/components/sections/HeroService.vue';
import ServiceList from '~/components/sections/ServicesList.vue'
</script>
