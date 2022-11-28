import mongoose from "mongoose";

const images = new mongoose.Schema(
    {
        username:{type: String, required: true},
        imageKey:{type: String, required: true},
        imageName:{type: String, required: true}
    },
    {collection:'images'}
) 

const model = mongoose.model('ImagesData',images);

export default model