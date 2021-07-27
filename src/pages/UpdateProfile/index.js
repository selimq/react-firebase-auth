import { Navigate, Outlet } from 'react-router'
import { LOGIN, UPDATEPROFILE } from '../../navigation/CONSTANTS'
import UpdateProfile from './UpdateProfile'

const exportedObject = (isAuth) => {
    return {
        name: "Update Profile",
        path: UPDATEPROFILE,
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: isAuth ? <UpdateProfile /> : <Navigate to={LOGIN} />
            }
        ]
    }
}
export default exportedObject
