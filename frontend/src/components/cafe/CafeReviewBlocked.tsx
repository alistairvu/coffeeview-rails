import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { LinkContainer } from "react-router-bootstrap"

const CafeReviewBlocked: React.FC = () => {
  return (
    <Card className="mb-3 text-center">
      <Card.Body>
        <Card.Title style={{ fontWeight: 600 }}>
          You are not logged in!
        </Card.Title>
        <Card.Text>Please log in to create a review.</Card.Text>
        <LinkContainer to="/login">
          <Button variant="primary">Log In</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

export default CafeReviewBlocked
