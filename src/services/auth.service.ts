import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type AuthLogin, type UserLogin } from '../types/auth'

const baseUrl = process.env.API_URL

/**
 * Login user
 */
export const userLogin = createAsyncThunk(
  '/login',
  async ({ email, password }: AuthLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserLogin>(
        `${baseUrl}/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // store user's token in local storage
      localStorage.setItem('access_token', data.access_token)

      return data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message !== undefined) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue((error as Error).message)
      }
    }
  }
)

/**
 * Register new user
 */
export const registerUser = createAsyncThunk(
  '/register',
  async (data: FormData, { rejectWithValue }) => {
    try {
      await axios.post(
        `${baseUrl}/register`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message !== undefined) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue((error as Error).message)
      }
    }
  }
)
