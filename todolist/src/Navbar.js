// import react from "react";
import { useState } from "react";
import logo from "./images/notebook.png";
import App from "./App.js";
import './App.css';

function Navbar() {
    const [Day, setDay] = useState(true);
    const day =() =>{
        if (Day === true) {
            setDay(false);
            document.body.style.backgroundColor = "white";
        }else{
            setDay(true);
            document.body.style.backgroundColor = "#1c1c1c";
        }
        
        // console.log(Day);
    }
    return (
        <>
            <div className=" w-full gradient flex-wrap flex flex-row justify-between top-0 ">

                <div className="flex flex-wrap ml-20 content-center"><img src={logo} alt="" srcSet="" className="w-10 h-10 mt-5  mb-5" />
                    <p className="text-white italic my-auto mx-5 font-bold text-2xl ">My-Notes</p></div>
                <div className="mr-[10vw] my-auto  text-4xl font-bold ">
                    <label className="switch ">
                        <input type="checkbox" onClick={day}/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <App prop={Day} />
        </>
    );
}

export default Navbar;
