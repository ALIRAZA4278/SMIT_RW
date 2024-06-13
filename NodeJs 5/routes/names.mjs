import express from "express"

const router = express.Router()

const names = [
    { name: "Zain" },
    { name: "Ali" },
    { name: "Raza" }
]

// get api
router.get("/", (req, res) => {
    let names_div = ""
    for (const name of names) {
        names_div = names_div + `<h1>${name.name}</h1>`

    }
    res.send(names_div)
})

// delete api
router.delete("/:id", (req, res) => {
    const id = req.params.id

    try {
        if (!id) {
            console.log("Missing Required Params");
            res.send("Missing Required Params")
        }

        if (!names[id - 1]) { // id -1 will be the index number
            console.log("Missing Item ");
            res.send("Missing Item")
        }
        else {
            names.splice((id - 1), 1) // this will delete the object at the index
            res.send(names)
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})

// post api
router.post("/", (req, res) => {
    const body = req.body

    try {
        if (names.some(object => object.name === body.name)) {
            console.log("Name is already in use");
            res.send("Name is already taken ")
        } else {
            names.push({ name: body.name })
            console.log(body.name);
            res.send("working")
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})

// put api
router.put("/:id", (req, res) => {
    const id = req.params.id
    const name = req.body.name

    try {
        if (!id || !name) {

            console.log("Missing Required Params");
            res.send("Missing Required Params")
        }

        if (!names[id - 1]) { // id -1 will be the index number
            console.log("Missing Item ");
            res.send("Missing Item")
        }
        else {
            names[id - 1] = { names: `${name}` }  // this will delete the object at the index
            res.send(names)
        }

    } catch (error) {
        console.log({ "Error": error.message, "status": 500 });
        res.status(500).send(error.message)
    }
})


export default router