import Card from "react-bootstrap/Card"
import Rating from "react-rating"
import { memo } from "react"

const CafeReview: React.FC<ReviewInterface> = (props) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text style={{ fontWeight: 600 }}>
          {/* {props.rating}.0 <span style={{ fontWeight: 500 }}>/ 5.0</span> <br /> */}
          <Rating readonly fractions={2} initialRating={props.rating} /> <br />
          {props.title}
        </Card.Text>
        <Card.Text>{props.content}</Card.Text>
        <Card.Text>
          <small>
            Written by{" "}
            <span style={{ fontWeight: 600 }}>{props.user_name}</span>
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default memo(CafeReview)
