import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUser } from "../../redux/user"

interface SignUpInfoInterface {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

const AuthLoginForm: React.FC = () => {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfoInterface>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
  const [signUpError, setSignUpError] = useState<string>("")
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsSigningUp(true)
      const { data } = await axios.post(
        "/api/auth/signup",
        { user: signUpInfo },
        { withCredentials: true }
      )
      console.log(data)
      if (data.success) {
        setIsSigningUp(false)
        dispatch(loginUser(data.user))
        history.push("/")
      }
    } catch (err) {
      setSignUpError(err.response.data.message)
      setIsSigningUp(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          placeholder="Enter first name..."
          value={signUpInfo.first_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          placeholder="Enter last name..."
          value={signUpInfo.last_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email..."
          value={signUpInfo.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password..."
          value={signUpInfo.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password_confirmation">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password_confirmation"
          placeholder="Confirm password..."
          value={signUpInfo.password_confirmation}
          onChange={handleChange}
        />
      </Form.Group>

      {signUpError && <Alert variant="danger">{signUpError}</Alert>}

      <Button variant="primary" type="submit" disabled={isSigningUp}>
        {isSigningUp ? "Signing up..." : "Sign up"}
      </Button>
    </Form>
  )
}

export default AuthLoginForm
