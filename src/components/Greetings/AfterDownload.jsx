import React from 'react'
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AfterDownload.css";
function AfterDownload() {
    return (
        <div className="page">
        <div className="containers2">
        
        <div className="afterDownloadDiv">
            <h1> Thank you for using our service</h1>
        </div>
        <Link to="/" ><button className="btn btn-primary">Go to Home</button></Link>
        </div>
        </div>
    )
}

export default AfterDownload
