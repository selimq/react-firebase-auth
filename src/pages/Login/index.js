import { Navigate, Outlet } from "react-router";
import { DASHBOARD, LOGIN } from "../../navigation/CONSTANTS";
import Login from './Login'
const exportedObject = (isAuth) => {

    return {
        name: 'Login',
        path: LOGIN,
        element: <Outlet />,
        children: [
            { path: '/', element: isAuth ? <Navigate to={DASHBOARD} /> : <Login /> }
        ]
    }
}
export default exportedObject