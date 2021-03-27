import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import axios from "axios"
import Row from "react-bootstrap/Row"
import { useState, useEffect } from "react"
import { BrowseCard } from "../components/browse"

const Browse: React.FC = () => {
  const [cafesData, setCafesData] = useState<CafeInterface[]>([])
  const [isCafeLoading, setIsCafeLoading] = useState<boolean>(false)

  const getCafeData = async () => {
    try {
      setIsCafeLoading(true)
      const { data } = await axios.get("/api/cafes")
      setCafesData(data.cafes)
    } catch (err) {
      console.log(err)
    } finally {
      setIsCafeLoading(false)
    }
  }

  useEffect(() => {
    getCafeData()
  }, [])

  const renderCafes = () => {
    if (isCafeLoading) {
      return (
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )
    }
    return (
      <Row>
        {cafesData.map((cafe) => (
          <BrowseCard key={cafe.id} {...cafe} />
        ))}
      </Row>
    )
  }

  console.log(cafesData)

  return (
    <Container className="pt-3">
      <h1>Browse</h1>
      {renderCafes()}
    </Container>
  )
}

export default Browse
