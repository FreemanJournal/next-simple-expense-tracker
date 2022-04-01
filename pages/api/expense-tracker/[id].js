import dbConnect from "../../../utils/dbConnect";
import ExpenseModel from "../../../models/ExpenseModel"
dbConnect();
export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
            try {
                const transaction = await ExpenseModel.findById(id)
                if (!transaction) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: transaction })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'PUT':
            try {
                const transaction = await ExpenseModel.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!transaction) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: transaction })

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
                
        case 'DELETE':
            try {
                const deletedTransaction = await ExpenseModel.deleteOne({_id:id})
                if(!deletedTransaction){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:{}})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default: 
             res.status(400).json({ success: false })
             break;
    }
}