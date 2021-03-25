import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { AuthSignUpForm } from "../components/auth"
import useUser from "../hooks/useUser"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"

const SignUpPage: React.FC = () => {
  const history = useHistory()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn, history])

  return (
    <Container className="pt-3">
      <h1>Sign Up</h1>
      <Row>
        <Col lg={6} className="offset-lg-3">
          <Card>
            <Card.Body>
              <AuthSignUpForm />
              <p className="pt-3">
                Returning to coffeeview?{" "}
                <Link to="/login">Click here to log in.</Link>{" "}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
