<template>
  <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-2901b68c=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-2901b68c=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-2901b68c=""></path></svg>
        <span class="self-center text-2xl font-semibold whitespace-nowrap">Blog</span>
    </router-link>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" id="navbar-button">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
    </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
        <li>
          <router-link to='/' :class="[ useRoute().fullPath == '/' ? activeClass : defaultClass]" @click='navbarClose'>
            Home
          </router-link>
        </li>
        <li>
          <router-link to='/testPage' :class="[ useRoute().fullPath == '/testPage' ? activeClass : defaultClass]" @click='navbarClose'>
            Test Page
          </router-link>
        </li>
        <li>
          <router-link to='/drawWorks' :class="[ useRoute().fullPath == '/drawWorks' ? activeClass : defaultClass]" @click='navbarClose'>
            Draw Works
          </router-link>
        </li>
        <li>
          <router-link to='/playWorks' :class="[ useRoute().fullPath == '/playWorks' ? activeClass : defaultClass]" @click='navbarClose'>
            play Works
          </router-link>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>

<script setup>
  import { Collapse } from 'flowbite';
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const activeClass = ref("block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0")
  const defaultClass = ref("block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0")

  let collapse
  onMounted(() => {
    const $navbarButton = document.getElementById('navbar-button');
    const $targetDiv = document.getElementById('navbar-sticky');
    

    collapse = new Collapse($targetDiv, $navbarButton);
  }) 
  const navbarClose = () => {
    collapse.toggle();
  };
</script>