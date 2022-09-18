import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username:{type: String, required: true},
        role:{type: String, required: true},
        email:{type: String, required: true},
        password:{type: String, required: true}
    },
    {collection:'users'}
)
const model = mongoose.model('UserData',User);

export default model
