import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import CreateTagsComponent from "./CreateTagsComponent"
import CreateCafeModal from "./CreateCafeModal"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import axios from "axios"

interface CafeInfoInterface {
  name: string
  address: string
  description: string
  hours: string
  district: string
  tags: string[]
  price: string
  images: string[]
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
    images: [],
  })
  const [isModalShown, setIsModalShown] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<{
    status: string
    message: string
  }>({ status: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCafeInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        setIsUploading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

        const { data } = await axios.post("/api/images", formData, config)
        if (data.success === 1) {
          console.log(data)
          setCafeInfo((prev) => ({
            ...prev,
            images: [...prev.images, data.image_url],
          }))
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsUploading(false)
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setSubmitStatus({ status: "", message: "" })
      setIsSubmitting(true)
      if (cafeInfo.tags.length > 0 && cafeInfo.images.length > 0) {
        const { data } = await axios.post("/api/cafes", cafeInfo)
        if (data.success) {
          setSubmitStatus({
            status: "success",
            message:
              "Cafe data submitted. Please wait for our admin to approve your cafe.",
          })
          setCafeInfo({
            name: "",
            address: "",
            description: "",
            hours: "",
            district: "",
            tags: [],
            price: "",
            images: [],
          })
        }
      } else {
        setSubmitStatus({ status: "danger", message: "Missing fields!" })
      }
    } catch {
      setSubmitStatus({
        status: "danger",
        message: "An error occurred – please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    setSubmitStatus({ status: "", message: "" })
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      {submitStatus.status && (
        <Alert variant={submitStatus.status}>{submitStatus.message}</Alert>
      )}
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
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image:</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleUpload}
          required
        />
        {cafeInfo.images.length > 0 && (
          <img
            src={cafeInfo.images[0]}
            style={{ height: 150 }}
            alt="Your cafe"
            className="mt-3"
          />
        )}
        {isUploading && <Form.Text>Uploading...</Form.Text>}
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
      <Button
        type="submit"
        variant="primary"
        className="me-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding your cafe..." : "Add your cafe"}
      </Button>
      <Button onClick={() => setIsModalShown(true)} variant="secondary">
        Preview your cafe
      </Button>
    </Form>
  )
}

export default CreateCafeForm
