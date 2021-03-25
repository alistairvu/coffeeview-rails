import { AppHeader } from "./components/app"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loginUser, logoutUser } from "./redux/user"
import { HomePage, LoginPage } from "./pages"
import { Switch, Route } from "react-router-dom"

const App: React.FC = () => {
  const dispatch = useDispatch()

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/logged_in", {
        withCredentials: true,
      })

      if (data.logged_in) {
        dispatch(loginUser(data.user))
      } else {
        dispatch(logoutUser())
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App
