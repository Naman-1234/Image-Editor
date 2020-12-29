import React,{useState} from "react";
import "./FrontPage.css";
import Edit from "../Edit/Edit_File";
import {Link} from "react-router-dom";
//Some important things,every image is getting cropped by same dimensions due to the reason is due to the  use of a single variable crop for all the images
export default function FrontPage()
{

    const [src,setsrc]=useState([]);
    // const [added,setAdded]=useState(false);
    function handleClick(obj)
    {
        Object.keys(obj).map((key)=>{
        setsrc(
            (prevvalue)=>{

            return [...prevvalue,URL.createObjectURL(obj[key])];
            })
        }
        );
        // setAdded(true);
    }

return (
    <div className="frontpage">
      
       {/* {added===false &&  */}
       <div className="inputField">
            <h1> Image-Editor</h1>
        <input type="file" multiple name="images" accept="image/*" id="img" onChange={e=>handleClick(e.target.files)} ></input>
        <label for="img">Select Files</label>
        </div>
        {/* } */}
        {/* <div className="edit">
            {added && <Edit Sources={src}/>}
        </div> */}
        <Link to={{pathname:'/Edit', state:{Sources:src}}}><button       
        >Edit Photos</button></Link>

    </div>

);
}
