import React, { useState } from 'react';
import Slider from './Slider'
import SideBarItem from './SideBarItem';
import "./Edit.css";
import {Link} from "react-router-dom";
import JSZip from "jszip";
import {saveAs} from "file-saver";
import 'bootstrap/dist/css/bootstrap.min.css';
const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  } 
  
]

function Edit(props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [src]=useState(props.location.state.Sources);
  const selectedOption = options[selectedOptionIndex];
  const [arr]=useState([]);
  const [changed,setchanged]=useState(false);
  
  function handleSliderChange({ target }) {
      setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }
  

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }
  function removeHeaderBase64(base64) {
    return base64.substr(base64.indexOf(";base64,") + ";base64,".length)
  }
  function downloadAll(urls) 
  {    
    let zip=new JSZip();
    var img=zip.folder("Images");
    let count=0;
    for (var i = 0; i < urls.length; i++)
    {
      img.file(count+'.jpeg',removeHeaderBase64(urls[i]),{base64:true});
      count++;
    };
     zip.generateAsync({type:"blob"}).then(function(content) {
      saveAs(content, "Images.zip");   
  });
  // window.location.reload()
  document.getElementById('go_to_download').click()
  }
  function styleimage(index,source,style)
  {
    var canvas=document.getElementById(source);
    var ctx = canvas.getContext('2d');
    const obj= style()
    ctx.filter =obj.filter
    var img = document.getElementById(index);
    ctx.drawImage(img,0,0,700,700);
    const obj1=canvas.toDataURL('image/jpeg');
    arr.push(obj1);
  }
  return (
    <div className="container_Edit">
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SideBarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          )
        })}
        </div>
        <div className="slider">
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      <Link to="/Downloaded"><button id="go_to_download">Click me </button></Link>
      <div className="text-center">
      <button className="btn btn-primary btn-lg" onClick= {
       async  (e)=>{
          await setchanged(true)
          downloadAll(arr)}
        }>Download Photos </button>
        </div>
     </div>
      <div className="Photos">{
        src.map((source,index)=>{
            
            return  (<div>
              {changed && styleimage(index, source,getImageStyle)}
              
              <img src={source} alt="EditImage" className="img" style={getImageStyle()}
              id={index} />
              <canvas id={source} className="canvasObject" height="700px" width="700px"></canvas>
              
            </div>
            );
            
              })
                }
      </div>
    </div>
  )
}

export default Edit;
