import React, { Component } from 'react';
import Profile from './Profile';
import history from '../history'

const ScreenHeight = screen.height;
const ScreenWidth = screen.width;
class Login extends Component {
    render() {
        return (
            <div>
                <div>{this.props.myName}</div>
                <button onClick={this.onClickMakeApiCall}>Make API call</button>
            </div>
        )
    }
    onClickMakeApiCall() {
        const url = "http://......................."
        this.props.dispatch(getUserDetails)
    }

    getUserDetails() {
        return function (dispatch) {
            return fetch(url).then(res => res.json())
                .then(response => dispatch(
                    {
                        type: "SUCCESS",
                        data: response
                    }
                )).catch(
                    error => dispatch(
                        {
                            type: "FAILURE",
                            data: error.message
                        }
                    )
                )
        }
    }
}