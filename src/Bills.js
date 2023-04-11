import React, { useEffect } from 'react';
import Dashboard from './dashboard';
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let data = []

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});

export default function Bills() {
    const navigation = useNavigate()
    const [responsive, setResponsive] = useState("vertical");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [newdata, setdata] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [otherdata, setotherdata] = useState([])
    const [newcurrentData, setcurrentData] = useState([])


    let data = []
    useEffect(() => {
        data = JSON.parse(localStorage.getItem('billdata'));
        setdata(data)
    })


    const editclick = (id) => {
        localStorage.setItem('id', id)

        navigation('/createbills')
    }
    const removeclick = (id) => {


        const afterDelData = data.filter((item) => item.id !== id);

        setdata(afterDelData)
        localStorage.setItem('billdata', JSON.stringify(afterDelData))
        console.log(afterDelData)
    }
    const viewclick = (id) => {
        let otherdata = []
        let currentData = []
        if (localStorage.getItem('billdata')) {

            otherdata = JSON.parse(localStorage.getItem('billdata'))
        }


        console.log('otherdata ::', otherdata, id)
        for (let i = 0; i < otherdata.length; i++) {

            if (otherdata[i].id == id) {
                currentData = otherdata[i]
            }
        }

        console.log('current data :: ', currentData)
        setcurrentData(currentData)
        setotherdata({ fulldata: otherdata, name: currentData.productname, details: currentData.productdetail, rate: currentData.Rate, qty: currentData.Qty })
        handleShow()
    }



    const columns = [


        {
            name: "firstname",
            label: "Firstname",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "secondname",
            label: "lastname",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "mobilenumber",
            label: "Mobilenumber",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "id",
            label: "Edit",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => editclick(value)}>{value}</button>
                )
            }
        },
        {
            name: "id",
            label: "Delete",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => removeclick(value)}>{value}</button>
                )
            }
        },
        {
            name: "id",
            label: "view",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => viewclick(value)}>{value}</button>
                )
            }

        }
    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        onTableChange: (action, state) => {

        }
    };


    return (

        <div>
            <Dashboard>
                <div className='detail'>
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"ACME Employee list"}
                                data={newdata}
                                columns={columns}
                                options={options}

                            />
                        </ThemeProvider>
                    </CacheProvider>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className=' align-center justify-around'>

                                <div className='d-block'>
                                    <div className='col-lg-6'> <label id='d1'>Firstname Name</label><b>{newcurrentData.firstname}</b> </div>
                                    <div className='col-lg-6'>  <label id='d2'>Last Name</label><br></br><b>{newcurrentData.secondname}</b></div>


                                    <div className='col-lg-6'> <label id='d4'>Mobilenumber</label><br></br><b>{newcurrentData.mobilenumber}</b></div>

                                </div>

                                <table>

                                    <th >productname</th>

                                    <th >productdetail</th>

                                    <th >rate</th>

                                    <th >qty</th>

                                    {newcurrentData.indata && newcurrentData.indata.length > 0 && newcurrentData.indata.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td >{item.productname}</td>
                                                <td >{item.productdetail}</td>
                                                <td>{item.Rate}</td>
                                                <td >{item.Qty}</td>
                                            </tr>
                                        )
                                    }
                                    )
                                    }
                                </table>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Dashboard>

        </div>
    )
}

