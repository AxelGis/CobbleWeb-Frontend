import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '../stores/auth.store'
import { type User } from '../types/auth'

const baseUrl = process.env.REACT_APP_API_URL

/**
 * User API
 */
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token
      if (token != null) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    }
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<User, unknown>({
      query: () => ({
        url: '/users/me',
        method: 'GET'
      })
    })
  })
})

export const { useGetUserDetailsQuery } = Api
