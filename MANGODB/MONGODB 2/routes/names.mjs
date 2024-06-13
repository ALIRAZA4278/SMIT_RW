import express from "express"
import Name from "../model/name.mjs"

const router = express.Router()


// get api
router.get("/", async (req, res) => {
    const names = await Name.find({})  //Name.find will bring all the data in database
    res.status(200).send(names)
})

// Post api
router.post("/", async (req, res) => {
    const name = req.body.name

    try {
        if (!name) {
            console.log("missing requied param");
            res.send("missing requied param")
        }
        else {
            await Name.create({
                name: name
            })
            const names = await Name.find({})
            res.send(names)
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})

// Delete api
router.delete("/", async (req, res) => {
    const id = req.body.id

    try {
        if (!id) {
            console.log("Missing Required Params");
            res.send("Missing Required Params")
        }

        else {
            await Name.findByIdAndDelete(id)
            const names = await Name.find({})
            res.send(names)
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})


// Put api \\
router.put("/", async (req, res) => {
    const id = req.body.id
    const name = req.body.name

    try {
        if (!id || !name) {
            console.log("Missing Required Params");
            res.send("Missing Required Params")
        }
        else {
            await Name.findByIdAndUpdate(id,
                { name: name },
                { new: true }
            )
            const names = await Name.find({})
            res.send(names)
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})

export default router