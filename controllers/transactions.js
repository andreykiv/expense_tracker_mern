/* 
here we're going to have all the methods that interact with our database (GET, ADD, DELETE routes in our case)
import the model. Now we can use mongoose methods on Transaction (find, create, remove...). 
When we use a mongoose method it returns a promise.
*/

const Transaction = require('../models/Transaction')

// @desc Get all transactions
// @route GET/api/transacitons
// @access Public

exports.getTransactions = async (req, res, next)=> {
    try{
        const transactions = await Transaction.find()

        return res.status(200).json({
            //what we send back is up to us. 
            success: true,
            count: transactions.length,
            //the actual data that we send from our db.
            data: transactions
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next)=> {
    try{
        //in order to receive info from the user to the DB we need to access it from req.body.(id, amount, value...). In order to be able to access
        //to that req.body we need to install a package body-parser (inside server.js).
        
        const {text, amount} = req.body;

        const transaction = await Transaction.create(req.body)

        //when we create something and it's successfull status: 201
        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err){
        //if the erorr is because of the user's input: 
        if(err.name == 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next)=> {
   try{
    const transaction = await Transaction.findById(req.params.id)

    if(!transaction) {
        return res.status(404).json({
            success: false,
            error: 'No transaction found'
        })
    }

    //some methods of mongoose are called on the actual model (like Transaction in our case) and some others are called directly on the resource.
    await transaction.remove()

    return res.status(200).json({
        success: true,
        data: {}
    });

   } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
   }
}

// @desc modify transaction
// @route PATCH/api/transaction/:id
// @access public

exports.updateTransaction = async (req, res, next) => {
    try{
    const { text, amount } = req.body
    const transaction = await Transaction.findById(req.params.id);
    
    //if there is no transaction
    if(!transaction) {
        return res.status(404).json({
            success: false,
            message: 'Transaction not found'
        })
    }
    
   await transaction.updateOne(req.body)

    return res.status(200).json({
        success: true,
        message: 'Transaction Updated'
    })
    
    } catch (err) {
        if(err.name == 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }    
}
