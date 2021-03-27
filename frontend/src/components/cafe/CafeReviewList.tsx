import Spinner from "react-bootstrap/Spinner"
import useSWR from "swr"
import CafeReview from "./CafeReview"
import axios from "axios"
import { useParams } from "react-router-dom"

const CafeReviewList: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  const getReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/cafe/${slug}`)
      return data.reviews
    } catch (err) {
      console.log(err)
    }
  }

  const { data: reviewData } = useSWR(`/api/reviews/cafe/${slug}`, getReviews)

  if (!reviewData) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <>
      {reviewData.map((review: ReviewInterface) => (
        <CafeReview {...review} key={review.id} />
      ))}
    </>
  )
}

export default CafeReviewList
