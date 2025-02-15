export default defineNuxtRouteMiddleware((to, from) => {
  const { checkAuth } = useAuth()
  
  if (!checkAuth() && to.path.startsWith('/admin')) {
    return navigateTo('/admin/login')
  }
}) 