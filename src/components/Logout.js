import React, { Component } from 'react';
import firebase from "../firebase/firebase";

class Logout extends Component {
    state = {
    }
    
    componentDidMount() {
        firebase.auth().signOut()
        // let path = '/Login';
        // this.props.history.push(path)
    }

    render() {
        return (

            <div className="row">
                You Successfull Logout
            </div>
        );
    }
}

export default Logout;