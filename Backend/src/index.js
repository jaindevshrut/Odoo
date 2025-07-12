// require("dotenv").config({path: "../env"})
import dotenv from "dotenv"
dotenv.config({path: "../env"})
import connectDB from "./db/dbConnect.js";
import app from "./app.js"
const PORT = process.env.PORT || 3000
connectDB().then(()=>{
    app.on("error", (error)=>{
        console.error("Error: ", error)
        throw error
    }) // using for listining the error event
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((error)=>{
    console.error("Error: ", error)
    process.exit(1)
})
