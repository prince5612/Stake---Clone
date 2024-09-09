const mongoose = require('mongoose')

const connectToMongo =async() =>{
    await mongoose.connect(`${process.env.URI}`);
    console.log("connected to db");
}
connectToMongo();
