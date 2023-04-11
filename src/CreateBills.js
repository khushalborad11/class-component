import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Forms from './form';
import Dashboard from './dashboard';

let data = []
let otherdata = []
let id = ''
let currentData = ''
export default class CreateBills extends Component {

    state = {

        name: '',
        details: '',
        qty: '0',
        rate: '0',
        allData: [],
        fulldata: [],
        show: false,
        firstname: '',
        lastname: '',
        mobilenumber: '',
    }

    componentDidMount() {

        if (localStorage.getItem('billdata')) {

            otherdata = JSON.parse(localStorage.getItem('billdata'))
        }
        if (localStorage.getItem('id')) {
            id = localStorage.getItem('id')
        }

        console.log('data ::', otherdata, id)
        for (let i = 0; i < otherdata.length; i++) {

            if (otherdata[i].id == id) {
                currentData = otherdata[i]
            }
        }

        console.log('current data :: ', currentData)

        this.setState({ fulldata: otherdata, allData: currentData.indata, firstname: currentData.firstname, lastname: currentData.secondname, mobilenumber: currentData.mobilenumber })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.id !== prevProps.id) {
            this.fetchData(this.props.id);
        }
    }


    openedit = () => {
        this.handleShow()

        if (localStorage.getItem('id')) {
            id = localStorage.getItem('id')
        }

        console.log('allData ::', this.state.allData, id)
        for (let i = 0; i < this.state.allData.length; i++) {

            if (this.state.allData[i].id == id) {
                currentData = this.state.allData[i]
            }
        }

        console.log('currentdata :: ', currentData)

        this.setState({ name: currentData.productname, details: currentData.productdetail, rate: currentData.Rate, qty: currentData.Qty })
    }

    handlenamechange = (e) => {
        this.setState({ name: e.target.value })

    }
    handledetailschange = (e) => {
        this.setState({ details: e.target.value })
    }
    handleqtychange = (e) => {
        this.setState({ qty: e.target.value })
    }
    handleratechange = (e) => {
        this.setState({ rate: e.target.value })
    }
    handlefirstnamechange = (e) => {
        this.setState({ firstname: e.target.value })
    }
    handlelastnamechange = (e) => {
        this.setState({ lastname: e.target.value })
    }
    handlenumberchange = (e) => {
        this.setState({ mobilenumber: e.target.value })
    }
    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = (id) => {
        this.setState({ show: true })
    }

    submitdata = () => {

        if (localStorage.getItem('id')) {
            this.editdata()
        }
        else {
            this.adddata()
        }
    }


    editdata = () => {
        let id = localStorage.getItem('id')
        let data = this.state.allData
        console.log('allData', this.state.allData)
        let objIndex = this.state.allData.findIndex((obj => obj.id == id));

        if (objIndex !== -1) {
            data[objIndex].productname = this.state.name
            data[objIndex].productdetail = this.state.details
            data[objIndex].Rate = this.state.rate
            data[objIndex].Qty = this.state.qty


        }

        this.setState({ allData: data }, () => {
            localStorage.setItem('indata', JSON.stringify(this.state.allData))
        })
        console.log(this.state.allData)
        localStorage.removeItem('id')
        this.handleClose()
    }
    adddata = () => {
        let obj = {
            productname: this.state.name,
            productdetail: this.state.details,
            Rate: this.state.rate,
            Qty: this.state.qty,
            id: Date.now()


        }
        data.push(obj)
        this.setState({ allData: data }, () => {
            localStorage.setItem('indata', JSON.stringify(this.state.allData))
        })

    }
    submit = () => {

        if (localStorage.getItem('id')) {

            this.billeditdata()

        }
        else {
            this.billadddata()
        }

    }
    billeditdata = () => {
        let id = localStorage.getItem('id')
        let data = this.state.fulldata

        console.log('fulldata', this.state.fulldata)

        let objIndex = this.state.fulldata.findIndex((obj => obj.id == id));
        if (objIndex !== -1) {
            data[objIndex].firstname = this.state.firstname
            data[objIndex].secondname = this.state.lastname
            data[objIndex].mobilenumber = this.state.mobilenumber
            data[objIndex].indata = this.state.allData

        }

        this.setState({ fulldata: data }, () => {
            localStorage.setItem('billdata', JSON.stringify(this.state.fulldata))
        })
        console.log(this.state.fulldata)
        localStorage.removeItem('id')
        this.handleClose()
        window.location.href = '/bills'
    }

    billadddata = () => {
        let otherobj = {
            firstname: this.state.firstname,
            secondname: this.state.lastname,
            mobilenumber: this.state.mobilenumber,
            indata: this.state.allData,
            id: Date.now()
        }
        otherdata.push(otherobj)
        console.log(otherdata)
        this.setState({ fulldata: otherdata }, () => {
            localStorage.setItem('billdata', JSON.stringify(this.state.fulldata))
            this.setState({ firstname: '', lastname: '', mobilenumber: '', allData: [] })
        })
        window.location.href = '/createbills'
    }


    render() {
        return (
            <div>
                <Dashboard>



                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className=' align-center justify-around'>

                                <div className='d-flex'>
                                    <div className='col-lg-6'> <label id='d1'>Product Name</label><input id='d1' placeholder='Name Here' type='text' value={this.state.name} onChange={this.handlenamechange} name='productname' /></div>
                                    <div className='col-lg-6'>  <label id='d2'>Product Description</label><br></br><input id='d2' placeholder='Description Here' type='text' value={this.state.details} onChange={this.handledetailschange} name='productdetail' /></div>
                                </div>
                                <div className='d-flex'>                               <div className='col-lg-6'> <label id='d4'>Rate</label><br></br><input type='number' id='d4' value={this.state.rate} onChange={this.handleratechange} name='rate' /></div>
                                    <div className='col-lg-6'> <label id='d3'> Qty</label><br></br><input type='number' id='d3' value={this.state.qty} onChange={this.handleqtychange} name='qty' /></div>
                                </div>



                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.submitdata}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='detail' id='createbills'><h1>CreateBills</h1></div>
                    <br></br>
                    <div className='row good'>
                        <div className='col-lg-2'>
                            <label id='firstname'>Firstname</label><input id='firstname' type='text' name='firstname' value={this.state.firstname} onChange={this.handlefirstnamechange} />
                        </div>
                        <div className='col-lg-2'>
                            <label id='secondname'>lastname</label><input id='secondname' type='text' name='lastname' value={this.state.lastname} onChange={this.handlelastnamechange} />
                        </div>
                        <div className='col-lg-2'>
                            <label id='mobilenumber'>Mobilenumber</label><input id='mobilenumber' type='tel' name='mobilenumber' value={this.state.mobilenumber} onChange={this.handlenumberchange} />
                        </div>

                    </div>
                    <div className='description '>
                        <br></br>
                        <button className=' col-lg-2 button' onClick={this.handleShow}><i class="bi bi-plus-lg"></i></button>

                    </div>

                    <Forms akdfjaf={this.openedit} tabledirect={this.state.allData} />
                    <Modal.Footer>
                        <Button variant="primary col-lg-2" onClick={this.submit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Dashboard >


            </div>
        )
    }
}
