import React,{useState} from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import "./FrontPage.css";
//Some important things,every image is getting cropped by same dimensions due to the reason is due to the  use of a single variable crop for all the images
export default function FrontPage()
{
    
    const [src,setsrc]=useState([]);
    const [added,setAdded]=useState(false);
    const [crop,setcrop]=useState({aspect:16/9});
    const [image,setimage]=useState([]);
    function handleClick(obj)
    {  
        Object.keys(obj).map((key)=>{
        setsrc(
            (prevvalue)=>{

            return [...prevvalue,URL.createObjectURL(obj[key])];
            })
        }
        );     
        setAdded(true);
    }
   
return (
    <div> 
        <input type="file" multiple name="images" accept="image/*" id="img" onChange={e=>handleClick(e.target.files)}></input>
        <div >
            {added===true&&(
                src.map((source)=>{              
                return   <ReactCrop src={source} crop={crop} onChange={setcrop} className="img"
                    onImageLoaded={setimage(
                        (prevvalue)=>{
                        return [...prevvalue]
                    }
                    )}
                />
                }
            ))} 
        </div>
    </div>
   
);
}