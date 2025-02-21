// server/api/admin/projects/index.post.js
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  try {
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
    let data;
    
    try {
      const rawData = readFileSync(dataPath, 'utf8')
      data = JSON.parse(rawData)
    } catch (err) {
      // Handle case where file doesn't exist or is invalid
      data = { projects: [] }
    }
    
    if (!data.projects) {
      data.projects = []
    }
    
    // Explicitly generate new UUID and ensure it's not empty
    const projectId = uuidv4();
    console.log("Generated new project ID:", projectId); // Debug logging
    
    // Create new project with generated ID
    const newProject = {
      ...body,
      id: projectId, // Ensure ID is set with valid UUID
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to projects array
    data.projects.unshift(newProject)
    
    // Save back to file
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8')
    
    return {
      project: newProject
    }
  } catch (error) {
    console.error('Error creating project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create project'
    })
  }
})