export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    console.log('Page start event emitted');
    // Emit custom event when navigation starts
    window.dispatchEvent(new Event('navigationStart'))
  })

  nuxtApp.hook('page:finish', () => {
    console.log('Page finish event emitted');
    // Emit custom event when navigation ends
    window.dispatchEvent(new Event('navigationEnd'))
  })
})