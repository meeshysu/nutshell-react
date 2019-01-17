import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import friendRequests from '../../../helpers/data/friendRequests';
import authRequests from '../../../helpers/data/authRequests';
import FriendItem from '../../FriendItem/FriendItem';
import './Friends.scss';

class Friends extends React.Component {
  state = {
    potentials: [],
    confirmed: [],
    pending: [],
  }

  componentDidMount() {
    this.determineUsersFriendship();
  }


  determineUsersFriendship = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.usersAndFriends(uid)
      .then((results) => {
        const users = results;
        const confirmed = users.filter(user => user.isAccepted);
        const pending = users.filter(user => user.isPending && !user.Accepted);
        const potentials = users.filter(user => !user.isPending && !user.isAccepted);
        this.setState({
          confirmed,
          potentials,
          pending,
        });
      })
      .catch(error => console.error('error in smashRequests'));
  }

  goodbyeFriend = (maybeMyFriendId) => {
    friendRequests.deleteFriend(maybeMyFriendId)
      .then(() => {
        this.determineUsersFriendship();
      })
      .catch(err => console.error('error in goodbyeFriend', err));
  }

  helloFriend = (friendUid) => {
    friendRequests.addFriend(friendUid)
      .then(() => {
        this.determineUsersFriendship();
      })
      .catch(err => console.error('error in helloFriend', err));
  }

  confirmFriend = (friendId) => {
    friendRequests.acceptFriendship(friendId)
      .then(() => {
        this.determineUsersFriendship();
      })
      .catch(err => console.error('error in confirmFriend', err));
  }

  render() {
    const {
      confirmed,
      potentials,
      pending,
    } = this.state;

    const friendItemComponent = (friendPooArray, status) => (
      friendPooArray.map(friend => (
        <FriendItem
          friend={friend}
          key={friend.id}
          status={status}
          goodbyeFriend={this.goodbyeFriend}
          helloFriend={this.helloFriend}
          confirmFriend={this.confirmFriend}
        />
      )));

    return (
      <div className='Friends'>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h3>Potential Friends</h3>
              {friendItemComponent(potentials, 'potentials')}
            </div>
            <div className="col-sm">
              <h3>Pending Requests</h3>
              {friendItemComponent(pending, 'pendings')}
            </div>
            <div className="col-sm">
              <h3>Friends</h3>
              {friendItemComponent(confirmed, 'confirmed')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
