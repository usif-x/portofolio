export default defineEventHandler((event) => {
  console.log(`[${new Date().toISOString()}] ${event.method} ${event.path}`)
  
  // Log request body for POST/PUT requests
  if (event.method === 'POST' || event.method === 'PUT') {
    event.node.req.on('data', chunk => {
      console.log('Request body:', chunk.toString())
    })
  }
})