import express from "express"
import "dotenv/config"
import path from "path"
import exp from "constants"


const app = express()
const PORT = process.env.PORT
const _dirname = path.resolve()
const names = [
    { name: "Zain" },
    { name: "Ali" },
    { name: "Raza" }
]

app.use(express.json())

app.get("/", (req, res) => {
    res.send(names)
})

app.post("/", (req, res) => {
    const name = req.body.name
    names.push({ name: name })
    res.send(names)
})

app.put("/", (req, res) => {
    const name = req.body.name
    const index = req.body.index
    names[index] = { name: name }
    res.send(names)
})

app.delete("/", (req, res) => {
    const name = req.body.name
    const index = req.body.index
    names.splice(index, 1)
    res.send(names)
})

app.listen(PORT, () => {
    console.log("Server is running on localhost:" + PORT);
})
