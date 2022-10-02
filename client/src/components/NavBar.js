import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Router, Route } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from '../auth/Auth';

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
} from "reactstrap";
import './index.css'
// import { useAuth0 } from "@auth0/auth0-react";
const auth = new Auth()

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [isAuthenticated, setIsAuthenticated] = useState();
  // const {
  //   user,

  //   loginWithRedirect,
  //   logout,
  // } = false

  useEffect(()=>{
    
    logInLogOutButton()
  },[])
  const toggle = () => setIsOpen(!isOpen);

  const onLogin = () => {

    auth.login()
   

  }
  const handleLogout = () => {

    auth.logout()


  }
  const logInLogOutButton = () => {
    if (props.auth.isAuthenticated()==false) {
      return (
        <NavItem>


          <Button onClick={handleLogout}>Log Out</Button>
        </NavItem>
        // <Menu.Item name="logout" onClick={handleLogout}>
        //   Log Out
        // </Menu.Item>
      )
    } else {
      return (
        // <Menu.Item name="login" onClick={onLogin}>
        //   Log In
        // </Menu.Item>

        <NavItem>


          <Button onClick={onLogin}>Log In</Button>
        </NavItem>
      )
    }
  }
  // const logoutWithRedirect = () =>
  //   logout({
  //     returnTo: window.location.origin,
  //   });

  return (
    <div className="nav-container">
      
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              {/* {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    External API
                  </NavLink>
                </NavItem>
              )} */}
            </Nav>
            <Nav className="d-none d-md-block mt-login" navbar>
            {/* <Router history={props.history}> */}
            {logInLogOutButton()}
            {/* </Router> */}
              {/* <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin mt-login"
                  onClick={() => onLogin()}
                >
                  {isAuthenticated == false ? 'Login' : 'Log out'}
                </Button>
              </NavItem> */}

              {/* {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )} */}
            </Nav>
            
            {/* {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )} */}
          </Collapse>
        </Container>
      </Navbar>
     
    </div>
  );
};

export default NavBar;
