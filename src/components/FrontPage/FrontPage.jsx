import React,{useState} from "react";
import "./FrontPage.css";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//Some important things,every image is getting cropped by same dimensions due to the reason is due to the  use of a single variable crop for all the images
export default function FrontPage()
{

    const [src,setsrc]=useState([]);
    const handleClick = (obj) =>
    {
        Object.keys(obj).map((key)=>{
        setsrc(
            (prevvalue)=>{

            return [...prevvalue,URL.createObjectURL(obj[key])];
            })

            return ""
        }
        
        );
       
    }

return (
    <div className="frontpage">
      
     <div className="containers">
       <div className="inputField">
       <div id="form">
            <h1> Image-Editor</h1>
            <div className="text-center">
        <input type="file" multiple name="images" accept="image/*" id="img" onChange={e=>handleClick(e.target.files)} placeholder="Select Images" required></input><br></br>
        </div>
        <Link to={{pathname:'/Edit', state:{Sources:src}}}><button className="btn btn-primary  btn-large">Edit Photos</button></Link>
           </div>
           </div>
        <div className="img-div">
        <img src='Images/undraw_edit_photo_2m6o.svg' alt="Right-Background" id="img-fluid"></img>
        </div>
        </div>

    </div>

);
}