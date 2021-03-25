import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

const AppHeader: React.FC = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>coffeeview</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default AppHeader
