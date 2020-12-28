import React,{useState} from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import "./FrontPage.css";
import Edit from "../Edit/Edit_File";
//Some important things,every image is getting cropped by same dimensions due to the reason is due to the  use of a single variable crop for all the images
export default function FrontPage()
{

    const [src,setsrc]=useState([]);
    const [added,setAdded]=useState(false);
    function handleClick(obj)
    {
        Object.keys(obj).map((key)=>{
        setsrc(
            (prevvalue)=>{

            return [...prevvalue,URL.createObjectURL(obj[key])];
            })
        }
        );
        console.log(obj);
        setAdded(true);
    }

return (
    <div className="frontpage">
      
       {added===false && <div className="inputField">
            <h1> Image-Editor</h1>
        <input type="file" multiple name="images" accept="image/*" id="img" onChange={e=>handleClick(e.target.files)} ></input>
        <label for="img">Select Files</label>
        </div>
        }


        {/* <div >
        {added===true&&(
                src.map((source)=>{
                return  <img src={source} alt="EditImage" className="img"/>
                }
            ))}
        </div> */}
        <div className="edit">
            {added && <Edit Sources={src}/>}
        </div>

    </div>

);
}
