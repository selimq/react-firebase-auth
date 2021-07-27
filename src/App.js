import RouterConfig from "./navigation/RouterConfig";
import { useRoutes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function App() {
  const { isAuth } = useAuth();
  const routing = useRoutes(RouterConfig(isAuth));

  return <>{routing}</>;
}
export default App;
