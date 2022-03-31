import dbConnect from "../../utils/dbConnect";

dbConnect();
export default async function handler(req,res){
    res.json({test:'test'});
}