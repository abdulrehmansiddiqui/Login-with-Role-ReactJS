import React, { Component } from 'react';
import firebase from "../firebase/firebase";

class Login extends Component {
    state = {
        email: "",
        pass: "",
    }
    
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


    Loginfunction = () => {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass)
          .then(res => {
              firebase.auth().onAuthStateChanged((userid) => {
                if(userid){
                  var ids = userid.uid;
                  firebase.database().ref("users").child(ids).once('value').then((snapShot) => {
                    // console.log(snapShot.val())
                    // console.log(snapShot.val().Roll)
    
                    var role = snapShot.val().Roll;
                    if(role == 9){
                        let path = '/Dashboard';
                        this.props.history.push(path)
                    }
                  })
                }
                else{
                  console.log("ffffffffff")
                }
              })
          })
          .catch(error=>{
            console.log(error.message)
            console.log(error.message)
            console.log(error.message)
            console.log(error.message)
            console.log(error.message)
          })
      };

    render() {
        return (

            <div className="row">
                <div className="col-lg-6">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input placeholder="Enter email" type="email" className="form-control" onChange={(val) => { this.setState({ email: val.target.value }) }} value={this.state.email} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input placeholder="Password" type="password" className="form-control" onChange={(val) => { this.setState({ pass: val.target.value }) }} value={this.state.pass} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <button type="submit" onClick={this.Loginfunction} className="btn btn-primary">Submit</button>
                    </div>
                </div>

                {/* <div className="col-lg-6">
               First Name: {this.state.FName}
            </div>
            <div className="col-lg-6">            
               Last Name: {this.state.LName } 
            </div> */}


            </div>
        );
    }
}

export default Login;