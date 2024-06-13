import mongoose from "mongoose"

const namesSchema = new mongoose.Schema({
    name: {type:String, required : true}
})

const nameModel = mongoose.Model("name", namesSchema)

export default nameModel