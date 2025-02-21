<template>
  <footer class="relative bg-gradient-to-t from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden transition-colors duration-300">
    <!-- Background decorative elements -->
    <div class="absolute bottom-[50%] right-[-5%] w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[60px] sm:blur-[80px] animate-float-slow"></div>
    <div class="absolute top-[30%] left-[-5%] w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[60px] sm:blur-[80px] animate-float-delayed"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Footer content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
        <!-- About section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 dark:ring-white/10">
              <img 
                src="/images/profile.jpg"
                alt="Yousseif Muhammed Logo"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="font-roboto text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">Yousseif Muhammed</h3>
          </div>
          <p class="font-cairo text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Building modern web experiences with a focus on performance, accessibility, and beautiful design.
          </p>
        </div>
        
        <!-- Quick links -->
        <div>
          <h4 class="font-roboto text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">Quick Links</h4>
          <ul class="font-cairo space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Contact info -->
        <div>
          <h4 class="font-roboto text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">Contact</h4>
          <ul class="font-cairo space-y-3">
            <li v-for="contact in contactInfo" :key="contact.label" class="flex items-center space-x-2">
              <Icon :icon="contact.icon" class="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ contact.value }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Social links -->
      <div class="flex justify-center space-x-4 sm:space-x-6 py-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <a v-for="link in socialLinks" 
           :key="link.url"
           :href="link.url" 
           target="_blank" 
           rel="noopener noreferrer"
           class="p-2 hover:scale-110 transition-transform duration-300"
           :class="['text-gray-500 dark:text-gray-400 transition-colors duration-300', link.hoverClass]">
          <span class="sr-only">{{ link.label }}</span>
          <Icon :icon="link.icon" class="h-5 w-5" />
        </a>
      </div>
      
      <!-- Copyright -->
      <div class="text-center pt-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <p class="font-cairo text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
          &copy; {{ new Date().getFullYear() }} Yousseif Mohammed.
        </p>
        <p class="font-cairo text-xs text-gray-400 dark:text-gray-600 mt-1 transition-colors duration-300">
          Built with <Icon icon="mdi:heart" class="inline-block h-3 w-3 text-red-500" /> using Nuxt.js and Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' }
]

const contactInfo = [
  { 
    icon: 'mdi:email-outline',
    label: 'Email',
    value: 'yousseifmohammed@gmail.com'
  }
]

const socialLinks = [
  { 
    icon: 'mdi:telegram',
    url: 'https://t.me/yousseifmuhammed',
    label: 'Telegram',
    hoverClass: 'hover:text-blue-500'
  },
  { 
    icon: 'mdi:github',
    url: 'https://github.com/usif-x',
    label: 'GitHub',
    hoverClass: 'hover:text-gray-900 dark:hover:text-white'
  },
  { 
    icon: 'mdi:linkedin',
    url: 'https://linkedin.com/in/yousseifmohammed',
    label: 'LinkedIn',
    hoverClass: 'hover:text-blue-700'
  },
  { 
    icon: 'mdi:twitter',
    url: 'https://twitter.com/yousseifm',
    label: 'Twitter',
    hoverClass: 'hover:text-blue-400'
  }
]
</script>