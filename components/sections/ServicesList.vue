<script setup lang="ts">
import { SERVICES_DATA } from '~/data/seoData'
</script>

<template>
  <section class="bg-slate-50 py-20 lg:py-28">
    <div class="container mx-auto px-6 md:px-12">
      <div class="mb-16 max-w-2xl">
        <span class="mb-3 block text-xs font-bold uppercase tracking-widest text-blue-600">
          Логистика под ключ
        </span>
        <h2 class="text-3xl font-bold text-slate-900 md:text-4xl">
          Услуги компании INTER WAY
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Полный цикл международных и внутриреспубликанских грузоперевозок, складской консолидации и таможенного оформления в Казахстане.
        </p>
      </div>

      <div class="flex flex-col gap-8">
        <article
          v-for="service in SERVICES_DATA"
          :key="service.slug"
          class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-blue-500/50 md:p-10 lg:flex lg:gap-12"
        >
          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

          <div class="relative z-10 flex flex-col items-start lg:w-2/5 lg:shrink-0">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <svg v-if="service.icon === 'rail'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 19.5h16.5M3.75 15h16.5M3.75 10.5h16.5M8.25 6 12 4.5 15.75 6m-11.25 0h16.5v12a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5V6Z" />
                </svg>
                <svg v-else-if="service.icon === 'road'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <svg v-else-if="service.icon === 'sea'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 6v12m4.5-12v12m4.5-12v12" />
                </svg>
                <svg v-else-if="service.icon === 'customs'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Срок: {{ service.transitTime }}
                </span>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {{ service.priceFrom }}
                </span>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              <NuxtLink :to="`/services/${service.slug}`">
                {{ service.title }}
              </NuxtLink>
            </h3>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ service.subtitle }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-4">
              <NuxtLink
                :to="`/services/${service.slug}`"
                class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
              >
                Подробнее и тарифы
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </NuxtLink>
              <NuxtLink
                to="/#contacts"
                class="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600"
              >
                Запросить расчет →
              </NuxtLink>
            </div>
          </div>

          <div class="my-8 h-px w-full bg-slate-100 lg:my-0 lg:h-auto lg:w-px"></div>

          <div class="relative z-10 flex-1 lg:pl-4">
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
