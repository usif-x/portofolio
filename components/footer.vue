<template>
  <footer class="relative bg-white dark:bg-gray-900 pt-16 pb-6">
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <div class="mb-8">
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
            Crafting exceptional digital experiences with modern web technologies. Let's build something amazing together.
          </p>
        </div>

        <!-- Footer Bottom -->
        <div class="w-full border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
          <div class="py-6">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              © {{ currentYear }} <span class="font-bold">Yousseif Muhammed</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Optional: Add a subtle animation on page load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

footer {
  animation: fadeIn 0.5s ease-out;
}
</style>