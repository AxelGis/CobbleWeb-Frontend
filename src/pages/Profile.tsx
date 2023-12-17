import Spinner from '../components/Spinner'
import ImageGallery from 'react-image-gallery'
import { useAppSelector } from '../hooks/redux'
import { type Photo } from '../types/auth'

/**
 * Profile page
 */
const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.auth)

  return (
    <div>
    {
      userInfo !== null
        ? (
          <div className="flex flex-col space-y-4">
            <div className="inline-block my-2 rounded-full bg-gray-800 pr-5 h-20 text-slate-100 font-bold m-auto">
              <img className="rounded-full float-left h-full" src={userInfo?.avatar} />
              <span className="ml-3" style={{ lineHeight: '5rem' }}>
                {userInfo?.fullName}
              </span>
            </div>

            <div className='m-auto max-w-lg'>
            {
              userInfo?.photos !== null && userInfo?.photos !== undefined && userInfo?.photos.length > 0 &&
              <ImageGallery items={userInfo?.photos?.map((photo: Photo) => ({
                thumbnail: photo.url,
                original: photo.url
              }))}
              />
            }
            </div>

          </div>
          )
        : (<Spinner />)
    }
    </div>
  )
}

export default Profile
