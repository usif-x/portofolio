<template>
  <div id="darkModeContainer">
    <button
      ref="darkModeToggle"
      class="dark-mode-btn relative inline-flex items-center py-1.5 px-2 rounded-full transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none focus-visible:ring-slate-500 cursor-pointer"
      role="switch"
      tabindex="0"
      :aria-checked="isDarkMode.toString()"
      @click="toggleDarkMode"
      :class="{ dark: isDarkMode }"
    >
      <span class="sr-only">Toggle dark mode</span>
      
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        :class="[
          'transform transition-transform duration-500',
          isDarkMode ? 'scale-100' : 'scale-0'
        ]"
        style="color: var(--icon-sun);"
      >
        <path
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      
      <!-- Moon icon (base position) -->
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        :class="[
          'ml-3.5 transform transition-transform duration-500',
          !isDarkMode ? 'scale-100' : 'scale-0'
        ]"
        style="color: var(--icon-sun);"
      >
        <path
          d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      
      <!-- Sliding circle -->
      <span
        class="absolute top-0.5 left-0.5 w-8 h-8 rounded-full flex items-center justify-center transition duration-500 transform"
        :class="isDarkMode ? 'translate-x-[2.625rem]' : 'translate-x-0'"
        :style="{ backgroundColor: 'var(--slider-bg)' }"
      >
        <!-- Sun icon inside circle -->
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          :class="[
            'flex-none transition duration-500 transform',
            !isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          ]"
          style="color: var(--icon-inner-sun);"
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        
        <!-- Moon icon inside circle -->
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          :class="[
            'flex-none -ml-6 transition duration-500 transform',
            isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          ]"
          style="color: var(--icon-inner-moon);"
        >
          <path
            d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>
    </button>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDarkMode, toggleDarkMode, initTheme } = useDarkMode()

onMounted(() => {
  initTheme()
})
</script>
