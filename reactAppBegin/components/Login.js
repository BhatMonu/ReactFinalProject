import React, { Component } from 'react';
import Profile from './Profile';
import history from '../history'
import {
  Card, CardBody
} from 'reactstrap';
const ScreenHeight = screen.height;
const ScreenWidth = screen.width;
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      password: "",
      authenticationStatus: "",
      authenticationMessage: "",
      authenticationToken: "",
      authenticatedUserData: {},
      UserId: ""
    }
    this.signIn = this.signIn.bind(this);
    // this.signUp = this.signUp.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  render() {
    return (
      <Card style={{
        height: ScreenHeight / 3, width: ScreenWidth / 2.5,
        marginTop: ScreenHeight / 5, marginLeft: ScreenWidth / 5, borderWidth: "5px"
      }}>
        <CardBody>
          <div>
            <label>Username: </label> &nbsp;
                  <input type="text" required value={this.state.userName} onChange={this.changeUserName}
              style={{ width: ScreenWidth / 4, height: ScreenHeight / 20, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }} /> &nbsp;
              </div>
          <br />
          <div>
            <label>Password:</label> &nbsp; &nbsp;
                  <input type="password" required value={this.state.password} onChange={this.changePassword}
              style={{ width: ScreenWidth / 4, height: ScreenHeight / 20, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }} /> &nbsp;
              </div>
          <br />
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input type="button" className="btn btn-success" value="Sign In"
              onClick={this.signIn} />
            {/* &nbsp; &nbsp;
              <input type="button" className="btn btn-success" value="SignUp"
            onClick={this.signUp} /> */}
          </div>
          {/* <input type="date" data-date-inline-picker="true" /> */}
        </CardBody>

      </Card >
    );
  }
  changeUserName(event) {
    this.setState({ userName: event.target.value });
    //   this.setState({});
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  signIn() {
    if (this.state.userName != "" && this.state.password != "" &&
      this.state.userName != undefined && this.state.password != undefined &&
      this.state.userName != null && this.state.password != null) {
      var object = {
        UserName: this.state.userName,
        Password: this.state.password
      }
      fetch('http://localhost:4070/api/users/auth', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": "true",
        }),
        body: JSON.stringify(object)
      }).then(response => response.json())
        .then(resData => {
          console.log(JSON.stringify(resData))
          if (resData.statusCode == 200) {
            this.setState({ authenticationStatus: resData.authenticated }); //this is an asynchronous function
            this.setState({ authenticationMessage: resData.message });
            this.setState({ authenticationToken: resData.token });
            this.setState({ authenticatedUserData: resData.data })
            if (this.state.authenticationToken != "" &&
              this.state.authenticationToken != undefined) {
              var data = {
                authenticatedUserData: this.state.authenticatedUserData,
                authenticationToken: this.state.authenticationToken
              }
              history.push('/profile', data);
            } else {
              alert("Something went wrong");
            }

          } else {
            alert(JSON.stringify(resData.message));
          }
        }).catch(err => Alert(error(err)));

      //end
    } else {
      alert("Please enter Username and Password")
    }
  }
  // signUp() {
  //   this.getId()
  //   // history.push('/register');
  // }

}

export default Login;
