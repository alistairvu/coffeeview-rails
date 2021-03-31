import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loginUser } from "../../redux/user"
import useUser from "../../hooks/useUser"

interface SignUpInfoInterface {
  first_name: string
  last_name: string
  email: string
}

const ProfileUpdateForm: React.FC = () => {
  const { userInfo, isLoggedIn, isLoaded } = useUser()
  const [updateInfo, setUpdateInfo] = useState<SignUpInfoInterface>({
    first_name: "",
    last_name: "",
    email: "",
  })
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [updateError, setUpdateError] = useState<string>("")
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userInfo.id}`)
        if (data.success) {
          setUpdateInfo({
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            email: data.user.email,
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (isLoaded && !isLoggedIn) {
      history.push("/login")
    } else if (isLoaded && isLoggedIn) {
      fetchInitData()
    }
  }, [isLoaded, isLoggedIn, history, userInfo.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setPasswordError("")
      setIsUpdating(true)

      if (password.length > 0 && password !== passwordConfirmation) {
        setPasswordError("Passwords do not match")
        setIsUpdating(false)
        return
      }

      const updateData =
        password.length > 0 && password === passwordConfirmation
          ? {
              ...updateInfo,
              password: password,
              password_confirmation: passwordConfirmation,
            }
          : updateInfo
      console.log(updateData)
      const { data } = await axios.put(
        `/api/users/${userInfo.id}`,
        { user: updateData },
        { withCredentials: true }
      )
      if (data.success) {
        setIsUpdating(false)
        dispatch(loginUser(data.user))
      }
    } catch (err) {
      setUpdateError(err.response.data.message)
      setIsUpdating(false)
    }
    console.log(updateInfo)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          placeholder="Enter first name..."
          value={updateInfo.first_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          placeholder="Enter last name..."
          value={updateInfo.last_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email..."
          value={updateInfo.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password_confirmation">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password_confirmation"
          placeholder="Confirm password..."
          value={passwordConfirmation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
        />
      </Form.Group>

      {passwordError && <Alert variant="danger">{passwordError}</Alert>}
      {updateError && <Alert variant="danger">{updateError}</Alert>}

      <Button variant="primary" type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </Form>
  )
}

export default ProfileUpdateForm
