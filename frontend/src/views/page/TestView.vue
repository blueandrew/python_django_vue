<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Test</h2>
      </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="pb-4 bg-white">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items">
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Url
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tag
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Updated_at
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b" v-for='(item, index) in worksList' :key=index>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ item.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.title }}
                        </td>
                        <td class="px-6 py-4">
                          <div class="relative me-4">
                            <img class="w-10 h-auto rounded-full" :src='item.url' alt="profile image">
                          </div>
                        </td>
                        <td class="px-6 py-4">
                            {{ getMergedTagStr(item.WorksTage) }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatDateString(item.updated_at) }}
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { apiGetWorksList } from '../../api'
  import { formatDateString } from '../../utils/format'
  
  const worksList = ref([]);

  onMounted(async () => {
    await getWorksList();
  });
  
  const getWorksList = async () => {
    worksList.value = await apiGetWorksList();
  }

  const getMergedTagStr = (data) => {
    let mergedTagStr = '';

    data.forEach(function(value){
        if (mergedTagStr==''){
            mergedTagStr += `${value.name}`;  
        }else{
            mergedTagStr += `, ${value.name}`;
        }
        
    });

    return mergedTagStr
  }
</script>