import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";


window.React = React;
window.ReactDOM = ReactDOM;
window.App = App;
