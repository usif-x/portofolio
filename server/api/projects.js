export default defineEventHandler(async (event) => {
  try {
    const { db } = await connectToDatabase()
    
    const projects = await db.collection('projects')
      .find({ status: true })
      .sort({ createdAt: -1 })
      .toArray()
    
    return {
      projects
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load projects'
    })
  }
})