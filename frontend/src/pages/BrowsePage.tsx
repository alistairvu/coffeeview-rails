import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import axios from "axios"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import { BrowseCard } from "../components/browse"
import useSWR from "swr"

const Browse: React.FC = () => {
  const getCafeData = async () => {
    try {
      const { data } = await axios.get("/api/cafes")
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

  console.log(swrData)

  return (
    <Container className="pt-3">
      <h1>Browse</h1>
      {renderCafes()}
    </Container>
  )
}

export default Browse
