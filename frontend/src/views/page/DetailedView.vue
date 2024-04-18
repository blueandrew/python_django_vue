<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

      <div class="md:border border-gray-200  mb-4">
        <div class="mx-auto max-w-screen-sm text-center mt-3 mb-4">
          <img class="h-auto max-w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="image description">
        </div>
      </div>
      <div class="px-1 mb-4">
        <h2 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title {{ useRoute().params.id }}</h2>
      </div>
      <div class="px-1 mb-4">
          <p class="text-xs text-gray-500 truncate dark:text-gray-400">
            YYYY-MM-DD HH:MM
        </p>
      </div>
      <div class="px-1">
        <span class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#標籤</span>
      </div>
      
    </div>
  </section>
</template>

<script setup>
  import { useRoute } from 'vue-router'
</script>
