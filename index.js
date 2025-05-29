const mongoose = require("mongoose")
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const { app, httpServer } = require("./socket/socket")

const authRoutes = require("./routes/auth.routes")
const publicRoutes = require("./routes/public.routes")
const adminRoutes = require("./routes/admin.routes")
const residentRoutes = require("./routes/resident.routes")
const superAdminRoutes = require("./routes/superAdmin.routes")
const securityRoutes = require("./routes/security.routes")
const { adminprotected, residentProtected, securityProtected } = require("./middleware/protected.middleware")

// const app = express()
app.use(express.json()) // req.body
app.use(cookieParser()) // req.cookies
app.use(express.static("dist"))

app.use(cors({
    origin: true,
    credentials: true // cookie
}))

app.use("/api/public", publicRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/superadmin", superAdminRoutes)
app.use("/api/admin", adminprotected, adminRoutes)
app.use("/api/resident", residentProtected, residentRoutes)
app.use("/api/security", securityProtected, securityRoutes)


app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Server Error', error: err.message })
})
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(PORT, console.log("server running"))
})