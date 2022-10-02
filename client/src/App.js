import React, { useEffect, useState } from "react";
import { Router, Route, Switch, NavLink as RouterNavLink } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
// import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import { getEmployees } from './api/api'
// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import Content from "./components/Content";

import { Auth } from './auth/Auth';
initFontAwesome();

const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const auth = new Auth()
  const onLogin = () => {

    props.auth.login()
    

  }
  const handleLogout = () => {

    props.auth.logout()


  }
  const logInLogOutButton = () => {
    // localStorage.setItem('isAuthenticated', props.auth.getIdToken()); const items = JSON.parse(localStorage.getItem('items'));
     console.log(props.auth)

  //  if (props.auth.isAuthenticated()) {
      if (localStorage.getItem('isAuthenticated')) {
      console.log("------appp------",props.auth.getIdToken())
      return (
        <NavItem>
          <Button onClick={handleLogout}>Log Out</Button>
        </NavItem>
      )
    } else {
      return (
        <NavItem>
          <Button onClick={onLogin}>Log In</Button>
        </NavItem>
      )
    }
  }

  const generateCurrentPage=() =>{
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props1 => {
            return <Content  data={props.auth} />
          }}
        />
  
        {/* <Route
          path="/todos/:todoId/edit"
          exact
          render={props => {
            return <EditTodo {...props} auth={this.props.auth} />
          }}
        /> */}
  
        {/* <Route component={NotFound} /> */}
      </Switch>
    )
  }
  // useEffect = (() => {
  //   console.log(props.auth)
  // },[])
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

            </Nav>
            <Nav className="d-none d-md-block mt-login" navbar>

              {logInLogOutButton()}

            </Nav>

          </Collapse>
        </Container>
      </Navbar>
      {generateCurrentPage(props)}
    </div>
  );

};



export default App;
