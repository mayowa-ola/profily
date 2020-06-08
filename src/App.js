import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import Dashboard from './components/pages/dashboard';
import Register from './components/pages/register';
import Login from './components/pages/login';
import LogOut from './components/logout';
import ProtectedRoute from './components/protectedRoute';


class App extends Component {
  state = {
    user:''
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({user});
    }
    catch (ex) {}
  }

  render() {
  return (
          <React.Fragment>
            <Switch>
              <ProtectedRoute path="/dashboard" render={(props)=><Dashboard {...props} user={this.state.user}/>} />
              <Route path="/logout" component={LogOut}/>
              <Route path="/register" component={Register}/>
              <Route path="/" component={Login}/>
            </Switch>    
          </React.Fragment>
    );
}
}

export default App;