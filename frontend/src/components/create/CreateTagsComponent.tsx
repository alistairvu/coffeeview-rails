import { useState } from "react"
import Form from "react-bootstrap/Form"
import Badge from "react-bootstrap/Badge"

interface CreateTagsComponentProps {
  tags: string[]
  removeFromTags: (tag: string) => void
  addToTags: (tag: string) => void
}

const CreateTagsComponent: React.FC<CreateTagsComponentProps> = ({
  tags,
  removeFromTags,
  addToTags,
}) => {
  const [currentTag, setCurrentTag] = useState<string>("")

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addToTags(currentTag)
      setCurrentTag("")
    }
  }

  return (
    <Form.Group className="mb-3" controlId="tags">
      <Form.Label>Tags:</Form.Label>
      <div>
        {tags.map((tag, index) => (
          <Badge bg="secondary" className="me-1 mb-3" key={index}>
            {tag}{" "}
            <span
              style={{ cursor: "pointer", fontWeight: 600, marginLeft: 5 }}
              onClick={() => removeFromTags(tag)}
            >
              x
            </span>
          </Badge>
        ))}
      </div>
      <Form.Control
        type="text"
        name="hours"
        placeholder="Enter your tags..."
        value={currentTag}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentTag(e.target.value)
        }
        onKeyPress={handleKeyPress}
      />
    </Form.Group>
  )
}

export default CreateTagsComponent
