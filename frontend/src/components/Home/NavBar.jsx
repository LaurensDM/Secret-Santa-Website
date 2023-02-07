import { Link } from "react-router-dom";
import LanguageSelect from "../LanguageSelect";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthenticationButton from "../authentication/AuthenticationButton";
import { memo } from "react";

function NavBar() {
  return (
    <Navbar expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div style={{width: "316px"}}></div>
          <Nav
            className="mx-auto"
            navbarScroll
          >
            <Nav.Item>
              <Link to="/">
                <button className="btn  navbar-btn m-1">Home</button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/info">
                <button className="btn  navbar-btn m-1">Info</button>
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <AuthenticationButton />
            <Nav.Item>
              <LanguageSelect />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default memo(NavBar);