import Modal from "react-bootstrap/Modal"
import renderPrice from "../../utils/renderPrice"

interface CreateCafeModalInterface {
  show: boolean
  hideHandler: () => void
  cafeInfo: {
    name: string
    address: string
    description: string
    hours: string
    district: string
    tags: string[]
    price: string
    images: string[]
  }
}

const CreateCafeModal: React.FC<CreateCafeModalInterface> = ({
  show,
  hideHandler,
  cafeInfo,
}) => {
  return (
    <Modal show={show} onHide={hideHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Check your cafe's information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <strong>Name: </strong> {cafeInfo.name}
        </p>
        <p>
          <strong>Address: </strong> {cafeInfo.address}
        </p>
        <p>
          <strong>District: </strong> {cafeInfo.district}
        </p>
        <p>
          <strong>Description: </strong> {cafeInfo.description}
        </p>
        <p>
          <strong>Image: </strong> <br />
          <img
            src={cafeInfo.images[0]}
            alt={cafeInfo.name}
            style={{ height: 150 }}
          />
        </p>
        <p>
          <strong>Tags: </strong> {cafeInfo.tags.join(", ")}
        </p>
        <p>
          <strong>Hours: </strong> {cafeInfo.hours}
        </p>
        <p>
          <strong>Price: </strong> {renderPrice(cafeInfo.price)}
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCafeModal
