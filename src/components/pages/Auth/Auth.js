import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import './Auth.scss';

import googleButton from './images/GoogleImage.png';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then((results) => {
        console.log(results.user.uid);
        userRequests.getUserByUid(results.user.uid)
          .then((user) => {
            if (!user) {
              const userObject = {
                uid: `${results.user.uid}`,
                userName: `${results.user.displayName}`,
                photo: `${results.user.photoURL}`,
              };
              userRequests.createUser(userObject);
            }
            this.props.history.push('/home');
          });
      })
      .catch(err => console.error('there is an issue with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn" onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" width="500px" />
        </button>
      </div>
    );
  }
}

export default Auth;
