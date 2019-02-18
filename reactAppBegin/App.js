import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Request from './components/Requests'
import history from './history'
import ActionScreen from './components/ActionsScreen';
class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/adminactions' component={ActionScreen} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/request' component={Request} />
                </Switch>
            </Router>
        );
    }
}

export default App;

{/* <ul >
            <li><Link to={'/'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
            <li><Link to={'/profile'}>Profile</Link></li>
          </ul>
          <hr /> */}