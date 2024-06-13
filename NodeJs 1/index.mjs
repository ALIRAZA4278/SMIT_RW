import express from "express"

const app = express()
const PORT = 6400

app.use(express.static("public"))  // ya sirf index ki file ko main manta
// app.use(express.static("public", {index : "inde.html"}))  // ab ya change ho sakta index sa

app.get("/", (req, res)=>{
    res.status(200).send({
        name: "coding verse",
        id: "123456", 
        status: "Working"
    })
})

app.listen(PORT, () =>{
    console.log("Server is running on localhost:" + PORT);
})
