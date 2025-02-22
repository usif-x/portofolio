import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  try {
    const { db } = await connectToDatabase()
    const body = await readBody(event)
    
    if (!body.title || !body.description || !body.category || !body.image) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }
    
    const newProject = {
      _id: uuidv4(),
      title: body.title,
      description: body.description,
      category: body.category,
      image: body.image,
      technologies: body.technologies || [],
      demo: body.demo,
      github: body.github,
      status: body.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await db.collection('projects').insertOne(newProject)
    
    return {
      project: newProject
    }
  } catch (error) {
    console.error('Error creating project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create project'
    })
  }
})