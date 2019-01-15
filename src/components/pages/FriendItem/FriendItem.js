import React from 'react';
import friendShape from '../../../helpers/propz/friendShape';
import './FriendItem.scss';

class FriendItem extends React.Component {
  static propTypes = {
    listing: friendShape,
  }
}

export default FriendItem;
