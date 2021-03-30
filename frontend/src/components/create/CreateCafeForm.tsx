import Form from "react-bootstrap/Form"
import CreateTagsComponent from "./CreateTagsComponent"
import CreateCafeModal from "./CreateCafeModal"
import { useState } from "react"
import Button from "react-bootstrap/Button"

interface CafeInfoInterface {
  name: string
  address: string
  description: string
  hours: string
  district: string
  tags: string[]
  price: string
}

const CreateCafeForm: React.FC = () => {
  const DISTRICT_LIST = [
    "Hoan Kiem",
    "Ba Dinh",
    "Hai Ba Trung",
    "Dong Da",
    "Tay Ho",
    "Cau Giay",
    "Long Bien",
    "Thanh Xuan",
    "Bac Tu Liem",
    "Ha Dong",
    "Hoang Mai",
    "Nam Tu Liem",
  ]

  const [cafeInfo, setCafeInfo] = useState<CafeInfoInterface>({
    name: "",
    address: "",
    description: "",
    hours: "",
    district: "",
    tags: [],
    price: "",
  })
  const [isModalShown, setIsModalShown] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCafeInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addToTags = (tag: string) => {
    const formattedTag = (
      tag.trim().charAt(0).toUpperCase() + tag.trim().substr(1).toLowerCase()
    ).trim()
    setCafeInfo((prev) => ({ ...prev, tags: [...prev.tags, formattedTag] }))
  }

  const removeFromTags = (tag: string) => {
    setCafeInfo((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(cafeInfo)
    setIsModalShown(true)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your cafe's name..."
          value={cafeInfo.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address:</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          name="address"
          placeholder="Enter your cafe's address..."
          value={cafeInfo.address}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="district">
        <Form.Label>District:</Form.Label>
        <Form.Select
          name="district"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCafeInfo((prev) => ({ ...prev, district: e.target.value }))
          }
          required
        >
          <option value="">Select...</option>
          {DISTRICT_LIST.map((district) => (
            <option value={district} key={district}>
              {district}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          name="description"
          placeholder="Describe your cafe..."
          value={cafeInfo.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <CreateTagsComponent
        tags={cafeInfo.tags}
        addToTags={addToTags}
        removeFromTags={removeFromTags}
      />
      <Form.Group className="mb-3" controlId="hours">
        <Form.Label>Hours:</Form.Label>
        <Form.Control
          type="text"
          name="hours"
          placeholder="When is your cafe open?..."
          value={cafeInfo.hours}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="hours">
        <Form.Label>Price Level:</Form.Label>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check
            inline
            label="$"
            name="price"
            type="radio"
            value="1"
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="$$"
            name="price"
            type="radio"
            value="2"
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="$$$"
            name="price"
            type="radio"
            value="3"
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="$$$$"
            name="price"
            type="radio"
            value="4"
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="$$$$$"
            name="price"
            type="radio"
            value="5"
            onChange={handleChange}
          />
        </div>
        <Form.Text>[$ - least expensive, $$$$$ - most expensive]</Form.Text>
      </Form.Group>
      <CreateCafeModal
        cafeInfo={cafeInfo}
        show={isModalShown}
        hideHandler={() => setIsModalShown(false)}
      />
      <Button type="submit" variant="primary">
        Add your cafe
      </Button>
    </Form>
  )
}

export default CreateCafeForm
