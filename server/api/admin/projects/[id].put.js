import { connectToDatabase } from '../../../utils/mongodb'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const { db } = await connectToDatabase()
    let id = event.context.params.id
    id = id.toString() // ensure id is a string
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.image) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }
    
    const updateData = {
      title: body.title,
      description: body.description,
      category: body.category,
      image: body.image,
      technologies: body.technologies || [],
      demo: body.demo,
      github: body.github,
      status: body.status,
      updatedAt: new Date().toISOString()
    }
    
    const result = await db.collection('projects').findOneAndUpdate(
      { _id: id }, // use the converted id
      { $set: updateData },
      { returnDocument: 'after' }
    )
    
    if (!result.value) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }
    
    return { project: result.value }
  } catch (error) {
    console.error('Error updating project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update project'
    })
  }
})