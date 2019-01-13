import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Friends.scss';

class Friends extends React.Component {
  state = {
    users: [],
    uid: '',
  }

  componentDidMount() {
    smashRequests
      .usersAndFriends(authRequests.getCurrentUid())
      .then((users) => {
        console.log(users);
      })
      .catch(error => console.log('stuff broke', error));
  }

  render() {
    return (
      <div className='Friends'>
        <h2>Muh Friends</h2>
      </div>
    );
  }
}

export default Friends;
