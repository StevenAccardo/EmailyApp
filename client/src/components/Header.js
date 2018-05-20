import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import Payments from './Payments';
//using materialize to style
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //This function determines what will be shown in the header depending on what action.payload was returned to the authReducer in the reducer directory.
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item">
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li className="nav-item mr-3" key="1">
            <Payments />
          </li>,
          <li className="credits nav-item mr-3" key="3">
            {/* Lets the user know how many credits they currently have. Able to access the value stored in the state by accessing the auth object that was made available on props via the mapStateToProps function below. */}
            Credits: {this.props.auth.credits}
          </li>,
          <li className="logout-link nav-item" key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    //Nav bar using materialize.js library
    return (
      <Navbar light expand="md" className="rounded-bottom mb-3">
        <NavbarBrand tag={RRNavLink} to={this.props.auth ? '/surveys' : '/'}>
          Emaily
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto">{this.renderContent()}</Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
