import mongoose from 'mongoose';

const connection = {};
async function dbConnect(){
    
    if(connection.isConnected){
        return;
    }
  

    const uri = process.env.MONGO_URI;
  
    const db = await mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        

    });

    connection.isConnected = db.connections[0].readyState;
    console.log("connection.isConnected",connection.isConnected);
    
}



export default dbConnect;