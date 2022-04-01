import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    type:{
        type:String,
        required:[true,'Please add a type'],
        maxlength:[20,'Type cannot be more than 40 characters']
    },
    title:{
        type:String,
        required:[true,'Please add a title'],
        // unique:true,
        trim:true,
        maxlength:[40,'Title cannot be more than 40 characters']
    },
    amount:{
        type:Number,
        required:true,
        maxlength:[20,'Amount cannot be more than 40 characters'],
    },
    date: { type: Date, default: Date.now }
   
})

module.exports = mongoose.models.ExpenseModel || mongoose.model('ExpenseModel',ExpenseSchema)