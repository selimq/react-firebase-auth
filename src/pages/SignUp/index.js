import { Navigate, Outlet } from 'react-router'
import { SIGNUP, DASHBOARD } from '../../navigation/CONSTANTS'
import SignUp from './SignUp'

const exportedObject = (isAuth) => {
    return {
        name: "Sign Up",
        path: SIGNUP,
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: isAuth ? <Navigate to={DASHBOARD} /> : <SignUp />
            }
        ]
    }
}

export default exportedObject
