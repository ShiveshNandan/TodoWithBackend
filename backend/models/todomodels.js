const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    completed : {
        type : String,
        require : true
    },
    newTitle : {
        type:String,
        require : true
    },
    newDescription : {
        type:String,
        require : true
    },
    time:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('ToDo' , todoSchema)