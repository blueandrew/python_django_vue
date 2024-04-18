<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Image</h2>
        </div>
        <div class="grid gap-2 lg:grid-cols-4">
          <div v-for="idx in 10" :key=idx>
            <router-link :to="{name: 'detailed', params: { id: idx }}" class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full rounded-lg" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
              <div class="mt-2 mb-3">
                <p class="font-bold text-xl mb-2 line-clamp-2">Image TitleImage TitleImage TitleImage TitleImage TitleImage TitleImage TitleImage Title</p>
              </div>
            </router-link>
            <div class="mb-3">
              <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                YYYY-MM-DD HH:MM
              </p>
            </div>
            <div class="">
              <div class="grid gap-2 grid-cols-4 text-center">
                <span class="inline-block bg-gray-200 rounded-lg px-2 py-1 text-sm font-semibold text-gray-700" v-for="idxx in 10" :key=idxx>#標籤</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  </section>
</template>