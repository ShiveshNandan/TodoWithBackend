import { useEffect, useState } from "react";
import check from './images/check.png';
import del from './images/delete.png';
import reuse from './images/reuse.png';
import './App.css';
import { addToDo, complete, deleted, getAllToDo, reverse } from "./utils/HandleApi";



const App = (props) => {
  const [isCompleted, setisCompleted] = useState(true);
  const [allTodos, setallTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");


  useEffect(() => {
    getAllToDo(setallTodos);
  }, [])


  return (
    <div className={`shadow-inner flex mt-20 mb-3 mx-auto flex-col text-center rounded-3xl ${ props.prop === false && "bg-[#c4c4c4]"} ${ props.prop === true && "bg-[#2d2d2d]"} w-6/12  max-[970px]:w-10/12 max-[590px]:w-11/12`}>
      <h1 className={`${ props.prop === false && "text-[#2d2d2d]"} ${ props.prop === true && "text-white"}  tracking-wide text-4xl m-6 font-bold mt-[3vw] mb-4`}>My To-Do list</h1>



      {/* ================================= adding bar ===================================== */}
      <div className="shadow-select flex bg-blue-500  pt-1 pb-3">
        <div className="flex justify-around max-[550px]:flex-col p-3 w-full">
          <div className=" max-[550px]:w-full w-5/12">
            <label className="block px-2 text-lg font-medium py-2 tracking-wide text-white text-left" >Title </label>
            <input type="text" className="rounded-md px-4 py-2 w-full outline-0 italic outline " value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder="what I have to do..." />
          </div>
          <div className="max-[550px]:w-full w-5/12">
            <label className="block px-2 py-2 text-lg font-medium tracking-wide text-white text-left" >Description<span className="text-xs italic"> (optional)</span> </label>
            <input type="text" className="rounded-md px-4 py-2 w-full outline-0 italic outline" value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder="A small brief..." />
          </div>
          <div className="todo-input-items">
            <button type="button" className="block mx-auto bg-blue-800 text-blue-100 hover:bg-blue-900 outline-1 hover:outline font-semibold py-1 px-4 self-center items-center text-lg align-middle justify-center mt-11 rounded-md max-[550px]:w-8/12" onClick={() => {addToDo("false",newTitle,setnewTitle,newDescription,setnewDescription, setallTodos)}}>Add</button>
          </div>
        </div>
      </div>


      {/* ========================== todo and completed todo buttons ========================== */}
      <div className="shadow mt-10 w-fit mx-auto">
        <button className={`mt-2 px-10 font-semibold tracking-wide border-none rounded-l-md bg-blue-100 hover:bg-blue-300 py-2 ${isCompleted === true && 'hover:bg-blue-800 text-blue-100 active'} `} onClick={async () => setisCompleted(true)} >ToDo</button>
        <button className={`mt-2 px-10 font-semibold tracking-wide border-none rounded-r-md bg-blue-100 hover:bg-blue-300 py-2 ${isCompleted === false && 'hover:bg-blue-800 text-blue-100 active'} `} onClick={async () => setisCompleted(false)} >Completed</button>
      </div>



      {/* ========================= todo list ============================ */}

      <div className="todo mt-7 overflow-hidden h-[23rem] overflow-y-scroll mb-6 ">


        {isCompleted && allTodos.map((item, index) => {
          return (
            <div className={`${item.completed === "true" && "hidden"} ${ props.prop === false && "bg-white"} ${ props.prop === true && "bg-[#1d1d1d]"} shadow flex flex-row justify-between text-left py-2 px-4 w-11/12 my-5 rounded-lg text-white mx-auto`} key={index}>
              <div className="para">
                <h1 className={`${ props.prop === true && "text-blue-400"} ${ props.prop === false && "text-blue-700 "} m-0 pt-2 pl-3 font-bold text-2xl`}>
                  {item.newTitle}</h1>
                <p className={`${ props.prop === true && "text-white"} ${ props.prop === false && "text-[#1d1d1d]"} px-7 italic py-3`}>{item.newDescription}</p>
                <p className={`${ props.prop === true && "text-[#79b5ff]"} ${ props.prop === false && "text-blue-600 "} text-xs`}>{item.time}</p>
              </div>
              <div className="flex items-center ">
                <div className="grayscale-[70%] hover:saturate-[10] m-3 w-8 h-8" onClick={async () => {complete(item._id,"true",setallTodos) }} > <img src={check} alt="" srcSet="" className="w-8 h-8" />
                 </div>
              </div>
            </div>
          )
        })}

{/* ======================= completed list hai yeah ========================= */}

        {!isCompleted && allTodos.map((item, index) => {
          return (
            <div className={`${item.completed === "false" && "hidden"} ${ props.prop === false && "bg-white"} ${ props.prop === true && "bg-[#1d1d1d]"} shadow flex flex-row justify-between text-left py-2 px-4 w-11/12 my-5 rounded-lg text-white mx-auto`} key={index}>
              <div className="para">
                <h1 className={`${ props.prop === true && "text-blue-400"} ${ props.prop === false && "text-blue-700 "} m-0 pt-2 pl-3 font-bold text-2xl`}>{item.newTitle}</h1>
                <p  className={`${ props.prop === true && "text-white"} ${ props.prop === false && "text-[#1d1d1d]"} px-7 italic py-3`}>{item.newDescription}</p>
                <p className={`${ props.prop === true && "text-green-300"} ${ props.prop === false && "text-green-700 "} text-xs`}>{item.completedOn}</p>
              </div>
              <div className="flex items-center">
                <div className="grayscale-[70%] hover:saturate-[4] m-3 w-8 h-8" onClick={async () => {await reverse(item._id,"false",setallTodos)}}><img src={reuse} alt="" srcSet="" className="w-8 h-8" /></div>
                <div className="grayscale-[70%] hover:saturate-[10] m-3 w-8 h-8" onClick={async () => {deleted(item._id,setallTodos)}}><img src={del} alt="" srcSet="" className="w-8 h-8" /></div>
              </div>
            </div>
          )
        })}


      </div>
    </div>
  );
}

export default App;
