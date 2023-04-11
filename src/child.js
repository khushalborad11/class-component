import React, { Component } from 'react'

export default class child extends Component {

    handleclick = () => {
        alert('click from abc ')
    }

    render() {
        return (
            <div>child</div>
        )
    }
}
