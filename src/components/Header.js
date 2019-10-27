import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from "../firebase/firebase";

class Header extends Component {
    state = {
        onofflogin: null,
        onofflogout: null,
        onoffdashborad: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((userid) => {
            if (userid) {
                console.log("true")
                var ids = userid.uid;

                firebase.database().ref("users").child(ids).once('value').then((snapShot) => {
                    var role = snapShot.val().Roll;

                    if (role == 9) {
                        this.setState({ onofflogin: false })
                        this.setState({ onofflogout: true })
                        this.setState({ onoffdashborad: true })
                        let path = '/Dashboard';
                        this.props.history.push(path)
                    }
                })

            }
            else {
                this.setState({ onofflogin: true })
                this.setState({ onofflogout: false })
                this.setState({ onoffdashborad: false })
                let path = '/Login';
                this.props.history.push(path)
            }
        })
    }

    loginbutton = () => {
        return (
            <li className="nav-item">
                <a className="nav-link" onClick={this.onLogin} >Login</a>
            </li>
        )
    }
    logoutbutton = () => {
        return (
            <li className="nav-item">
                <a className="nav-link" onClick={this.onLogout} >Logout</a>
            </li>
        )
    }
    dashtbutton = () => {
        return (
            <li className="nav-item">
                <a className="nav-link" onClick={this.onDash} >Dashborad</a>
            </li>
        )
    }
    onLogin = () => {
        let path = 'Login';
        this.props.history.push(path)
    }
    onLogout = () => {
        let path = 'Logout';
        this.props.history.push(path)
    }
    onDash = () => {
        let path = 'Dashboard';
        this.props.history.push(path)
    }
    onHome = () => {
        let path = '/';
        this.props.history.push(path)
    }

    render() {
        return (
            <div className="row">
                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onHome} >Home</a>
                                </li>
                                {this.state.onoffdashborad ? (this.dashtbutton()) : null}
                                {this.state.onofflogin ? (this.loginbutton()) : null}
                                {this.state.onofflogout ? (this.logoutbutton()) : null}
                            </ul>
                        </div>
                    </nav>


                </div>
            </div>
        );
    }
}


export default withRouter(Header);