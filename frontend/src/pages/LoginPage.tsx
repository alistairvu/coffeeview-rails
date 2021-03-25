import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { AuthLoginForm } from "../components/auth"
import useUser from "../hooks/useUser"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn, history])

  return (
    <Container className="pt-3">
      <h1>Log In</h1>
      <Row>
        <Col lg={6} className="offset-lg-3">
          <Card>
            <Card.Body>
              <AuthLoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
