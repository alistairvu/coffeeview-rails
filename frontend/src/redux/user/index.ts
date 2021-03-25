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
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
