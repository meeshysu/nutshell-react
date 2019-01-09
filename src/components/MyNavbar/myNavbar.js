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
              <NavLink tag={RRNavLInk} to='/friends'>Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/articles'>Articles</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/events'>Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/weather'>Weather</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLInk} to='/messages'>Messages</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
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
