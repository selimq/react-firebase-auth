import { Navigate, Outlet } from "react-router";
import { DASHBOARD, LOGIN } from "../../navigation/CONSTANTS";
import Dashboard from './Dashboard'
const exportedObject = (isAuth) => {
    return {
        name: 'Dashboard',
        path: DASHBOARD,
        element: <Outlet />,
        children: [
            { path: '/', element: isAuth ? <Dashboard /> : <Navigate to={LOGIN} /> }

        ]
    }
}
export default exportedObject