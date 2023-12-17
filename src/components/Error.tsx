export interface ErrorProps {
  children: any
  [key: string]: any
}

/**
 * Error component
 */
const Error = ({ children, ...props }: ErrorProps) => {
  return (
    <div
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </div>
  )
}

export default Error
