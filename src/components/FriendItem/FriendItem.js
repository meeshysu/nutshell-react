import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import friendShape from '../../helpers/propz/friendShape';
import './FriendItem.scss';
import authRequests from '../../helpers/data/authRequests';

class FriendItem extends React.Component {
  static propTypes = {
    friends: friendShape,
    status: PropTypes.string,
    goodbyeFriend: PropTypes.func,
    helloFriend: PropTypes.func,
  };

  makeNewFriend = (e) => {
    e.preventDefault();
    const uid = authRequests.getCurrentUid();
    const friendUid = e.target.id;
    const { addFriend } = this.props;
    const newFriend = {
      uid,
      friendUid,
      isAccepted: true,
      isPending: false,
    };
    addFriend(newFriend);
  };

  deleteFriend = (e) => {
    e.preventDefault();
    const maybeMyFriendId = e.target.id;
    const { goodbyeFriend } = this.props;
    goodbyeFriend(maybeMyFriendId);
  }

  render() {
    const { friend, status } = this.props;
    const makeButtons = () => {
      if (status === 'confirmed') {
        return (
          <Button className='btn btn-danger' id={friend.friendRequestId} onClick={this.deleteFriend}>X</Button>
        );
        // } if (status === 'pending' && friend.friendRequest === 'them') {
        //   return (
        //     <div>
        //       <Button className='btn btn-danger' id={friend.friendRequestId} onClick={this.deleteFriendButton}>X</Button>
        //     </div>
        //   );
      } if (status === 'potentials') {
        return (
          <Button className='btn btn-success' id={friend.uid} onClick={this.makeNewFriend}>+</Button>
        );
      }
      return '';
    };

    return (
      <div className='friend-item text-center' id={friend.id}>
        <span className='col-1'><img className='user-photo' src={friend.photo} alt={friend} /></span>
        <span className='col-4'>{friend.userName}</span>
        <div className='deleteButton'>{makeButtons()}</div>
      </div>
    );
  }
}

export default FriendItem;
