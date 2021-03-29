import { AppHeader, AppFooter } from "./components/app"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loginUser, logoutUser, setLoaded } from "./redux/user"
import {
  HomePage,
  LoginPage,
  SignUpPage,
  BrowsePage,
  CafePage,
  ProfilePage,
  SearchPage,
} from "./pages"
import { Switch, Route } from "react-router-dom"

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
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
        dispatch(setLoaded())
      } catch (err) {
        console.log(err)
      }
    }

    checkAuth()
  }, [dispatch])

  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main style={{ minHeight: "95vh" }}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <SignUpPage />
          </Route>
          <Route path="/browse">
            <BrowsePage />
          </Route>
          <Route path="/cafe/:slug">
            <CafePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </main>

      <footer>
        <AppFooter />
      </footer>
    </>
  )
}

export default App
