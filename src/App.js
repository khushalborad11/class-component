import React, { Component } from 'react';
import RouterContainer from './routercontainer';
import Dashboard from './dashboard.js';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Useref from "./useref";
export default class App extends Component {
  render() {
    return (
      <div>
        <RouterContainer />
        {/* <Useref /> */}
      </div>
    )
  }
}
