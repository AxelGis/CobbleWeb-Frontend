import { useEffect, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Success from '../components/Success'
import Spinner from '../components/Spinner'
import { registerUser } from '../services/auth.service'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { type UserRegister } from '../types/auth'

/**
 * Register page
 */
const Register = () => {
  const [customError, setCustomError] = useState<string | null>(null)
  const [multipleImages, setMultipleImages] = useState<string[]>([])

  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<UserRegister & { confirmPassword: string }>()

  useEffect(() => {
    if (userInfo !== null) navigate('/profile')
  }, [navigate, userInfo, success])

  const submitForm = (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    data.email = data.email.toLowerCase()

    const formData = new FormData()
    const excludeKeys = ['photos', 'photo', 'confirmPassword']
    Object.keys(data).filter(key => !excludeKeys.includes(key)).forEach(key => {
      formData.append(key, data[key] as string)
    })

    Object.keys(multipleImages).forEach(key => {
      formData.append('photos[]', data.photos[key] as string)
    })

    dispatch(registerUser(formData))
  }

  const changeMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const images = Array.from(e.target.files).map((file: File) =>
        URL.createObjectURL(file)
      )
      setMultipleImages((prev) => [...prev, ...images])
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col space-y-4 bg-gray-100 p-4 rounded">
        {success && <Success>Registered!</Success>}
        {error !== null && <Error>{error}</Error>}
        {customError !== null && <Error>{customError}</Error>}
        <div className="flex flex-col space-y-2">
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            className="border border-gray-400 p-2 rounded"
            {...register('firstName')}
            required
            minLength={2} maxLength={25}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor='firstName'>Last Name</label>
          <input
            type='text'
            className="border border-gray-400 p-2 rounded"
            {...register('lastName')}
            required
            minLength={2} maxLength={25}
          />
        </div>
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
            minLength={6} maxLength={50}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor='email'>Confirm Password</label>
          <input
            type='password'
            className="border border-gray-400 p-2 rounded"
            {...register('confirmPassword')}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor='photos'>Images</label>
          <input
            type='file'
            multiple
            className="border border-gray-400 p-2 rounded"
            {...register('photos')}
            onChange={changeMultipleFiles}
          />
        </div>
        <button type='submit' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? <Spinner /> : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
