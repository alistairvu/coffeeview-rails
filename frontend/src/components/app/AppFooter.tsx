import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

const AppFooter: React.FC = () => {
  return (
    <Container className="pb-3">
      <Row>
        <Col sm={6}>
          <h5>About coffeeview</h5>
        </Col>
        <Col sm={6}>
          <h5>Explore</h5>
          <ul className="list-unstyled">
            <li className="text-small text-info">
              <Link to="/browse">Browse</Link>
            </li>
            <li className="text-small text-info">
              <Link to="/create-cafe">Add Your Cafe</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default AppFooter
