<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Image</h2>
        </div>
        <div class="grid gap-2 lg:grid-cols-4">
            <div v-for="idx in 10" :key=idx>
              <router-link :to="{name: 'detailed', params: { id: idx }}" class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">Image Title</div>
                </div>
                <div class="px-6">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#標籤</span>
                </div>
                <div class="px-6 py-2 text-right">
                    <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                      YYYY-MM-DD HH:MM
                  </p>
                </div>
              </router-link>
            </div>
        </div>
        
    </div>
  </section>
</template>