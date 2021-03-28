import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import Rating from "react-rating"
import axios from "axios"
import { mutate } from "swr"

interface CafeReviewInputProps {
  cafeId: number
  cafeSlug: string
}

const CafeReviewInput: React.FC<CafeReviewInputProps> = ({
  cafeId,
  cafeSlug,
}) => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsAdding(true)
      const bodyContent = {
        review: {
          cafe_id: cafeId,
          title,
          rating,
          content,
        },
      }
      const { data } = await axios.post("/api/reviews", bodyContent, {
        withCredentials: true,
      })
      if (data.success) {
        setTitle("")
        setRating(0)
        setContent("")
        mutate(`/api/reviews/cafe/${cafeSlug}`)
        mutate(`/api/cafes/${cafeSlug}`)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title style={{ fontWeight: 600 }}>Add your review!</Card.Title>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Control
              type="text"
              placeholder="Enter content..."
              as="textarea"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="rating"
          >
            <Form.Label style={{ fontWeight: 600 }}>Your rating: </Form.Label>
            <Rating
              initialRating={rating}
              onClick={(value) => setRating(value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isAdding}>
            {isAdding ? "Adding review..." : "Add review"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CafeReviewInput
