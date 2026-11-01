<script setup lang="ts">
import { COMPANY_INFO } from '~/data/seoData'
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Политика конфиденциальности и обработки персональных данных | ТОО «INTER WAY»',
  description: 'Политика конфиденциальности и порядок обработки персональных данных пользователей сайта логистической компании ТОО «INTER WAY» в соответствии с законодательством Республики Казахстан.',
  path: '/privacy',
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Политика конфиденциальности', path: '/privacy' }
  ]
})
</script>

<template>
  <div class="bg-white py-16 md:py-24">
    <div class="container mx-auto px-6 md:px-12 max-w-4xl prose prose-slate">
      <h1 class="text-3xl font-bold text-slate-900 mb-6">
        Политика конфиденциальности и обработки персональных данных
      </h1>
      <p class="text-sm text-gray-600 leading-relaxed mb-6">
        Настоящая Политика конфиденциальности регулирует порядок сбора, хранения и обработки персональных данных пользователей сайта компании <strong>{{ COMPANY_INFO.name }}</strong> (адрес: {{ COMPANY_INFO.address }}), в соответствии с Законом Республики Казахстан «О персональных данных и их защите».
      </p>

      <h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">1. Какие данные мы собираем</h2>
      <p class="text-sm text-gray-600 leading-relaxed">
        При заполнении форм расчета стоимости доставки и обратной связи мы запрашиваем только данные, необходимые для подготовки коммерческого предложения: имя контактного лица, номер телефона, параметры и маршрут следования груза.
      </p>

      <h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">2. Цели обработки данных</h2>
      <p class="text-sm text-gray-600 leading-relaxed">
        Предоставленные данные используются исключительно для: расчета ставок фрахта и таможенных платежей, связи менеджера компании с заявителем, заключения договора транспортной экспедиции и информирования о статусе перевозки.
      </p>

      <h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">3. Защита и неразглашение</h2>
      <p class="text-sm text-gray-600 leading-relaxed">
        {{ COMPANY_INFO.name }} не передает контактные данные и коммерческую информацию о грузах третьим лицам, за исключением случаев, предусмотренных законодательством РК. По всем вопросам вы можете обратиться по электронной почте <a :href="`mailto:${COMPANY_INFO.email}`" class="text-blue-600 underline">{{ COMPANY_INFO.email }}</a>.
      </p>
    </div>
  </div>
</template>
