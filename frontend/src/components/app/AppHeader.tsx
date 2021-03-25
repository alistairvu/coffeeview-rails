import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { rootState } from "../../redux"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import axios from "axios"
import { logoutUser } from "../../redux/user"
import { useHistory } from "react-router-dom"

const AppHeader: React.FC = () => {
  const { isLoggedIn, userInfo } = useSelector((state: rootState) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    try {
      const { data } = await axios.delete("/api/auth/logout")
      if (data.logged_out) {
        dispatch(logoutUser())
        history.push("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const renderNavOptions = () => {
    if (!isLoggedIn) {
      return (
        <Nav className="ms-auto">
          <LinkContainer to="/browse">
            <Nav.Link>Browse</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Log In</Nav.Link>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Nav className="ms-auto">
        <LinkContainer to="/browse">
          <Nav.Link>Browse</Nav.Link>
        </LinkContainer>
        <NavDropdown
          title={`Hello, ${userInfo.first_name}`}
          id="user-selections"
        >
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
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
