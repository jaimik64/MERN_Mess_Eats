import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropDown } from "react-bootstrap";

import { isAuthenticated } from "../../Auth/helper";
import Logo from '../../res/logo.gif';
import { meshSignOut } from "../Auth/index";

import '../../Styles.css';

const currentTab = (history, path) => {
    // if (history.pathname === path) {
    //     return { color: "#256333", px: 4 }
    // } else {
    //     return { color: "#256333", px: 4 }
    // }
}

const Menu = ({ history }) => {
    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" className="nv">
            <Container className="nav">
                <Navbar.Brand href="#home"><img className="image" src={Logo} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-center flex-grow-2">

                        {
                            isAuthenticated() && (
                                <Nav.Link style={currentTab(history, '/mesh')} href="/mesh">Dashboard</Nav.Link>
                            )
                        }
                        {
                            !isAuthenticated() && (
                                <Fragment>
                                    <Nav.Link style={currentTab(history, '/mesh/auth/signup')} href='/mesh/auth/signup'>Sign Up</Nav.Link>
                                    <Nav.Link style={currentTab(history, '/mesh/auth/signin')} href='/mesh/auth/signin'>Sign In </Nav.Link>
                                </Fragment>
                            )
                        }
                        {
                            isAuthenticated() && (
                                <Nav.Link
                                    style={currentTab(history, '/mesh')}
                                    onClick={() => {
                                        meshSignOut(() => {
                                            // history.pushstate("/mesh")
                                            window.location.assign("/mesh")
                                        })
                                    }}>Sign Out</Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu;