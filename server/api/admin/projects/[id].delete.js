import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id
    
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
    
    // Remove project
    data.projects.splice(projectIndex, 1)
    
    // Save back to file
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8')
    
    return {
      success: true,
      message: 'Project deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete project'
    })
  }
})