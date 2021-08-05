import { Navigate, Outlet } from "react-router";
import { LISTPRODUCTS, LOGIN } from "../../navigation/CONSTANTS";
import ListProducts from "./ListProducts";
const exportedObject = (isAuth) => {
  return {
    name: "ListProducts",
    path: LISTPRODUCTS,
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: isAuth ? <ListProducts /> : <Navigate to={LOGIN} />,
      },
    ],
  };
};
export default exportedObject;
