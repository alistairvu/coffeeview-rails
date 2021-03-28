import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { ProfileUpdateForm } from "../components/profile"

const ProfilePage: React.FC = () => {
  return (
    <Container className="mt-3">
      <h1>Your Profile</h1>
      <Row className="mt-3">
        <Col lg={4}>
          <ProfileUpdateForm />
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
