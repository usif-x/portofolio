import { connectToDatabase } from '../../../utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    const { db } = await connectToDatabase()
    let id = event.context.params.id
    id = id.toString() // ensure id is a string
    
    const result = await db.collection('projects').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }
    
    return {
      success: true,
      message: 'Project deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete project'
    })
  }
})