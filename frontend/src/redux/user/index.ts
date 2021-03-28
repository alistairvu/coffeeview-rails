import { createSlice } from "@reduxjs/toolkit"

interface UserInfoInterface {
  id: number
  first_name: string
  last_name: string
  email: string
  is_admin: string
}

const initialState = {
  isLoggedIn: false,
  isLoaded: false,
  userInfo: {} as UserInfoInterface,
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginUser: (state, action) => {
      const { id, first_name, last_name, email, is_admin } = action.payload

      state.isLoggedIn = true
      state.userInfo = {
        id,
        first_name,
        last_name,
        email,
        is_admin,
      }
    },

    logoutUser: () => initialState,
    setLoaded: (state) => {
      state.isLoaded = true
    },
  },
})

export const { loginUser, logoutUser, setLoaded } = userSlice.actions
export default userSlice.reducer
