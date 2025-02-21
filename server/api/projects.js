// server/api/projects.js
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Define the path to the data.json file
    const dataPath = path.resolve(process.cwd(), 'data', 'data.json')
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      console.error('Projects data file not found')
      return {
        projects: []
      }
    }
    
    // Read and parse the data file
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const data = JSON.parse(rawData)
    
    // Extract projects from data file
    // This assumes the projects are stored in a 'projects' array within data.json
    const projects = data.projects || []
    
    // Apply any server-side filtering if needed
    // For example, you might want to filter out draft projects
    const publicProjects = projects.filter(project => !project.isDraft)
    
    // Return the projects data
    return {
      projects: publicProjects
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to load projects data'
    })
  }
})