const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const port = 3069
app.use(cors())
const server = http.createServer(app)




server.listen(port, () =>{
    console.log("Server Running on: " + port)
})