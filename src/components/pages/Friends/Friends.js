import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Friends.scss';

class Friends extends React.Component {
  state = {
    users: [],
    potentials: [],
    confirmed: [],
    pending: [],
    uid: '',
  }

  componentDidMount() {
    smashRequests
      .usersAndFriends(authRequests.getCurrentUid())
      .then((users) => {
        console.log(users);
      })
      .catch(error => console.log('error in componentDidMount', error));
  }

  render() {
    return (
      <div className='Friends'>
        <div className='friends container'>
          <h2>Das Friends</h2>
          <div className='container for-friends'>
            <div className='row'>
              <div className='col'>
                Could Be Friends
              </div>
              <div className='col'>
                Thinking About It
              </div>
              <div className='col'>
                You're Stuck With Me
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
