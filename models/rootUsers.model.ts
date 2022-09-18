import mongoose from "mongoose";

const rootUsers = new mongoose.Schema(
    {
        organizationName:{type: String, required: true},
        username:{type: String, required: true},
        email:{type: String, required: true}
    },
    {collection:'rootUsers'}
) 

const model = mongoose.model('RootUsersData',rootUsers);

export default model