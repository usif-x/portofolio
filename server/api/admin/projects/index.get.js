// server/api/admin/projects/index.get.js
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const dataPath = resolve('./data/data.json')
    const rawData = readFileSync(dataPath, 'utf8')
    const data = JSON.parse(rawData)
    
    return {
      projects: data.projects || []
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})

