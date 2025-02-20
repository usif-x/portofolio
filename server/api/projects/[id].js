import { createClient } from '@vercel/edge-config'
import { defineEventHandler, createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  if (!config.EDGE_CONFIG) {
    console.error('EDGE_CONFIG environment variable is not set')
    throw createError({
      statusCode: 500,
      message: 'Server configuration error'
    })
  }

  try {
    const client = createClient(config.EDGE_CONFIG)
    const id = parseInt(event.context.params.id)
    const projects = await client.get('projects') || []
    
    // Handle PUT request for updating
    if (event.method === 'PUT') {
      const index = projects.findIndex(p => p.id === id)
      if (index === -1) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      
      const body = await readBody(event)
      projects[index] = { ...body, id }
      
      try {
        await client.set('projects', projects)
        return projects[index]
      } catch (error) {
        console.error('Failed to update project:', error)
        throw createError({
          statusCode: 500,
          message: 'Failed to update project'
        })
      }
    }
    
    // Handle DELETE request
    if (event.method === 'DELETE') {
      const index = projects.findIndex(p => p.id === id)
      if (index === -1) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      
      projects.splice(index, 1)
      try {
        await client.set('projects', projects)
        return { message: 'Project deleted successfully' }
      } catch (error) {
        console.error('Failed to delete project:', error)
        throw createError({
          statusCode: 500,
          message: 'Failed to delete project'
        })
      }
    }
    
    // GET request
    const project = projects.find(p => p.id === id)
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      })
    }
    
    return project
  } catch (error) {
    console.error('Error in project handler:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 