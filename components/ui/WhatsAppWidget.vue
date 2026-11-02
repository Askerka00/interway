<script setup lang="ts">
import { COMPANY_INFO } from '~/data/seoData'

const defaultMessage = encodeURIComponent('Здравствуйте! Хочу проконсультироваться по доставке груза.')
const whatsappHref = `${COMPANY_INFO.whatsapp}?text=${defaultMessage}`
</script>

<template>
  <aside aria-label="Связаться в WhatsApp" class="fixed bottom-6 right-6 z-40 print:hidden">
    <a
      :href="whatsappHref"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-all duration-200 hover:bg-[#20ba59] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Написать логисту в WhatsApp"
    >
      <!-- Pulse ping indicator -->
      <span class="relative flex h-3 w-3">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span class="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
      </span>

      <!-- Official WhatsApp SVG icon -->
      <svg
        class="h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.176 8.176 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
      </svg>

      <!-- Label shown on desktop for maximum conversion -->
      <span class="hidden pr-2 text-sm font-semibold tracking-wide md:inline-block">
        WhatsApp логист
      </span>
    </a>
  </aside>
</template>
