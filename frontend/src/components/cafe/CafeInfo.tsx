import ListGroup from "react-bootstrap/ListGroup"
import Badge from "react-bootstrap/Badge"

import renderPrice from "../../utils/renderPrice"

const CafeInfo: React.FC<CafeInterface> = (props) => {
  const renderTags = () => {
    return props.tags.map((tag, index) => (
      <Badge bg="secondary" key={index}>
        {tag}
      </Badge>
    ))
  }

  return (
    <ListGroup>
      <ListGroup.Item>
        <strong>Address: </strong> {props.address}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Price: </strong> {renderPrice(props.price)}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Hours: </strong> {props.hours}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Tags: </strong> {renderTags()}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Rating: </strong> <br />
        <span style={{ fontSize: 30, fontWeight: 600 }}>
          {props.avg_rating.toFixed(2)}
        </span>{" "}
        / 5.0
      </ListGroup.Item>
    </ListGroup>
  )
}

export default CafeInfo
