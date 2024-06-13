import mongoose from "mongoose"

const namesSchema = new mongoose.Schema({
    name: {type:String, required : true}
})

const nameModel = mongoose.model("name", namesSchema)

export default nameModel