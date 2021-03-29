import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUser } from "../../redux/user"

interface LoginInfoInterface {
  email: string
  password: string
}

const AuthLoginForm: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoInterface>({
    email: "",
    password: "",
  })
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string>("")
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoggingIn(true)
      const { data } = await axios.post(
        "/api/auth/login",
        { user: loginInfo },
        { withCredentials: true }
      )
      console.log(data)
      if (data.logged_in) {
        setIsLoggingIn(false)
        dispatch(loginUser(data.user))
        history.push("/")
      }
    } catch (err) {
      setLoginError(err.response.data.message)
      setIsLoggingIn(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email..."
          value={loginInfo.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password..."
          value={loginInfo.password}
          onChange={handleChange}
        />
      </Form.Group>

      {loginError && <Alert variant="danger">{loginError}</Alert>}

      <Button variant="primary" type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Log in"}
      </Button>
    </Form>
  )
}

export default AuthLoginForm
