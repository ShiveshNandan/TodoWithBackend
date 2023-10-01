// import react from "react";
import { useEffect, useState } from "react";
import check from './images/check.png';
import del from './images/delete.png';
import reuse from './images/reuse.png';
import './App.css';

function App(props) {
  const [isCompleted, setisCompleted] = useState(true);
  const [allTodos, setallTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [completedList, setcompletedList] = useState([]);
  console.log(props.prop);

  //====================================add kiya hai================================================

  const addToDo = () => {
    let time = new Date();
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let AddedOn = "Added on: " + date + "/" + month + "/" + year + "   " + hour + ":" + min + ":" + sec + " " + ampm;

    let newTodo = {
      tittle: newTitle,
      description: newDescription,
      AddedOn: AddedOn
    }
    let title = newTodo.tittle.trim();

    if (title !== "") {
      let update = [...allTodos];
      update.push(newTodo);
      setallTodos(update);
      localStorage.setItem('todolist', JSON.stringify(update));
    }
    setisCompleted(true);
  }
//======================================= reverse function ==============================================

  const reverse = (index) => {
    let time = new Date();
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let AddedOn = "Added on: " + date + "/" + month + "/" + year + "   " + hour + ":" + min + ":" + sec + " " + ampm;

    let newTodo = {
      ...completedList[index],
      AddedOn: AddedOn
    }
    console.log(newTodo);

      let update = [...allTodos];
      update.push(newTodo);
      setallTodos(update);
      localStorage.setItem('todolist', JSON.stringify(update));
      let reduce = [...completedList];
      reduce.splice(index, 1);

      localStorage.setItem('completed', JSON.stringify(reduce));
      setcompletedList(reduce);
  }


  useEffect(() => {
    let savedtodo = JSON.parse(localStorage.getItem('todolist'));
    let savedcompleted = JSON.parse(localStorage.getItem('completed'));
    if (savedtodo) {
      setallTodos(savedtodo);
    }
    if (savedcompleted) {
      setcompletedList(savedcompleted);
    }
  }, [])

  //  ========================check final delete function========================================= 

  const checkdelete = (index) =>{
    if (window.confirm("You really want to delete?") === true) {
      cdelete(index);
  } else {
      console.log("bach gya bsdk");
  }
  }

  //============================== deleting function============================================

  const tdelete = (index) => {
    let reduce = [...allTodos];
    reduce.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reduce));
    setallTodos(reduce);
  }


  // =========================completed function jo completed m le jayega usse=================


  const tcheck = (index) => {
    let time = new Date();
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let completedOn = "Completed on: " + date + "/" + month + "/" + year + "   " + hour + ":" + min + ":" + sec + " " + ampm;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedComplete = [...completedList];
    updatedComplete.push(filteredItem);
    setcompletedList(updatedComplete);
    tdelete(index);
    localStorage.setItem('completed', JSON.stringify(updatedComplete));
  }
  const cdelete = (index) => {
    let reduce = [...completedList];
    reduce.splice(index, 1);

    localStorage.setItem('completed', JSON.stringify(reduce));
    setcompletedList(reduce);
  }




  return (
    <div className={`shadow-inner flex mt-20 mb-3 mx-auto flex-col text-center rounded-3xl ${ props.prop === false && "bg-[#c4c4c4]"} ${ props.prop === true && "bg-[#2d2d2d]"} w-6/12  max-[970px]:w-10/12 max-[590px]:w-11/12`}>
      <h1 className={`${ props.prop === false && "text-[#2d2d2d]"} ${ props.prop === true && "text-white"}  tracking-wide text-4xl m-6 font-bold mt-[3vw] mb-4`}>My ToDos</h1>



      {/* ================================= adding bar ===================================== */}
      <div className="shadow-select flex bg-blue-500  pt-1 pb-3">
        <div className="flex justify-around max-[500px]:flex-col p-3 w-full">
          <div className=" max-[500px]:w-full w-5/12">
            <label className="block px-2 font-medium py-2 tracking-wide text-white text-left" >Title </label>
            <input type="text" className="rounded-md px-4 py-2 w-full outline-0  outline " value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder="title?" />
          </div>
          <div className="max-[500px]:w-full w-5/12">
            <label className="block px-2 py-2 font-medium tracking-wide text-white text-left" >Description </label>
            <input type="text" className="rounded-md px-4 py-2 w-full outline-0  outline" value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder="description?" />
          </div>
          <div className="todo-input-items">
            <button type="button" className="block mx-auto bg-blue-800 text-blue-100 hover:bg-blue-900 outline-1 hover:outline font-semibold py-1 px-4 self-center items-center align-middle justify-center mt-11 rounded-md max-[500px]:w-8/12 " onClick={addToDo}>Add</button>
          </div>
        </div>
      </div>


      {/* ========================== todo and completed todo buttons ========================== */}
      <div className="shadow mt-10 w-fit mx-auto">
        <button className={`mt-2 px-10 font-semibold tracking-wide border-none rounded-l-md bg-blue-100 hover:bg-blue-300 py-2 ${isCompleted === true && 'hover:bg-blue-800 text-blue-100 active'} `} onClick={() => setisCompleted(true)} >ToDo</button>
        <button className={`mt-2 px-10 font-semibold tracking-wide border-none rounded-r-md bg-blue-100 hover:bg-blue-300 py-2 ${isCompleted === false && 'hover:bg-blue-800 text-blue-100 active'} `} onClick={() => setisCompleted(false)} >Completed</button>
      </div>



      {/* ========================= todo list ============================ */}

      <div className="todo mt-7 overflow-hidden h-[23rem] overflow-y-scroll mb-6 ">


        {isCompleted && allTodos.map((item, index) => {
          return (
            <div className={`${ props.prop === false && "bg-white"} ${ props.prop === true && "bg-[#1d1d1d]"} shadow flex flex-row justify-between text-left py-2 px-4 w-11/12 my-5 rounded-lg text-white mx-auto`} key={index}>
              <div className="para">
                <h1 className={`${ props.prop === true && "text-blue-400"} ${ props.prop === false && "text-blue-700 "} m-0 pt-2 pl-3 font-bold text-2xl`}>
                  {item.tittle}</h1>
                <p className={`${ props.prop === true && "text-white"} ${ props.prop === false && "text-[#1d1d1d]"} px-7 italic py-3`}>{item.description}</p>
                <p className={`${ props.prop === true && "text-[#79b5ff]"} ${ props.prop === false && "text-blue-600 "} text-xs`}>{item.AddedOn}</p>
              </div>
              <div className="flex items-center">
                <div className="grayscale-[70%] hover:saturate-[10] m-3 w-8 h-8" onClick={() => tcheck(index)}> <img src={check} alt="" srcset="" className="w-8 h-8" /> </div>
              </div>
            </div>
          )
        })}

{/* ======================= completed list hai yeah ========================= */}

        {!isCompleted && completedList.map((item, index) => {
          return (
            <div className={`${ props.prop === false && "bg-white"} ${ props.prop === true && "bg-[#1d1d1d]"} shadow flex flex-row justify-between text-left py-2 px-4 w-11/12 my-5 rounded-lg text-white mx-auto`} key={index}>
              <div className="para">
                <h1 className={`${ props.prop === true && "text-blue-400"} ${ props.prop === false && "text-blue-700 "} m-0 pt-2 pl-3 font-bold text-2xl`}>{item.tittle}</h1>
                <p  className={`${ props.prop === true && "text-white"} ${ props.prop === false && "text-[#1d1d1d]"} px-7 italic py-3`}>{item.description}</p>
                <p className={`${ props.prop === true && "text-green-300"} ${ props.prop === false && "text-green-700 "} text-xs`}>{item.completedOn}</p>
              </div>
              <div className="flex items-center">
                <div className="grayscale-[70%] hover:saturate-[4] m-3 w-8 h-8" onClick={() => reverse(index)}><img src={reuse} alt="" srcset="" className="w-8 h-8" /></div>
                <div className="grayscale-[70%] hover:saturate-[10] m-3 w-8 h-8" onClick={() => checkdelete(index)}><img src={del} alt="" srcset="" className="w-8 h-8" /></div>
              </div>
            </div>
          )
        })}


      </div>
    </div>
  );
}

export default App;
