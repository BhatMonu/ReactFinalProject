import React from 'react';
import { render } from 'react-dom';
import App from './App';
import "!style!css!bootstrap/dist/css/bootstrap.min.css";
//import "!style!css!bootstrap/dist/css/bootstrap.min.css";
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(<App />, document.getElementById('app'));

// // 1. Import React OM
// import React from 'react';
// // 2. Import ReactDOM for rendering React Component in DOM
// import ReactDom from "react-dom";
// import SimpleComponent from './components/simpleComponent.jsx';
// import ProductComponent from './components/productComponent.jsx';
// import ProductUIComponent from './components/productUIComponent.jsx'
// import "!style!css!bootstrap/dist/css/bootstrap.min.css";
// import ProductService from './services/service'

// ReactDom.render(<ProductUIComponent />, document.getElementById("app"));
// //ReactDom.render(<ProductComponent />, document.getElementById("app"));
// //ReactDom.render(<SimpleComponent  myname="ANU"/>, document.getElementById("app"));