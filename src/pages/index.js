import SignUp from "./SignUp";
import Login from "./Login";
import NotFound from "../navigation/NotFound";
import Dashboard from "./Dashboard/";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import AddProduct from "./AddProduct";
import ListProducts from "./ListProducts";
import UpdateProduct from "./UpdateProduct";

function pages(isAuth) {
    return [
        SignUp(isAuth),
        Login(isAuth),
        Dashboard(isAuth),
        ForgotPassword(isAuth),
        UpdateProfile(isAuth),
        AddProduct(isAuth),
        UpdateProduct(isAuth),
        ListProducts(isAuth),
        { path: "*", element: < NotFound / > },
    ];
}

export default pages;