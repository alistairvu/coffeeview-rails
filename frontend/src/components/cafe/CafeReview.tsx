import Card from "react-bootstrap/Card"
import Dropdown from "react-bootstrap/Dropdown"
import Rating from "react-rating"
import { memo } from "react"
import useUser from "../../hooks/useUser"
import axios from "axios"
import { mutate } from "swr"
import { useParams } from "react-router-dom"

const CafeReview: React.FC<ReviewInterface> = (props) => {
  const { userInfo, isLoggedIn } = useUser()
  const { slug } = useParams<{ slug: string }>()

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete?")
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(`/api/reviews/${props.id}`, {
          withCredentials: true,
        })
        console.log(data)
        if (data.success) {
          mutate(`/api/reviews/cafe/${slug}`)
          mutate(`/api/cafes/${slug}`)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <Card.Text style={{ fontWeight: 600 }}>
            <Rating readonly fractions={2} initialRating={props.rating} />{" "}
            <br />
            {props.title}
          </Card.Text>
          {isLoggedIn && (userInfo.id === props.user_id || userInfo.is_admin) && (
            <Dropdown className="align-self-center" alignRight>
              <Dropdown.Toggle variant="default"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
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
