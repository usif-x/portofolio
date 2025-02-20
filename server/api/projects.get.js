import { createClient } from '@vercel/edge-config'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  if (!process.env.EDGE_CONFIG) {
    console.error('EDGE_CONFIG environment variable is not set')
    throw createError({
      statusCode: 500,
      message: 'Server configuration error'
    })
  }

  try {
    const client = createClient(process.env.EDGE_CONFIG)
    const projects = await client.get('projects')
    
    if (!projects) {
      // Return empty array if no projects found
      return { projects: [] }
    }

    return { projects }
  } catch (error) {
    console.error('Error loading projects:', error.message)
    
    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      console.log('Using development fallback data')
      return {
        projects: [
          {
            id: 1,
            title: "Portfolio",
            category: "Web App",
            description: "Portfolio website for showcasing projects and skills.",
            image: "https://i.ibb.co/1tnk86pp/Portfolio-Website-Photo.png",
            technologies: ["Node.js", "Nuxt.js"],
            demo: "https://yousseifmuhammed.vercel.app",
            github: "https://github.com/usif-x",
            status: true
          }
        ]
      }
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to load projects'
    })
  }
}) 