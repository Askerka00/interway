<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
    <Navbar />

    <main class="flex-1 bg-gray-50 dark:bg-neutral-900">
      <slot />
    </main>

    <ContactForm />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'
import ContactForm from '~/components/sections/Form.vue'
import Footer from '~/components/layout/Footer.vue'
</script>
