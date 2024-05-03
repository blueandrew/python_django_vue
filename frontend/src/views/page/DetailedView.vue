<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

      <div class="md:border border-gray-200  mb-4">
        <div class="mx-auto w-1/2max-w-screen-sm text-center mt-3 mb-4">
          <img class="mx-auto md:size-1/2 size-auto" :src='worksData.url' alt="image description">
        </div>
      </div>
      <div class="px-1 mb-4">
        <h2 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">{{ worksData.title }}</h2>
      </div>
      <div class="px-1 mb-4">
          <p class="text-xs text-gray-500 truncate">
            {{ formatDateString(worksData.updated_at) }}
        </p>
      </div>
      <div class="px-1">
        <span class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          v-for='(tagName, tagIndex) in worksData.WorksTage'
          :key=tagIndex >
          {{ tagName.name }}
        </span>
      </div>
      
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { apiGetWorksDetailed } from '../../api'
  import { formatDateString } from '../../utils/format.js'
  
  const worksData = ref([]);

  onMounted(async () => {
    await getWorksData();
  });
  
  const getWorksData = async () => {
    const data = {
      'work_id': useRoute().params.id
    }
    worksData.value = await apiGetWorksDetailed(data)
  }
</script>
