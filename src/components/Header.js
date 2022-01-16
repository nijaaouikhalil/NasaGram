import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        className="navbar_theme"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">NasaGram</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="justify-content-end">
            <LinkContainer to="/favorites">
              <strong>
                <i className="fab fa-gratipay btn">Favorites</i>
              </strong>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
