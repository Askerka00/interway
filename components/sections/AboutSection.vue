<script setup lang="ts">
// Логика не требуется
</script>

<template>
  <section id="about" class="bg-white py-16 md:py-20 lg:py-28">
    <div class="container mx-auto px-6 md:px-12">
      
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        <div class="relative order-2 h-full min-h-[400px] w-full overflow-hidden rounded-3xl lg:order-1 lg:min-h-[600px]">
          <img 
            src="~/assets/images/cargo-ship-sea.png" 
            alt="Грузовое судно в море" 
            class ="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div class="order-1 lg:order-2">
          
          <h2 class="font-sans text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            <span class="text-blue-600">Мы больше, чем логистика</span> —
            мы ваш партнер в успехе цепочки поставок.
          </h2>

          <p class="mt-8 text-lg leading-relaxed text-gray-500 md:text-xl">
            Наша цель — быть ведущим логистическим партнером, известным качественным управлением цепочек поставок, технологическими инновациями и заботой о клиентах. Мы стремимся превосходить ожидания, формировать стандарты отрасли и помогать бизнесу клиентов расти по всему миру.
          </p>

          <div class="mt-10">
            <a 
              href="#" 
              class="inline-block rounded-full border-2 border-slate-200 bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-wider text-slate-900 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Подробнее
            </a>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
