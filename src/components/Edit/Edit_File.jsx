import React, { useState } from "react";
import Slider from "./Slider";
import SideBarItem from "./SideBarItem";
import "./Edit.css";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import DEFAULT_OPTIONS from "../../data/DEFAULT_OPTIONS.json";

function Edit(props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [src] = useState(props.location.state.Sources);
  const selectedOption = options[selectedOptionIndex];
  const [editedImages] = useState([]);
  const [changed, setchanged] = useState(false);

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  function getImageStyle() {
    //This will give all the details, Means all the current values of DEFAULT_OPTIONS 
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }
  function removeHeaderBase64(base64) {
    //Extracting useful information from string
    return base64.substr(base64.indexOf(";base64,") + ";base64,".length);
  }
  function downloadAllFiles(urls) {
    //Using jsZip Folder to make zip
    let zip = new JSZip();
    var img = zip.folder("Images");
    let countImages = 0;
    for (var i = 0; i < urls.length; i++) {
      img.file(countImages + ".jpeg", removeHeaderBase64(urls[i]), { base64: true });
      countImages++;
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "Images.zip");
    }).catch((err)=>{
      console.error(err);
    });
    // window.location.reload()
    document.getElementById("go_to_download").click();
  }
  function styleimage(index, source, style) {
    //Applying style to images by using canvas 
    var canvas = document.getElementById(source);
    var ctx = canvas.getContext("2d");
    const styleObject = style();
    ctx.filter = styleObject.filter;
    var img = document.getElementById(index);
    ctx.drawImage(img, 0, 0, 700, 700);
    const obj1 = canvas.toDataURL("image/jpeg");
    editedImages.push(obj1);
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
          );
        })}
      </div>
      <div className="slider">
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
        <Link to="/Downloaded">
          <button id="go_to_download">Click me </button>
        </Link>
        <div className="text-center">
          <button
            className="downloadButton btn-primary btn-lg"
            onClick={async (e) => {
              await setchanged(true);
              downloadAllFiles(editedImages);
            }}
          >
            Download Photos{" "}
          </button>
        </div>
      </div>
      <div className="Photos">
        {src.map((source, index) => {
          return (
            <div>
              {changed && styleimage(index, source, getImageStyle)}

              <img
                src={source}
                alt="EditImage"
                className="img"
                style={getImageStyle()}
                id={index}
              />
              <canvas
                id={source}
                className="canvasObject"
                height="700px"
                width="700px"
              ></canvas>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Edit;
