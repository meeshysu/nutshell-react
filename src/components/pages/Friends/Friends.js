import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import authRequests from '../../../helpers/data/authRequests';
import FriendItem from '../FriendItem/FriendItem';
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
      .catch(error => console.log('error in smashRequests'));
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
        />
      )));

    return (
      <div className='Friends mx-auto'>
        <h2 className='row potential'>Potential</h2>
        {friendItemComponent(potentials, 'potentials')}
        <h2 className='row pending'>Pending</h2>
        {friendItemComponent(pending, 'pendings')}
        <h2 className='row confirmed'>Confirmed</h2>
        {friendItemComponent(confirmed, 'confirmed')}
      </div>
    );
  }
}

export default Friends;
