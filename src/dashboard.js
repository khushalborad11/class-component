import React from "react"
import Log from "./logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';

export default function Dashboard(props) {
    return (
        <div>
            <div className="header row">
                <div className="col-lg-9"> <img className='logo' src={Log} /></div>
                <div className="col-lg-3 header-icon row">
                    <i class=" col-lg-3 bi bi-person-circle"></i>
                    <input type='email' name='email' className="col-lg-9"></input>
                </div>


            </div>
            {props.children}
            <Sidebar />
        </div>
    )

}