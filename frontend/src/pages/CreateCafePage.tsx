import Container from "react-bootstrap/Container"
import Helmet from "react-helmet"
import CreateCafeForm from "../components/create/CreateCafeForm"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

const CreateCafePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Add Your Cafe | coffeeview</title>
      </Helmet>

      <Container className="mt-3">
        <h1>Add Your Cafe</h1>

        <Row>
          <Col lg={6} className="offset-lg-3">
            <Card>
              <Card.Body>
                <CreateCafeForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateCafePage
