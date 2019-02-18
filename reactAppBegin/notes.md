- The react OM for following
    1. The "componnt" class
	    1. The "constructor()" used to define state and behavior for the component.
        2. The "render()" method used to control HTML DOM with Data and behavior.
    2. Manages hierarchies of components with their lifecycle
        1. Manages Parent/Child rendering and data sharing relationship across comonents.
        2. The JSX --> babel-preset-es2015 and babel-preset-react libs.
            1. React.createClass()  and React.createElement() objects for rendering 

- The react-Dom lib
        1. Uses JSX for rendering
            1. Uses component OM
          
##############################################################################################

REACT Components
1. Stateless: component that have only DOM  encapsulation and no data(state and props) in it.
2. StateFull Component: 1. Has their own data. 
                           - Defined using 'state' inside ctor.
                           - the 'state' is  always local to component.
                           - he 'setState()' method of the component class to update the state of      component.
                           - seState({stateProps:value}, callback function to update state in async mode);
                           - Note: callback is mandatory in case of state changes for <select> element
                        1. Has data received from their 'Parent' component. defined using 'props'      parameter passed to ctor. the 'props' are always across components.
    2.1. Statefull 'Controlled-Component'
        - Event and data binding for each editable element is used.
    2.2. Statefull 'UnControlled-Component'
        - State is not defined using "state" object, but the editable elements has implicit object declaration.
1. React.js Design Pattern React 16.x+
    - Higher-Order-Component(HOC)

###################################################################################################

- window.fetch() --> ES6
- window.request() --> wrap over fetch
- axios package for AJAX calls from REACT to REST
- all of the above returns the "promise" object
 
 

fetch("<URL>", "{OPTIONS}")

- method: GET/POST/PUT/DELETE -->  GET is the default method
- headers: Carry request headers
- body: Carry data to server

var promise= fetch(); -> service.js

- component.js
    - componentDidMount() method --> make sure the following:-
        - All Props are received fro the component.
        - All state properties are manipulated.
        - Call render() method
            - Elements + Binding + Events
        - componentDidMunt()-> executes all async codes e.g. REST Calls subscription.
            - to subscribe to promise
                - promise.then() // receives data - .then() // to
                -  process data inside component - .catch() // if error occurs
                    - promis.then().then().catch
                    - 
####################################################################################
11th Feb, 2019

HocComponent implementation

// factory method
import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

export default function Hoc(HocComponent, data) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                data: data
            };
        }
        render() {
            return (
                <HocComponent data={this.state.data}{...this.props} />
            )
        }
    }
}
