const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const colors = require('colors')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB();

const transactions = require('./routes/transactions')

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(require('morgan')('dev'))    
}

//this allows us to use body-parser. 
app.use(express.json())
app.use(cors())
app.use('/api/transactions', transactions)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


