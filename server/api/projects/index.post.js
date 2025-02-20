import { defineEventHandler, createError, readBody } from 'h3'
import { createClient } from '@vercel/edge-config'

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
    // Create client using the official SDK
    const client = createClient(config.EDGE_CONFIG)
    
    // Read and validate new project data
    const body = await readBody(event)
    if (!body.title || !body.category) {
      throw createError({
        statusCode: 400,
        message: 'Title and category are required'
      })
    }

    // Fetch existing projects
    let projects = []
    try {
      projects = await client.get('projects') || []
      console.log('Fetched projects:', JSON.stringify(projects, null, 2))
    } catch (getError) {
      console.error('Error fetching projects:', getError)
      // If projects don't exist yet, we'll start with an empty array
      if (getError.status === 404) {
        console.log('No projects found, starting with empty array')
      } else {
        throw getError
      }
    }

    // Create new project object
    const newProject = {
      ...body,
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      status: Boolean(body.status),
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      createdAt: new Date().toISOString()
    }

    // Add to projects array
    const updatedProjects = [...projects, newProject]
    
    // Update Edge Config
    try {
      await client.set('projects', updatedProjects)
      console.log('Projects updated successfully')
    } catch (setError) {
      console.error('Error updating projects:', setError)
      throw createError({
        statusCode: 500,
        message: 'Failed to update projects in Edge Config'
      })
    }

    // Return success response
    return {
      success: true,
      message: 'Project created successfully',
      project: newProject
    }

  } catch (error) {
    console.error('Project creation error:', error)
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      message: error.message || 'Failed to create project'
    })
  }
})