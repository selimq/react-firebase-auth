import { Navigate, Outlet } from "react-router";
import { ADDPRODUCT, LOGIN } from "../../navigation/CONSTANTS";
import AddProduct from './AddProduct'
const exportedObject = (isAuth) => {
    return {
        name: 'AddProduct',
        path: ADDPRODUCT,
        element: <Outlet />,
        children: [
            { path: '/', element: isAuth ? <AddProduct /> : <Navigate to={LOGIN} /> }

        ]
    }
}
export default exportedObject