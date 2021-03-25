import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { rootState } from "../../redux"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import axios from "axios"
import { logoutUser } from "../../redux/user"
import { useHistory, useLocation } from "react-router-dom"
import { useState } from "react"

const AppHeader: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const { isLoggedIn, userInfo } = useSelector((state: rootState) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const { data } = await axios.delete("/api/auth/logout")
      if (data.logged_out) {
        dispatch(logoutUser())
        history.push("/login")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const renderNavOptions = () => {
    if (!isLoggedIn) {
      return (
        <Nav className="ms-auto" activeKey={location.pathname}>
          <LinkContainer to="/browse">
            <Nav.Link eventKey="browse">Browse</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link eventKey="login">Log In</Nav.Link>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Nav className="ms-auto" activeKey={location.pathname}>
        <LinkContainer to="/browse">
          <Nav.Link eventKey="browse">Browse</Nav.Link>
        </LinkContainer>
        <NavDropdown
          title={`Hello, ${userInfo.first_name}`}
          id="user-selections"
        >
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out..." : "Log out"}
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    )
  }

  return (
    <Navbar expand="lg" variant="dark" bg="primary" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ fontWeight: 700 }}>coffeeview</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>{renderNavOptions()}</Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader
