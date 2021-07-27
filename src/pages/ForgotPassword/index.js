import { Navigate, Outlet } from 'react-router'
import { DASHBOARD, FORGOTPASSWORD } from '../../navigation/CONSTANTS'
import ForgotPasword from './ForgotPassword'

const exportedObject = (isAuth) => {
    return {
        name: "Forgot Password",
        path: FORGOTPASSWORD,
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: isAuth ? <Navigate to={DASHBOARD} /> : <ForgotPasword />
            }
        ]
    }
}

export default exportedObject
