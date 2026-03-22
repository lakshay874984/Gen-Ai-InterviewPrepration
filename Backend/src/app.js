const express = require("express")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Health check endpoint for Render/Docker
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview API Server Running", version: "1.0.0" })
})

const authRouter = require("./routes/auth.routes")
app.use("/api/auth", authRouter)


const interviewRouter = require("./routes/interview.routes")
app.use("/api/interview", interviewRouter)


module.exports = app