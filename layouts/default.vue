<template>
  <div>
    <Navbar v-if="!isAdminRoute" />
    <slot />
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script> 