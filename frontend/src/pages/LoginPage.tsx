import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { AuthLoginForm } from "../components/auth"
import useUser from "../hooks/useUser"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import Helmet from "react-helmet"

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn, history])

  return (
    <>
      <Helmet>
        <title>Log In | coffeeview</title>
      </Helmet>

      <Container className="pt-3">
        <h1>Log In</h1>
        <Row>
          <Col lg={6} className="offset-lg-3">
            <Card>
              <Card.Body>
                <AuthLoginForm />
                <p className="pt-3">
                  New to coffeeview?{" "}
                  <Link to="/register">Click here to sign up.</Link>{" "}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage
