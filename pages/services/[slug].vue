<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#app'
import { SERVICES_DATA } from '~/data/seoData'
import ServiceDetailView from '~/components/sections/ServiceDetailView.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const currentService = computed(() => {
  const found = SERVICES_DATA.find((s) => s.slug === slug.value)
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Услуга не найдена' })
  }
  return found
})
</script>

<template>
  <ServiceDetailView :slug="currentService.slug" />
</template>
