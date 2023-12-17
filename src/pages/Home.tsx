import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

/**
 * Home page for
 */
const HomeScreen = () => {
  const { userInfo } = useAppSelector((state) => state.auth)

  return (
    <div className="flex flex-col space-y-4">
      {userInfo !== null
        ? (
      <div className="flex flex-col space-y-4">
        <h1>Hello, { userInfo?.fullName }</h1>
        <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto" to='/profile'>
          Profile
        </NavLink>
      </div>

          )
        : (
      <div className="flex flex-col space-y-4">
        <h1>You are not authorized</h1>
        <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto" to='/login'>
          Login
        </NavLink>
      </div>
          )
      }
    </div>
  )
}

export default HomeScreen
