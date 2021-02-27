import React from "react";
import {NavLink} from "react-router-dom";
import "./HeaderStyle.css";
import {Nav, Navbar, NavItem} from "react-bootstrap";

const Header = () => {
    const activeStyle = {color: "white"};

    return (
        <Navbar bg="success" variant="dark" sticky="top">
            <Navbar.Brand as={NavLink} to="/" >Shopping List</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="mr-auto nav-text">
                    <NavItem href="/">
                        <Nav.Link as={NavLink} to="/" activeStyle={activeStyle} exact>
                            Lista zakupów
                        </Nav.Link>
                    </NavItem>
                    <NavItem href="/products">
                        <Nav.Link as={NavLink} to="/products" activeStyle={activeStyle}>
                            Produkty
                        </Nav.Link>
                    </NavItem>
                    <NavItem href="/recipes">
                        <Nav.Link as={NavLink} to="/recipes" activeStyle={activeStyle}>
                            Przepisy
                        </Nav.Link>
                    </NavItem>
                    <NavItem href="/stores">
                        <Nav.Link as={NavLink} to="/stores" activeStyle={activeStyle}>
                            Sklepy
                        </Nav.Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        // <div className="header-wrapper">
        //   <div className="logo-wrapper">
        //     <h2>Shopping List</h2>
        //   </div>
        //   <div></div>
        // </div>
    );
};

export default Header;
