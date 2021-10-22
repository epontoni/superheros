import { Nav, Navbar } from "react-bootstrap";
import './Header.css'
import { Link } from 'wouter'
import SearchForm from "../SearchForm";
import { useSelector } from "react-redux";

function Header() {
    const isAuthenticated = useSelector(state => state.app.isAuthenticated)
    return (
      <header>
          <Navbar bg="light" expand="sm" className="px-4">
          <Navbar.Brand>
              <Link to="/">
              <span role="img" aria-label="man superhero">🦸‍♂️</span>
              <span className="brand">Superheros</span> 
              <span role="img" aria-label="woman superhero">🦸</span>
              </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="py-2 justify-content-end">
              
              <SearchForm />
              
            <Nav
              className="mx-2 mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">
                  Home
              </Nav.Link>
              {
                  isAuthenticated
                    ? (
                        <Nav.Link href="/logout">
                            Logout
                        </Nav.Link>
                    )
                    : (
                        <Nav.Link href="/login">
                            Login
                        </Nav.Link>
                    )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>  
      </header>
    );
  }
  
export default Header