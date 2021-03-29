import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { useHistory } from "react-router-dom"

const AppSearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("")
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    history.push(`/search?q=${query}`)
  }

  return (
    <Form
      className="d-flex justify-content-center align-items-center my-3 my-lg-0"
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search..."
        style={{ width: "100%" }}
      />
      <Button variant="secondary" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default AppSearchForm
