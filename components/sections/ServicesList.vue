<script setup lang="ts">
import { SERVICES_DATA } from '~/data/seoData'
</script>

<template>
  <section class="bg-slate-50 py-20 lg:py-28">
    <div class="container mx-auto px-6 md:px-12">
      <div class="mb-14 max-w-2xl">
        <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
          Наши услуги
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Организуем доставку, хранение и таможенное оформление грузов для вашего бизнеса.
        </p>
      </div>

      <div class="flex flex-col gap-6">
        <article
          v-for="service in SERVICES_DATA"
          :key="service.slug"
          class="rounded-3xl border border-slate-200 bg-white p-8 transition-colors hover:border-slate-300 md:p-10 lg:flex lg:gap-12"
        >
          <div class="flex flex-col items-start lg:w-2/5 lg:shrink-0">
            <h3 class="text-2xl font-bold text-slate-900">
              <NuxtLink :to="`/services/${service.slug}`" class="hover:text-blue-600 transition-colors">
                {{ service.title }}
              </NuxtLink>
            </h3>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ service.subtitle }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-4">
              <NuxtLink
                :to="`/services/${service.slug}`"
                class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
              >
                Подробнее об услуге
              </NuxtLink>
              <NuxtLink
                to="/#contacts"
                class="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600"
              >
                Оставить заявку →
              </NuxtLink>
            </div>
          </div>

          <div class="my-8 h-px w-full bg-slate-100 lg:my-0 lg:h-auto lg:w-px"></div>

          <div class="flex-1 lg:pl-4">
            <h4 class="mb-5 text-xs font-bold uppercase tracking-wider text-slate-400">
              Что входит в услугу:
            </h4>

            <ul class="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              <li
                v-for="(feature, fIdx) in service.features"
                :key="fIdx"
                class="flex items-start gap-3"
              >
                <div class="flex-none pt-1 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-sm text-gray-700 leading-snug">
                  {{ feature }}
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
