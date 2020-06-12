import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
function Header() {
  return (
    <header>
      <div>
        <Container fluid>
          <Row>
            <Col className="text-right">
              <nav className="nav-bar">
                    <ul>
                       <li>
                       <NavLink activeClassName="navbar__link--active"  to="/" className="navbar__link ">Home</NavLink>
                       </li>
                       <li>
                       <NavLink activeClassName="navbar__link--active" to="/about" className="navbar__link " id='about'>About</NavLink>
                       </li>
                    </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
}

export default Header;
