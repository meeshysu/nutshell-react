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
    this.determineUsersFriendship();
  }

  determineUsersFriendship = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.usersAndFriends(uid)
      .then((results) => {
        const users = results;
        const confirmedFriendship = users.filter(user => user.isAccepted);
        const pendingFriendship = users.filter(user => user.isPending && !user.Accepted);
        const potentialFriendship = users.filter(user => !users.isPending && user.isAccepted);
        this.setState({
          users,
          confirmedFriendship,
          potentialFriendship,
          pendingFriendship,
        });
      })
      .catch(error => console.log('error in smashRequests'));
  }

  render() {
    return (
      <div className='Friends mx-auto'>
        <div className="card-deck text-center">
          <div className="card border-dark" id="potential">
            <div className="card-body text-center">
              <h4 className="card-title"><i className=""></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Potential</h6>
              <p className='friendships'>
              pickles</p>
            </div>
          </div>
        </div>
        <div className="card-deck text-center">
          <div className="card border-dark" id="pending">
            <div className="card-body text-center">
              <h4 className="card-title"><i className=""></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Pending</h6>
              <p className='friendships'>
              pickles
              cheese</p>
            </div>
          </div>
        </div>
        <div className="card-deck text-center">
          <div className="card border-dark" id="confirmed">
            <div className="card-body text-center">
              <h4 className="card-title"><i className=""></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Confirmed</h6>
              <p className='friendships'>
              pickles</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
