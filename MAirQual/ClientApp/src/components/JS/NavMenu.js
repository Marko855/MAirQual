import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../CSS/NavMenu.css';
import LogoImg from '../../Images/logo.png';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            collapsed: true,
            isLoggedIn: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleLogout() {
        localStorage.removeItem('authToken'); // Remove the authentication token
        this.setState({ isLoggedIn: false });
        window.location.href = '/'; // Redirect to home page after logout
    }

    componentDidMount() {
        // Check if authentication token exists in local storage
        const authToken = localStorage.getItem('authToken');
        const isLoggedIn = !!authToken;

        // Update the state accordingly
        this.setState({ isLoggedIn });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">
                        <img src={LogoImg} alt="Logo" className="logo-img" /> MAirQual
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav ml-auto">
                            {this.state.isLoggedIn ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/UserPage">User Page</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Register">Register</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Login">Login</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </ul>
                        <ul className="navbar-nav">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/About">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/News">News</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/Shop">Shop</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
