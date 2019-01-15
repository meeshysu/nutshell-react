import React from 'react';
import friendShape from '../../../helpers/propz/friendShape';
import './FriendItem.scss';

class FriendItem extends React.Component {
  static propTypes = {
    listing: friendShape,
  };


  render() {
    const { friend } = this.props;
    return (
      <li className='friend-item text-center' id={friend.id}>
        <span className='col-2'><img src={friend.photo} alt={friend}/></span>
        <span className='col-4'>{friend.userName}</span>
      </li>
    );
  }
}

export default FriendItem;
