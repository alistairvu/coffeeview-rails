import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import renderPrice from "../../utils/renderPrice"

const BrowseCard: React.FC<CafeInterface> = (props) => {
  return (
    <Col lg={3} md={4} sm={6}>
      <Card>
        <Card.Img variant="top" src={props.images[0]} />
        <Card.Body>
          <Card.Title style={{ fontWeight: 700 }}>{props.name}</Card.Title>
          <Card.Text>
            <strong>{renderPrice(props.price)}</strong> <br />
            <strong>Address: </strong>
            {props.address}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default BrowseCard
