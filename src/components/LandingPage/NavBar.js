import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Logo from '../assets/Logo1.png'
import './landingpage.css'

const NavBar = () => {
    return(
        <div>
        <Navbar className='NavBar' bg="white" expand="lg" sticky='top'>
            <Navbar.Brand href="/"><img src={Logo} className='nav-logo' alt='logo' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto nav-size">
                    <NavDropdown title="Learn More" id="basic-nav-dropdown" className="robo900">
                        <NavDropdown.Item className="robo400 nav-drop-size" href="/Getting-Started">Getting Started</NavDropdown.Item>
                        <NavDropdown.Item className="robo400 nav-drop-size" href="/FAQs">FAQs</NavDropdown.Item>
                        <NavDropdown.Item className="robo400 nav-drop-size" href="/Can-I-Make-Money">Can I Make Money?</NavDropdown.Item>
                     </NavDropdown>
                    <NavDropdown title="About Us" id="basic-nav-dropdown" className="robo900 nav-drop">
                        <NavDropdown.Item className="robo400 nav-drop-size" href="/Our-Story">Our Story</NavDropdown.Item>
                        <NavDropdown.Item className="robo400 nav-drop-size" href="/ContactUs">Contact Us</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Login" className="robo900">Login/Signup</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    )
}

export default NavBar