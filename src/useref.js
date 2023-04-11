import React, { Component } from 'react';
import Child from './child';

export default class useref extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
        }
        this.myRef = React.createRef();
    }
    componentDidMount() {
        this.myRef.current.handleclick()
    }



    render() {
        return (
            <Child ref={this.myRef} />
        )
    }
}
