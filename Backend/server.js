require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/config/database")

const cors = require("cors")

// Update app CORS to use environment frontend URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
)

// Connect to database
connectDB()

// Start server - bind to 0.0.0.0 for Render
const PORT = process.env.PORT || 3000
const HOST = "0.0.0.0"

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...')
  server.close(() => process.exit(0))
})