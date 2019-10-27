import React, { Component } from 'react';
import firebase from "../firebase/firebase";

class Dashboard extends Component {
    state = {}

    componentDidMount() {
        firebase.auth().onAuthStateChanged((userid) => {
            if (userid) {
                console.log("true")
                var ids = userid.uid;

                firebase.database().ref("users").child(ids).once('value').then((snapShot) => {
                    var role = snapShot.val().Roll;

                    if (role == 9) {
                        let path = '/Dashboard';
                        this.props.history.push(path)
                    }
                })
            }
            else {
                let path = '/Login';
                this.props.history.push(path)
            }
        })
    }
    render() {
        return (
            <div className="row">
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        );
    }
}

export default Dashboard;