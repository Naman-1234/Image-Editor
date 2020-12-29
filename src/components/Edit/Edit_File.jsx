import React, { useState } from 'react';
import Slider from './Slider'
import SideBarItem from './SideBarItem';
import "./Edit.css";
import {Link} from "react-router-dom";
import JSZip from "jszip";
import {saveAs} from "file-saver";
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
  // const [src,setsrc]=useState(props.Sources);
  const [src,setsrc]=useState(props.location.state.Sources);
  console.log(props.location.state.Sources);
  const selectedOption = options[selectedOptionIndex];
  const [arr,setarr]=useState([]);
  const [changed,setchanged]=useState(false);
  
  function handleSliderChange({ target }) {
      setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  //   src.map((source)=>{
  //      arr.push(<img src={source} alt="EditImage" className="img" style={getImageStyle()}/>)
  //       })
  //  setarr([])
    
  }
  <Link to="/Downloaded"><button id="go_to_download">Click me </button></Link>

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
    // var link = document.createElement('a');
  
    // link.setAttribute('download', 'Updated-Image');
    // link.style.display = 'none';
  
    // document.body.appendChild(link);
  
    // for (var i = 0; i < urls.length/2; i++) {
    //   link.setAttribute('href', urls[i]);
    //   link.click();
    // }
  
    // document.body.removeChild(link);
    
    let zip=new JSZip();
    var img=zip.folder("Images");
    let count=0;
    for (var i = 0; i < urls.length/2; i++)
    {
      img.file(count+'.jpeg',removeHeaderBase64(urls[i]),{base64:true});
      count++;
    };
     zip.generateAsync({type:"blob"}).then(function(content) {
      saveAs(content, "Images.zip");

    // document.getElementById('go_to_download').click();
   
  });

  }
  function styleimage(index,source,style)
  {
    var canvas=document.getElementById(source);
    var ctx = canvas.getContext('2d');
    const obj= style()
    ctx.filter =obj.filter
    var img = document.getElementById(index);
    ctx.drawImage(img,0,0, canvas.height,canvas.width);
    const obj1=canvas.toDataURL('image/jpeg');
    arr.push(obj1);
  }
  return (
    <div className="container">
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
      <button onClick={e=>{downloadAll(arr)}}>Download Photos </button>
      <button onClick={()=>{setchanged(true)}}>CChanged</button>
     </div>
      <div>{
        src.map((source,index)=>{
            
            return  (<div>
              {changed && styleimage(index, source,getImageStyle)}
              
              <img src={source} alt="EditImage" className="img" style={getImageStyle()}
              id={index} />
              <canvas id={source} className="canvasObject" height="300px" width="300px"></canvas>
              
            </div>
            );
            
              })
                }
      </div>
    </div>
  )
}

export default Edit;