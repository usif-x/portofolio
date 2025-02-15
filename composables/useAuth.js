import { ref } from 'vue'
import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#app'

const isAuthenticated = ref(false)

export function useAuth() {
  const config = useRuntimeConfig()

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email) // Debug log
      
      // Get credentials from runtime config
      const adminEmail = config.public.adminEmail || process.env.NUXT_ADMIN_EMAIL
      const adminPassword = config.public.adminPassword || process.env.NUXT_ADMIN_PASSWORD

      console.log('Checking against:', adminEmail) // Debug log

      if (email === adminEmail && password === adminPassword) {
        isAuthenticated.value = true
        if (process.client) {
          sessionStorage.setItem('admin-auth', 'true')
        }
        return { success: true }
      }
      return { 
        success: false, 
        error: 'Invalid credentials' 
      }
    } catch (error) {
      console.error('Login error:', error) // Debug log
      return { 
        success: false, 
        error: 'Login failed' 
      }
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    if (process.client) {
      sessionStorage.removeItem('admin-auth')
    }
  }

  const checkAuth = () => {
    if (process.client) {
      isAuthenticated.value = sessionStorage.getItem('admin-auth') === 'true'
    }
    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
} 