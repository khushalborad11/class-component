import React, { Component } from 'react'
let data = []
let id = ''
let currentData = ''
let billdata = []



export default class Forms extends Component {
    state = {

        setdata: this.props.tabledirect,

    }
    // componentDidMount() {
    //     if (localStorage.getItem('billdata')) {
    //         data = JSON.parse(localStorage.getItem('billdata'))
    //     }

    //     this.setState({ setdata: data })
    //     if (localStorage.getItem('id')) {

    //         id = localStorage.getItem('id')
    //     }
    //     console.log('data ::', data, id)
    //     for (let i = 0; i < data.length; i++) {

    //         if (data[i].id == id) {
    //             currentData = data[i]
    //         }
    //     }

    //     console.log('current data :: ', currentData)

    //     this.setState({ name: currentData.productname, details: currentData.productdetail, rate: currentData.Rate, qty: currentData.Qty })

    // }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                setdata: this.props.tabledirect

            })
        } console.log(this.setState.tabledirect)
    }
    editclick = (id) => {
        localStorage.setItem('id', id)
        this.props.akdfjaf()

    }
    removeclick = (id) => {

        console.log(id)
        const afterDelData = this.state.setdata.filter((item) => item.id !== id);
        this.setState({ setdata: afterDelData })
        localStorage.setItem('indata', JSON.stringify(afterDelData))
        console.log(afterDelData)
    }
    columns = [{
        name: "id",
        label: "Edit",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => (
                <button onClick={() => this.state.editclick(value)}>{value}</button>
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
                <button onClick={() => this.state.removeclick(value)}>{value}</button>
            )
        }
    }
    ]
    render() {
        return (

            <table className="table1" >

                <th className="headcell">productname</th>

                <th className="headcell">productdetail</th>

                <th className="headcell">rate</th>

                <th className="headcell">qty</th>
                <th className="headcell">edit</th>
                <th className="headcell">Delete</th>


                {this.state.setdata && this.state.setdata.length > 0 && this.state.setdata.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td className="cell">{item.productname}</td>
                            <td className="cell">{item.productdetail}</td>
                            <td className="cell">{item.Rate}</td>
                            <td className="cell">{item.Qty}</td>
                            <td onClick={() => this.editclick(item.id)}><i class="bi bi-pencil-square"></i></td>
                            <td onClick={() => this.removeclick(item.id)} className="cell"><i class="bi bi-trash"></i></td>



                        </tr>

                    )
                }
                )
                }
            </table >

        )
    }
}