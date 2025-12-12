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
            <span class="text-blue-600">INTER WAY</span> — ваш надежный путь в мире логистики
          </h2>

          <p class="mt-8 text-lg leading-relaxed text-gray-500 md:text-xl">
            INTER WAY — современная логистическая компания, предоставляющая комплексные решения в области грузоперевозок, таможенного оформления и транспортной экспедиции. Мы обеспечиваем надежную и эффективную доставку товаров по Казахстану и за его пределами, помогая оптимизировать цепочку поставок и сократить издержки.
          </p>
          <p class="mt-6 text-lg leading-relaxed text-gray-500 md:text-xl">
            Наша цель — создавать удобные и прозрачные процессы, соответствующие международным стандартам качества. Команда опытных специалистов сопровождает каждый этап доставки — от планирования маршрута до прибытия груза к получателю. Благодаря ответственному подходу и вниманию к деталям, INTER WAY заслужила доверие клиентов в сфере логистики, импорта и экспорта.
          </p>

        </div>
      </div>

    </div>
  </section>
</template>
