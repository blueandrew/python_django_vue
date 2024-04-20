<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Image</h2>
        </div>
        <div class="grid gap-2 lg:grid-cols-4">
          <div v-for='(item, index) in worksList' :key=index>
            <router-link :to='{name: "detailed", params: { id: item.id }}' class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full rounded-lg" :src='item.url' alt="Sunset in the mountains">
              <div class="mt-2 mb-3">
                <p class="font-bold text-xl mb-2 line-clamp-2">{{ item.title }}</p>
              </div>
            </router-link>
            <div class="mb-3">
              <p class="text-xs text-gray-500 truncate">
                {{ formatDateString(item.updated_at) }}
              </p>
            </div>
            <div class="">
              <div class="grid gap-2 grid-cols-4 text-center">
                <span class="inline-block bg-gray-200 rounded-lg px-2 py-1 text-sm font-semibold text-gray-700" 
                  v-for='(tagName, tagIndex) in item.WorksTage'
                  :key=tagIndex >
                  {{ tagName.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted  } from 'vue'
  import { apiGetWorksList } from '../../api'
  import { formatDateString } from '../../utils/format.js'
  
  const worksList = ref([])

  onMounted(async () => {
    await getWorksList()
  });
  
  const getWorksList = async () => {
    worksList.value = await apiGetWorksList()
  }
</script>