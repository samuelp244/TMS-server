import mongoose from "mongoose";

const tickets = new mongoose.Schema(
    {
        organizationName:{type: String, required: true},
        category:{type: String, required: true},
        username:{type: String, required: true},
        query:{type: String, required: true},
        publishedAt:{type: String, required: true},
        status:{type: String, required: true},
    },
    {collection:'tickets'}
)

const model = mongoose.model('ticketsData',tickets)

export default model