const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected To Database');
        
    } catch (error) {
        console.log(`error in connection DB${error}`);
        
    };
};

module.exports = connectDB;