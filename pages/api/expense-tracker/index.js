import dbConnect from "../../../utils/dbConnect";
import ExpenseModel from "../../../models/ExpenseModel"
dbConnect();
export default async function handler(req,res){
    const {method} = req;

    switch(method){
        case 'GET':
            try{
                const transactions = await ExpenseModel.find({})
                res.status(200).json({success:true,data:transactions})
            }catch(error){
                res.status(400).json({success:false});
            }
            break;
        case 'POST':
            try {
                const transaction = await ExpenseModel.create(req.body);
                res.status(201).json({success:true,data:transaction})
            } catch (error) {
                res.status(400).json({success:false});
            }
            break;
        default:
            res.status(400).json({success:false});
            break;

    }
}