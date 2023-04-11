import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bills from "./Bills";
import Dashboard from "./dashboard";
import First from './first';
import CreateBills from "./CreateBills.js";




export default function RouterContainer(params) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/first" element={<First />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/bills' element={<Bills />}></Route>
                <Route path="/createbills" element={<CreateBills />}></Route>
            </Routes>
        </BrowserRouter>
    )

}