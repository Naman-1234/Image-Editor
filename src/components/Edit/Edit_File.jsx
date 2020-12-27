import React, { useState } from 'react';
import Slider from './Slider'
import SideBarItem from './SideBarItem';
import "./Edit.css";
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
  const [src,setsrc]=useState(props.Sources);
  const selectedOption = options[selectedOptionIndex];
  const [arr,setarr]=useState([]);
  
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
  function downloadAll(urls) {
    var link = document.createElement('a');
  
    link.setAttribute('download', 'Updated-Image');
    link.style.display = 'none';
  
    document.body.appendChild(link);
  
    for (var i = 0; i < urls.length; i++) {
      link.setAttribute('href', urls[i]);
      link.click();
    }
  
    document.body.removeChild(link);
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
      <button onClick={e=>{downloadAll(src)}}>Download Photos </button>
     </div>
      <div>{
        src.map((source)=>{
                return <img src={source} alt="EditImage" className="img" style={getImageStyle()}/>
              })
                }
      </div>
    </div>
  )
}

export default Edit;
