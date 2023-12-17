import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from '../services/auth.service'
import { type UserLogin } from '../types/auth'

interface AuthState {
  loading: boolean
  userInfo: UserLogin | null
  access_token: string | null
  error: Error | null
  success: boolean
}

const access_token = localStorage.getItem('access_token')

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  access_token,
  error: null,
  success: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access_token')
      state.loading = false
      state.userInfo = null
      state.access_token = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    clearSuccess: (state) => {
      state.success = false
    }
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.access_token = payload.access_token
    })
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload as Error
    })
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload as Error
    })
  }
})

export const { logout, setCredentials, clearSuccess } = authSlice.actions

export default authSlice.reducer
