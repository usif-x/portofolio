import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.image) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }
    
    // Load existing data
    const dataPath = resolve('./data/data.json')
    const rawData = readFileSync(dataPath, 'utf8')
    const data = JSON.parse(rawData)
    
    if (!data.projects) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }
    
    // Find project index
    const projectIndex = data.projects.findIndex(p => p.id === id)
    
    if (projectIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }
    
    // Update project
    const updatedProject = {
      ...data.projects[projectIndex],
      ...body,
      id, // Ensure ID remains the same
      updatedAt: new Date().toISOString()
    }
    
    // Update in array
    data.projects[projectIndex] = updatedProject
    
    // Save back to file
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8')
    
    return {
      project: updatedProject
    }
  } catch (error) {
    console.error('Error updating project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update project'
    })
  }
})