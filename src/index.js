import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from "react-router-dom";
import FrontPage from './components/FrontPage/FrontPage';
import Edit_File from "./components/Edit/Edit_File";
import Download from "./components/Greetings/AfterDownload.jsx"
ReactDOM.render(
  <Router >
  <React.StrictMode>
    <Route exact path="/" component={FrontPage}></Route>
    <Route exact path="/Edit" component={Edit_File}></Route>
    <Route exact path="/Downloaded" component={Download}></Route>
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
