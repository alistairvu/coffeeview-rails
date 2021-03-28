import { useSelector } from "react-redux"
import { rootState } from "../redux"

const useUser = () => {
  const { isLoggedIn, userInfo, isLoaded } = useSelector(
    (state: rootState) => state.user
  )

  return { isLoggedIn, userInfo, isLoaded }
}

export default useUser
