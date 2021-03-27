import Card from "react-bootstrap/Card"

interface CafeDescriptionProps {
  description: string
}

const CardDescription: React.FC<CafeDescriptionProps> = ({ description }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardDescription
