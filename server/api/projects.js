import { defineEventHandler, readBody, getMethod, getQuery, createError } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'

const dataDir = join(process.cwd(), 'server/data')
const projectsFile = join(dataDir, 'projects.json')

// Helper function to read projects
const getProjects = async () => {
  try {
    const data = await fs.readFile(projectsFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, create it with empty array
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(projectsFile, '[]')
    return []
  }
}

// Helper function to save projects
const saveProjects = async (projects) => {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2))
}

// GET: /api/projects
export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event)
    const query = getQuery(event)

    // GET all projects or single project
    if (method === 'GET') {
      const projects = await getProjects()
      if (query.id) {
        const project = projects.find(p => p.id === query.id)
        if (!project) {
          throw createError({
            statusCode: 404,
            message: 'Project not found'
          })
        }
        return project
      }
      return projects
    }

    // POST new project
    if (method === 'POST') {
      const body = await readBody(event)
      const projects = await getProjects()
      
      const newProject = {
        id: Date.now().toString(),
        title: body.title || '',
        description: body.description || '',
        image: body.image || '',
        category: body.category || '',
        technologies: body.technologies || [],
        demo: body.demo || '',
        github: body.github || '',
        status: body.status || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      projects.push(newProject)
      await saveProjects(projects)
      return newProject
    }

    // PUT update project
    if (method === 'PUT') {
      const body = await readBody(event)
      if (!body.id) {
        throw createError({
          statusCode: 400,
          message: 'Project ID is required'
        })
      }

      const projects = await getProjects()
      const index = projects.findIndex(p => p.id === body.id)
      
      if (index === -1) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      
      projects[index] = {
        ...projects[index],
        ...body,
        updatedAt: new Date().toISOString()
      }
      
      await saveProjects(projects)
      return projects[index]
    }

    // DELETE project
    if (method === 'DELETE') {
      const body = await readBody(event)
      if (!body.id) {
        throw createError({
          statusCode: 400,
          message: 'Project ID is required'
        })
      }

      const projects = await getProjects()
      const newProjects = projects.filter(p => p.id !== body.id)
      
      if (projects.length === newProjects.length) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      
      await saveProjects(newProjects)
      return { success: true }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to process request'
    })
  }
})

// Handle specific project routes
export const getProjectById = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id)
    const projects = await getProjects()
    const project = projects.find(p => p.id === id)
    
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      })
    }
    
    return project
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 