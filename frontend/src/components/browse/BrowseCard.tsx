import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import renderPrice from "../../utils/renderPrice"
import { Link } from "react-router-dom"

const BrowseCard: React.FC<CafeInterface> = (props) => {
  return (
    <Col lg={3} md={4} sm={6}>
      <Card>
        <Link to={`/cafe/${props.slug}`}>
          <Card.Img variant="top" src={props.images[0]} />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontWeight: 700 }}>
            <Link to={`/cafe/${props.slug}`} style={{ textDecoration: "none" }}>
              {props.name}
            </Link>
          </Card.Title>
          <Card.Text>
            <strong>{props.avg_rating.toFixed(2)}</strong> / 5.0 |{" "}
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
