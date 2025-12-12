<script setup lang="ts">
import { reactive } from 'vue'
// Импортируем иконки для контактов (outline) и для формы (solid - для акцента)
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import { UserIcon as UserIconSolid, EnvelopeIcon as EnvelopeIconSolid, PhoneIcon as PhoneIconSolid, ChatBubbleBottomCenterTextIcon as ChatIconSolid } from '@heroicons/vue/20/solid'

const form = reactive({
  from: '',
  to: '',
  cargo: '',
  name: '',
  phone: ''
})

const submitForm = () => {
  // Логика отправки формы
  console.log('Форма отправлена:', form)
  alert('Спасибо! Форма отправлена (в консоль).')
  // Сброс формы (опционально)
  form.from = ''
  form.to = ''
  form.cargo = ''
  form.name = ''
  form.phone = ''
}
</script>

<template>
  <section class="bg-white py-16 md:py-20 lg:py-28" id="contacts">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        
        <div class="flex flex-col justify-between">
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Свяжитесь с нами
            </h2>
            <p class="mt-4 text-lg text-gray-600 leading-relaxed">
              Готовы обсудить ваш проект? Напишите нам, мы отвечаем в течение 15 минут в рабочее время. Или используйте мессенджеры для мгновенной связи.
            </p>

            <dl class="mt-10 space-y-6 text-base text-gray-600">
              <div class="flex gap-x-4">
                <div class="flex-none pt-1 text-blue-600">
                  <MapPinIcon class="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <span class="font-semibold text-gray-900">Офис</span><br>
                  ТОО "INTER WAY"<br>
                  г. Алматы, Медеуский район,<br>ул. Кунаева, дом 32
                </div>
              </div>

              <div class="flex gap-x-4">
                <div class="flex-none pt-1 text-blue-600">
                  <PhoneIcon class="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <span class="font-semibold text-gray-900">Телефон</span><br>
                  <a href="tel:+77003003390" class="hover:text-blue-500 transition-colors">
                    +7 700 300 3390
                  </a>
                </div>
              </div>

              <div class="flex gap-x-4">
                <div class="flex-none pt-1 text-blue-600">
                  <EnvelopeIcon class="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <span class="font-semibold text-gray-900">Электронная почта</span><br>
                  <a href="mailto:Inter_way@mail.ru" class="hover:text-blue-500 transition-colors">
                    Inter_way@mail.ru
                  </a>
                </div>
              </div>
            </dl>
          </div>

          <div class="mt-10 lg:mt-0">
             <p class="text-sm font-semibold text-gray-900 mb-4">Быстрая связь в мессенджерах:</p>
             <div class="flex gap-4">
               <a href="#" class="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100">
                 <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                 Telegram
               </a>
               <a href="#" class="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100">
                 <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                 WhatsApp
               </a>
             </div>
          </div>
        </div>

        <form @submit.prevent="submitForm" class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
          <div class="grid grid-cols-1 gap-y-6">
            
            <div>
              <label for="from" class="block text-sm font-semibold leading-6 text-gray-900">Откуда</label>
              <div class="relative mt-2.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input 
                  type="text" 
                  name="from" 
                  id="from" 
                  v-model="form.from"
                  class="block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow"
                  placeholder="г. Алматы, Казахстан"
                >
              </div>
            </div>

            <div>
              <label for="to" class="block text-sm font-semibold leading-6 text-gray-900">Куда</label>
              <div class="relative mt-2.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input 
                  type="text" 
                  name="to" 
                  id="to" 
                  v-model="form.to"
                  class="block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow"
                  placeholder="Москва, Россия"
                >
              </div>
            </div>

            <div>
              <label for="cargo" class="block text-sm font-semibold leading-6 text-gray-900">Опишите груз</label>
              <div class="relative mt-2.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-start pt-3 pl-3">
                  <ChatIconSolid class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <textarea 
                  name="cargo" 
                  id="cargo" 
                  rows="4" 
                  v-model="form.cargo"
                  class="block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow"
                  placeholder="Вес, габариты, тип груза, особые требования"
                ></textarea>
              </div>
            </div>

            <div>
              <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Имя</label>
              <div class="relative mt-2.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIconSolid class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  v-model="form.name"
                  class="block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow"
                  placeholder="Иван Иванов"
                >
              </div>
            </div>

            <div>
              <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Телефон</label>
              <div class="relative mt-2.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <PhoneIconSolid class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  v-model="form.phone"
                  class="block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow" 
                  placeholder="+7 (___) ___-__-__"
                >
              </div>
            </div>
            
            <div class="mt-2">
              <button 
                type="submit" 
                class="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Отправить заявку
              </button>
              <p class="mt-4 text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с нашей <a href="#" class="text-blue-600 hover:underline">политикой конфиденциальности</a>.
              </p>
            </div>

          </div>
        </form>

      </div>
    </div>
  </section>
</template>
