import { type FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { userLogin } from '../services/auth.service'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import { type AuthLogin } from '../types/auth'

/**
 * Login page
 */
const Login = () => {
  const { loading, userInfo, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<AuthLogin>()

  // redirect authenticated user to profile page
  useEffect(() => {
    if (userInfo !== null) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data: FieldValues) => {
    dispatch(userLogin(data as unknown as AuthLogin))
  }

  return (
    <div className="flex flex-col space-y-4">
      <form className="flex flex-col space-y-4 bg-gray-100 p-4 rounded" onSubmit={handleSubmit(submitForm)}>
        {error !== null && <Error>{error}</Error>}
        <div className="flex flex-col space-y-2">
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className="border border-gray-400 p-2 rounded"
            {...register('email')}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className="border border-gray-400 p-2 rounded"
            {...register('password')}
            required
          />
        </div>
        <button type='submit' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
