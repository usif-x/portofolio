import { defineEventHandler, createError, readBody } from 'h3'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const dataPath = resolve('./server/data/projects.json')

const getProjects = () => {
  try {
    const data = readFileSync(dataPath, 'utf8')
    return JSON.parse(data).projects
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

const saveProjects = (projects) => {
  try {
    writeFileSync(dataPath, JSON.stringify({ projects }, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error saving projects:', error)
    return false
  }
}

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id)
    const projects = getProjects()
    
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
      
      if (!saveProjects(projects)) {
        throw createError({
          statusCode: 500,
          message: 'Failed to update project'
        })
      }
      
      return projects[index]
    }
    
    if (event.method === 'DELETE') {
      const index = projects.findIndex(p => p.id === id)
      if (index === -1) {
        throw createError({
          statusCode: 404,
          message: 'Project not found'
        })
      }
      
      projects.splice(index, 1)
      if (!saveProjects(projects)) {
        throw createError({
          statusCode: 500,
          message: 'Failed to delete project'
        })
      }
      
      return { message: 'Project deleted successfully' }
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
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
}) 