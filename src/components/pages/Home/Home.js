import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.target.closest('.card').id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <div className="card-deck text-center">
        <div className="card border-dark" id="messages">
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-comments fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Messages</h6>
              <p className="card-text">Newer better AOL</p>
            </div>
          </div>
          <div className="card border-dark" id="weather" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-sun fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Weather</h6>
              <p className="card-text"><small className="text-muted">Where is the sun?</small></p>
            </div>
          </div>
          <div className="card border-dark" id="calendar" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="far fa-calendar-alt fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Calendar</h6>
              <p className="card-text"><small className="text-muted">What year is it? I'm from the future.</small></p>
            </div>
          </div>
          </div>
          <div className="card-deck">
          <div className="card border-dark" id="articles" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-newspaper fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Articles</h6>
              <p className="card-text"><small className="text-muted">In case you like to read.</small></p>
            </div>
          </div>
          <div className="card border-dark bg-success" id="nutshell" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-tree fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Nutshell</h6>
              <p className="card-text"><small className="text-muted">Because nuts come from trees.</small></p>
            </div>
          </div>
          <div className="card border-dark" id="friends" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-user-friends fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Friends</h6>
              <p className="card-text"><small className="text-muted">I swear they exist.</small></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
