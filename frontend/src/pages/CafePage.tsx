import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { CafeInfo, CafeDescription, CafeReviewList } from "../components/cafe"

import { useParams, useHistory } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import useSWR from "swr"
import axios from "axios"

const CafePage: React.FC = () => {
  const params = useParams<{ slug: string }>()
  const history = useHistory()

  const getCafe = async () => {
    try {
      const { data } = await axios.get(`/api/cafes/${params.slug}`)
      return data.cafe
    } catch (err) {
      console.log(err)
    }
  }

  const { data: cafeData } = useSWR(`/api/cafes/${params.slug}`, getCafe)

  if (!cafeData) {
    return (
      <Container className="mt-3">
        <Button
          className="mb-3"
          variant="primary"
          onClick={() => history.goBack()}
        >
          <FaArrowLeft /> Return
        </Button>
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-3">
      <Button
        className="mb-3"
        variant="primary"
        onClick={() => history.goBack()}
      >
        <FaArrowLeft /> Return
      </Button>
      <h1>{cafeData.name}</h1>

      <Row className="mb-3">
        <Col lg={{ span: 8, order: 1 }}>
          <div className="text-center">
            <img
              src={cafeData.images[0]}
              alt={cafeData.name}
              style={{ maxHeight: 350, maxWidth: "100%" }}
              className="mb-3"
            />
          </div>
        </Col>
        <Col lg={{ span: 4, order: 2 }}>
          <CafeInfo {...cafeData} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={{ span: 4, order: 2 }}>
          <h2>About {cafeData.name}</h2>
          <CafeDescription description={cafeData.description} />
        </Col>
        <Col lg={{ span: 8, order: 1 }}>
          <h2>Reviews</h2>
          <CafeReviewList />
        </Col>
      </Row>
    </Container>
  )
}

export default CafePage
