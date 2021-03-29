import { AppHeader, AppFooter } from "./components/app"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useEffect, lazy, Suspense } from "react"
import { loginUser, logoutUser, setLoaded } from "./redux/user"
import { Switch, Route } from "react-router-dom"

const HomePage = lazy(() => import("./pages/HomePage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const SignUpPage = lazy(() => import("./pages/SignUpPage"))
const BrowsePage = lazy(() => import("./pages/BrowsePage"))
const CafePage = lazy(() => import("./pages/CafePage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const SearchPage = lazy(() => import("./pages/SearchPage"))

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
      <main style={{ marginTop: 70 }}>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={null}>
              <HomePage />
            </Suspense>
          </Route>
          <Route path="/login">
            <Suspense fallback={null}>
              <LoginPage />
            </Suspense>
          </Route>
          <Route path="/register">
            <Suspense fallback={null}>
              <SignUpPage />
            </Suspense>
          </Route>
          <Route path="/browse">
            <Suspense fallback={null}>
              <BrowsePage />
            </Suspense>
          </Route>
          <Route path="/cafe/:slug">
            <Suspense fallback={<div className="loading-component" />}>
              <CafePage />
            </Suspense>
          </Route>
          <Route path="/profile">
            <Suspense fallback={null}>
              <ProfilePage />
            </Suspense>
          </Route>
          <Route path="/search">
            <Suspense fallback={null}>
              <SearchPage />
            </Suspense>
          </Route>
        </Switch>
      </main>

      <footer className="bg-light py-3">
        <AppFooter />
      </footer>
    </>
  )
}

export default App
