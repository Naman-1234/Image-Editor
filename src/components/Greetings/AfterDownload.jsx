import { Button } from '@material-ui/core';
import React from 'react'
import {Link} from "react-router-dom";
function AfterDownload() {
    return (
        <div>
            <h1> Thank you for downloading</h1>
            <Link to="/" ><button>Go to Home</button></Link>
        </div>
    )
}

export default AfterDownload
