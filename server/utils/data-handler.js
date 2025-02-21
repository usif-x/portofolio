// server/utils/data-handler.js
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

export function getDataFromFile(filePath) {
  const absolutePath = resolve(filePath)
  
  try {
    if (!existsSync(absolutePath)) {
      // Create directory if it doesn't exist
      const dir = dirname(absolutePath)
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }
      
      // Create empty data file
      writeFileSync(absolutePath, JSON.stringify({ projects: [] }), 'utf8')
      return { projects: [] }
    }
    
    const rawData = readFileSync(absolutePath, 'utf8')
    return JSON.parse(rawData)
  } catch (error) {
    console.error(`Error reading data file at ${absolutePath}:`, error)
    return { projects: [] }
  }
}

export function saveDataToFile(filePath, data) {
  const absolutePath = resolve(filePath)
  
  try {
    // Create directory if it doesn't exist
    const dir = dirname(absolutePath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
    
    writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error(`Error writing data file at ${absolutePath}:`, error)
    return false
  }
}