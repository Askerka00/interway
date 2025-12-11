<template>
  <div class="flex flex-col">
    <div class="relative">
      <Hero />
    </div>
    <AboutSection />
    
    <ProcessSection />

    <KPI id="advantages" />

    <GeographySection />
  </div>
</template>

<script lang="ts" setup>
import Hero from '~/components/sections/HeroSection.vue';
import Navbar from '~/components/layout/Navbar.vue';
import ProcessSection from '~/components/sections/ProcessSection.vue';
import ServicesSection from '~/components/sections/ServicesSection.vue';
import AboutSection from '~/components/sections/AboutSection.vue';
import GeographySection from '~/components/sections/GeographySection.vue';
import KPI from '~/components/sections/KPI.vue';

</script>
