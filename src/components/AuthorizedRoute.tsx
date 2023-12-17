import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

/**
 * If unauthorized return this component for route
 */
const ProtectedRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth)

  if (userInfo === null) {
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="text-center">Unauthorized</h1>
        <span>
          <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto" to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedRoute
