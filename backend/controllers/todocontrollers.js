const todomodels = require("../models/todomodels")
const ToDOModels = require("../models/todomodels")

module.exports.getToDo = async (req,res) => {
    const ToDo = await ToDOModels.find()
    res.send(ToDo)
}


module.exports.saveToDo = async (req,res) => {
    let times = new Date();
    let date = times.getDate();
    let month = times.getMonth() + 1;
    let year = times.getFullYear();
    let hour = times.getHours();
    let min = times.getMinutes();
    let sec = times.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let time = "Added on: " + date + "/" + month + "/" + year + "   " + hour + ":" + min + ":" + sec + " " + ampm;

    const  {completed, newTitle, newDescription}  = req.body
    let title = newTitle.trim();

    if (title === "") {
        console.log("first")
    } else {
    ToDOModels
    .create({completed, newTitle, newDescription, time})
    .then((data) => {
        console.log("added successfully");
        console.log(data);
        res.send(data);
    })
    .catch((err) => console.log(err))
    }      
}

module.exports.complete = async (req,res) => {

    const {_id,completed} = req.body;

    ToDOModels
    .findByIdAndUpdate(_id,{completed})
    .then(() => {res.send("successfull")})    
}


module.exports.deleted = async (req,res) => {

    const {_id} = req.body;

    ToDOModels
    .findByIdAndDelete(_id)
    .then(() => {res.send("deleted")})    
}

