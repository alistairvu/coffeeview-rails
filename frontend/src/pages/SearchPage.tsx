import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import { BrowseCard } from "../components/browse"
import axios from "axios"
import useSWR from "swr"
import { useLocation } from "react-router-dom"

const SearchPage: React.FC = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get("q")
  const pageNumber = new URLSearchParams(location.search).get("page")

  const fetchResults = async () => {
    try {
      const { data } = await axios.get(
        `/api/cafes/search?q=${query}&page=${pageNumber}`
      )
      if (data.success) {
        return data.results
      }
      return []
    } catch (err) {
      console.log(err)
    }
  }

  const { data: searchData, error } = useSWR(
    `/api/cafes/search?q=${query}`,
    fetchResults,
    { revalidateOnFocus: true }
  )

  const renderResults = () => {
    if (!searchData) {
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
        {searchData.map((cafe: CafeInterface) => (
          <BrowseCard key={cafe.id} {...cafe} />
        ))}
      </Row>
    )
  }

  return (
    <Container className="mt-3">
      <h1>Results for "{query}"</h1>
      {renderResults()}
    </Container>
  )
}

export default SearchPage
