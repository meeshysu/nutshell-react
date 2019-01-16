import React from 'react';
import friendShape from '../../helpers/propz/friendShape';
// import Friends from '../pages/Friends/Friends';
import './FriendItem.scss';

class FriendItem extends React.Component {
  static propTypes = {
    friends: friendShape,
  };


  deleteFriendButton = (e) => {
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
          <button className='btn btn-danger buhBye' id={friend.id} onClick={this.deleteFriendButton}>X</button>
        );
      } if (status === 'pending' && friend.maybeMyFriendId === 'them') {
        return (
          <div>
            <button className='btn btn-danger deleteYoAss' id={friend.maybeMyFriendId} onClick={this.deleteFriendButton}>X</button>
          </div>
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
