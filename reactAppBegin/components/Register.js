import React, { Component } from 'react';
import history from '../history'
class Register extends Component {
  constructor(props) {
    super(props)
    this.registerUser = this.registerUser.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  render() {
    return (
      <div class="container">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" class="form-control" />
        </div>
        <br />
        <div class="form-group">
          <label>Password:</label>
          <input type="text" class="form-control" />
        </div>
        <br />
        <div class="form-group">
          <label>Confirm Password:</label>
          <input type="text" class="form-control" />
        </div>


        <input type="button" value="Sign Up" class="btn btn-success" onClick={this.registerUser} />
        <input type="button" class="btn btn-success" value="Back to Login" onClick={this.goBack} />
      </div>
    );
  }
  registerUser() {

    history.push('/profile');
    alert("hiiii");
    console.log(this.props);
  }
  goBack() {
    history.goBack('./')
  }
}

export default Register;
