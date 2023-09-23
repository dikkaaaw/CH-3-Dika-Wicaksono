const fs = require("fs")

const express = require("express")
const morgan = require("morgan")

const carRoutes = require("./routes/carRoutes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

//PING SERVER
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ping Successfully!",
  })
})

app.use("/cars", carRoutes)

module.exports = app
