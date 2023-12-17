import { type ErrorProps } from './Error'

/**
 * Success component
 */
const Success = ({ children, ...props }: ErrorProps) => {
  return (
    <div
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
      {...props}
    >
      {children}
    </div>
  )
}

export default Success
