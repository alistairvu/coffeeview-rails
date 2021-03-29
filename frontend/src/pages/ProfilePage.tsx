import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { ProfileUpdateForm } from "../components/profile"
import Helmet from "react-helmet"

const ProfilePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Profile | coffeeview</title>
      </Helmet>

      <Container className="mt-3">
        <h1>Your Profile</h1>
        <Row className="mt-3">
          <Col lg={4}>
            <ProfileUpdateForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfilePage
