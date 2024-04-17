<template>
  <header>
    <NavMenuComponents />
  </header>

  <main class="px-4 pt-12">
    <router-view/>
  </main>
  
  <footer>
    <FooterComponents />
  </footer>
</template>

<script setup>
import NavMenuComponents from './components/NavMenuComponents.vue'
import FooterComponents from './components/FooterComponents.vue'
</script>