import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/user.service'
import { logout, setCredentials } from '../stores/auth.slice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import Spinner from './Spinner'

/**
 * Header with register/login buttons
 */
const Header = () => {
  const { userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  // get user details, repeat each 15 min
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000
  })

  useEffect(() => {
    if (data != null) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <header>
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <div className="text-white font-bold">
          <NavLink to='/'>
            CobbleWeb - Frontend
          </NavLink>
        </div>
        <div>
          { !isFetching
            ? (userInfo != null
                ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
                  )
                : (
              <div>
                <NavLink className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-2 rounded" to='/register'>
                  Register
                </NavLink>
                <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to='/login'>
                  Login
                </NavLink>
              </div>
                  ))
            : <Spinner />
          }
        </div>
      </nav>
    </header>
  )
}

export default Header
