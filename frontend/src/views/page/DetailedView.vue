<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

      <div class="mx-auto max-w-screen-sm text-center mb-8">
        <img class="h-auto max-w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="image description">
      </div>
      <div class="px-1">
        <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Title{{ useRoute().params.id }}</h2>
      </div>
      <div class="px-1 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#標籤</span>
      </div>
      <div class="px-1">
          <p class="text-xs text-gray-500 truncate dark:text-gray-400">
            YYYY-MM-DD HH:MM
        </p>
      </div>
      
    </div>
  </section>
</template>

<script setup>
  import { useRoute } from 'vue-router'
</script>
