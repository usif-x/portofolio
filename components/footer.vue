<template>
  <footer class="relative bg-white dark:bg-gray-900 pt-16 pb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div class="col-span-1 md:col-span-2">
            <div class="mb-8">
              <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                Crafting exceptional digital experiences with modern web technologies. Let's build something amazing together.
              </p>
              <div class="flex gap-4">
                <a href="https://t.me/yousseifmuhammed" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="p-2 hover:scale-110 transition-transform duration-300 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  <span class="sr-only">Telegram</span>
                  <Icon icon="mdi:telegram" class="h-6 w-6" />
                </a>
                <a href="https://github.com/usif-x" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="p-2 hover:scale-110 transition-transform duration-300 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <span class="sr-only">GitHub</span>
                  <Icon icon="mdi:github" class="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul class="flex flex-col gap-3">
              <li v-for="(link, index) in quickLinks" :key="index">
                <NuxtLink :to="link.to" 
                   class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul class="flex flex-col gap-3">
              <li>
                <a href="https://t.me/yousseifmuhammed" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <Icon icon="mdi:telegram" class="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span class="group-hover:translate-x-1 transition-transform duration-300">Telegram</span>
                </a>
              </li>
              <li>
                <a href="https://maps.google.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                  <Icon icon="mdi:map-marker" class="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span class="group-hover:translate-x-1 transition-transform duration-300">Cairo, Egypt</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="relative border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              © {{ new Date().getFullYear() }} < BY: <span class="font-bold">Yousseif Muhammed</span> />
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
]
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
