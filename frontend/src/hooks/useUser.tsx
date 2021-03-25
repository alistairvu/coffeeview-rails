import { useSelector } from "react-redux"
import { rootState } from "../redux"

const useUser = () => {
  const { isLoggedIn, userInfo } = useSelector((state: rootState) => state.user)

  return { isLoggedIn, userInfo }
}

export default useUser
