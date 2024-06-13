import express from "express"
import names from "./routes/names.mjs"
// import "dotenv/config"

const PORT = process.env.PORT || 6400

app.use(express.json())
app.use("/", names)

app.listen(PORT, () => {
    console.log("Server is running on localhost:" + PORT);
})
