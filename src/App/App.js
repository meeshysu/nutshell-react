import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Messages from '../components/pages/Messages/Messages';
import Articles from '../components/pages/Articles/Articles';
import Events from '../components/pages/Events/Events';
import Friends from '../components/pages/Friends/Friends';
import Weather from '../components/pages/Weather/Weather';
import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar/myNavbar';

import './App.scss';

// rest is including the rest of the properties, like authed
// even if you don't have any other properties, you can leave it empty

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (< Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};
// should we see component or redirect?
// in routeChecker we will pass in props. it exists bc it is inherited by public route component
// who gets it from the browser router. the br is the mastermind behind routing: history,
// info on where you are, etc. that passing is component is passing to the route which we defined
// what is contained in the props - 3 things: location (path you're on)
// match (the matching of the url) and history (where you've been)
// if we are not authenticated, then we want to be able to see login component. false ?
// if authenticated we want to be redirected to the main page of the application: home
// use redirect component and define information about where we are redirecting it to

// authed became a variable when it was === false

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (< Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};
// if authenticated we want to be taken to /home, hence true
// if not authenticated, then we want to go to '/auth'
// the rest will stay the same as the one above

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className='container'>
            <div className='row'>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                <PrivateRoute path='/friends' component={Friends} authed={this.state.authed} />
                <PrivateRoute path='/articles' component={Articles} authed={this.state.authed} />
                <PrivateRoute path='/events' component={Events} authed={this.state.authed} />
                <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                <PrivateRoute path='/weather' component={Weather} authed={this.state.authed} />
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
            </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// component is a property of route
