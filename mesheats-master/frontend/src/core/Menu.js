import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from "../Auth/helper";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logo from '../res/logo.gif';
import { CgProfile } from 'react-icons/cg'
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import '../Styles.css';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#256333", px: 2 }
    } else {
        return { color: "#256333", px: 2 }
    }
}

const Menu = ({ history }) => {

    const [count, setCount] = useState(0)

    const displayCount = () => {
        let cart = []

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        } else {
            cart = []
        }
        let total = 0

        cart.map(dish => { return total += dish.count })
        setCount(total)

    }

    useEffect(() => {
        displayCount()
    }, [count])


    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" className="nv" variant="warning" >
            <Container className="nav">
                <Navbar.Brand href="#"><img className="image" src={Logo} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="me-auto my-2 my-lg-0 justify-content-center flex-grow-3 me-auto"
                        navbarScroll
                    >

                        {

                            isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <Nav.Link style={currentTab(history, '/user/dashboard')} href='/user/dashboard'>Dashboard</Nav.Link>
                            )
                        }
                        {
                            isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <Fragment>
                                    <Nav.Link style={currentTab(history, '/user/dashboard')} href='/user/dashboard'>User-Dashboard</Nav.Link>
                                    <Nav.Link style={currentTab(history, '/admin/dashboard')} href='/admin/dashboard'>Admin-Dashboard</Nav.Link>
                                </Fragment>
                            )
                        }
                        {
                            !isAuthenticated() && (
                                <Fragment>
                                    <NavDropdown title="Sign Up" style={currentTab(history, '/')}>
                                        <NavDropdown.Item style={currentTab(history, '/signup')} href="/signup" >User Sign Up</NavDropdown.Item>
                                        <NavDropdown.Item style={currentTab(history, '/mesh/auth/signup')} href="/mesh/auth/signup" >Mesh Sign Up</NavDropdown.Item>

                                    </NavDropdown>
                                    <NavDropdown title="Sign In" style={currentTab(history, '/')}>
                                        <NavDropdown.Item style={currentTab(history, '/signin')} href="/signin" >User Sign In</NavDropdown.Item>
                                        <NavDropdown.Item style={currentTab(history, '/mesh/auth/signin')} href="/mesh/auth/signin" >Mesh Sign In</NavDropdown.Item>
                                    </NavDropdown>
                                </Fragment>
                            )
                        }
                    </Nav>
                    <Nav className="d-flex">
                        {
                            isAuthenticated() && (

                                <Nav.Link style={currentTab(history, '/cart')} href="/cart">
                                    <AiOutlineShoppingCart size={"2rem"} />
                                    <span class='badge badge-warning' id='lblCartCount'>
                                        {
                                            count
                                        }
                                    </span>
                                </Nav.Link>

                            )
                        }
                        {
                            isAuthenticated() && (
                                <Nav.Link
                                    style={currentTab(history, '/')}
                                    href='/profile'
                                >
                                    <CgProfile size={"2rem"} />
                                </Nav.Link>
                            )
                        }
                        {
                            isAuthenticated() && (
                                <Nav.Link
                                    style={currentTab(history, '/')}
                                    onClick={() => {
                                        signout(() => {
                                            history.push("/")
                                        })
                                    }}>
                                    <BiLogOut size={"2rem"} />
                                </Nav.Link>
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <div>
        //     <ul className="nav nav-tabs bg-dark">
        //         <li className="nav-item">
        //             <Link style={currentTab(history, "/")} className="nav-link" to="/">
        //                 Home
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
        //                 Cart
        //             </Link>
        //         </li>
        //         {
        //             isAuthenticated() && isAuthenticated().user.role === 0 && (
        //                 <li className="nav-item">
        //                     <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
        //                         Dashboard
        //                     </Link>
        //                 </li>
        //             )
        //         }
        //         {
        //             isAuthenticated() && isAuthenticated().user.role === 1 && (
        //                 <Fragment>
        //                     <li className="nav-item">
        //                         <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
        //                             User Dashboard
        //                         </Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
        //                             Admin Dashboard
        //                         </Link>
        //                     </li>
        //                 </Fragment>
        //             )
        //         }
        //         {
        //             !isAuthenticated() && (
        //                 <Fragment>
        //                     <li className="nav-item">
        //                         <Link style={currentTab(history, "/signup")} to="/signup" className="nav-link">
        //                             Sign Up
        //                         </Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link style={currentTab(history, "/signin")} to="/signin" className="nav-link">
        //                             Sign In
        //                         </Link>
        //                     </li>
        //                 </Fragment>
        //             )
        //         }
        //         {
        //             isAuthenticated() && (
        //                 <li className="nav-item">
        //                     <span className="nav-link text-warning"
        //                         onClick={() => {
        //                             signout(() => {
        //                                 history.push("/")
        //                             })
        //                         }}>
        //                         Sign Out
        //                     </span>
        //                 </li>
        //             )
        //         }
        //     </ul>
        // </div>
    )
}

export default withRouter(Menu);