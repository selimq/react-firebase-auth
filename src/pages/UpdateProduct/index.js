import { Navigate, Outlet } from "react-router";
import { UPDATEPRODUCT, LOGIN } from "../../navigation/CONSTANTS";
import UpdateProduct from "./UpdateProduct";
const exportedObject = (isAuth, props) => {
    return {
        name: "UpdateProduct",
        path: UPDATEPRODUCT,
        element: < Outlet / > ,
        children: [{
            path: "/",
            element: isAuth ? < UpdateProduct / > : < Navigate to = { LOGIN }
            />,
        }, ],
    };
};
export default exportedObject;