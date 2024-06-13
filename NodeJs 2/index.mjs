import express from "express"
import "dotenv/config"
import path from "path"
import { log } from "console"

const app = express()
const PORT = process.env.PORT   
const _dirname = path.resolve()     

console.log(process.env.secretKey);

app.use(express.static("public"))  // ya sirf index ki file ko main manta
// app.use(express.static("public", {index : "inde.html"}))  // ab ya change ho sakta index sa

app.get("/about", (req, res)=>{
    try {
        randomVar
        res.status(200).sendFile(path.resolve(_dirname, './public/about.html'))
    } catch (error) {
        res.status(500).send({
            error: error.message,
            status: "Error"
        })
    }
})

app.get("*", (req, res)=>{
    res.status(200).sendFile(path.resolve(_dirname, './public/404.html'))
})

app.listen(PORT, () =>{
    console.log("Server is running on localhost:" + PORT);
})
