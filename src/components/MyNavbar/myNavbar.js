import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLInk } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
}
  from 'reactstrap';
import './myNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNaveBar = () => {
      if (isAuthed) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/home'><i className="fas fa-home"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/friends'><i className="fas fa-user-friends"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/articles'><i className="fas fa-newspaper"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/events'><i className="far fa-calendar-alt"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/weather'><i className="fas fa-sun"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/messages'><i className="fas fa-comments"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}><i className="fas fa-sign-out-alt"></i></NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auth' navbar />;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Nutty Nutshells</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNaveBar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
