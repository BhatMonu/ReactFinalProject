import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'thunk';
import { Provider } from 'react-redux'
import Login from './components/Login';
const initialState = {
    name: "Hello",
}
const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "CHANGE_STATE":
            //clone of prev state
            // const tempState = Object.assign({}, prevState) //Object.assign(target, )
            // tempState.name = action.data;

            // const newState = Object.assign(prevState, tempState)
            // return newState;
            return { ...prevState, ...{ name: action.data } }

        case "SUCCESS":
            return {
                ...prevState, ...{
                    apiresult: {
                        success: true,
                        error: null,
                        response: action.data
                    }
                }

            }
        case "FAILURE":
            return {


            }
        default:
            return prevState;
    }

}
const store = createStore(reducer, applyMiddleware(thunk))
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <button onClick={this.onChangeState}>Change State</button>
                    <button onClick={this.onShowState}>Show State</button>
                    <Login />
                </div>
            </Provider>
        )
    }

    onChangeState() {
        let action = {
            type: "CHANGE_STATE",
            data: "World"
        }
        store.dispatch(action)
    }
    onShowState() {
        console.log(store.getState())
    }
}