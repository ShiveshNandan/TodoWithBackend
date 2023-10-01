import axios from "axios";

const baseURL = "https://todo-with-backend-tau.vercel.app"

const getAllToDo = async (setToDo) => {
    axios
    .get(baseURL)
    .then(({data}) => {
        setToDo(data);
    })
}

const addToDo = async (completed, newTitle,setnewTitle,newDescription,setnewDescription, setToDo) => {
    axios
    .post(`${baseURL}/save`, {completed, newTitle , newDescription} )
    .then((data) => {
        setnewTitle("")
        setnewDescription("")
        getAllToDo(setToDo);
    })
}


const complete = async (id,completed,setToDo) => {
    axios
    .post(`${baseURL}/update`, {_id : id,completed} )
    .then((data) => {
        getAllToDo(setToDo);
    })
}

const reverse = async (id,completed,setToDo) => {
    axios
    .post(`${baseURL}/update`, {_id : id,completed} )
    .then((data) => {
        getAllToDo(setToDo);
    })
}

const deleted = async (id,setToDo) => {
    axios
    .post(`${baseURL}/delete`, {_id : id} )
    .then((data) => {
        getAllToDo(setToDo);
    })
}




export {getAllToDo,addToDo,complete,reverse,deleted}