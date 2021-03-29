import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import axios from "axios"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import { BrowseCard } from "../components/browse"
import useSWR from "swr"
import { useLocation } from "react-router-dom"
import { useRef } from "react"
import Helmet from "react-helmet"

const Browse: React.FC = () => {
  const location = useLocation()
  const pageNumberRef = useRef<number>(0)

  const getCafeData = async () => {
    try {
      const pageNumber = new URLSearchParams(location.search).get("page")
      const url = pageNumber ? `/api/cafes?page=${pageNumber}` : "/api/cafes"
      const { data } = await axios.get(url)
      pageNumberRef.current = data.page_count
      return data.cafes
    } catch (err) {
      console.log(err)
    }
  }

  const { data: swrData, error } = useSWR("/api/cafes", getCafeData)

  const renderCafes = () => {
    if (!swrData) {
      return (
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>
    }

    return (
      <Row>
        {swrData.map((cafe: CafeInterface) => (
          <BrowseCard key={cafe.id} {...cafe} />
        ))}
      </Row>
    )
  }

  return (
    <>
      <Helmet>
        <title>Browse | coffeeview</title>
      </Helmet>

      <Container className="pt-3">
        <h1>Browse</h1>
        {renderCafes()}
      </Container>
    </>
  )
}

export default Browse
