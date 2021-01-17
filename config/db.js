// this file will be used to connect our database.
const mongoose = require('mongoose');

//it always returns a promise when we try to connect to our database (asynchronous operation)
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (err){
        console.log(`Error ${err.message}`.red)
        //to close the app:
        process.exit(1);
    }
}

// always export it if we want be able to use it.
module.exports = connectDB;