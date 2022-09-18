import mongoose from 'mongoose';

const Employees = new mongoose.Schema(
    {
        username:{type: String, required: true},
        organizationName:{type: String, required: true},
        email:{type: String, required: true},
        assignedDomain:{type: String, required: true},
        assignedTickets:{type: String}
    },
    {collection:'employees'}
)

const model = mongoose.model('EmployeesData',Employees);

export default model