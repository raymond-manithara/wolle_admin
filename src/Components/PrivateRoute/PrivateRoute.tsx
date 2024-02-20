import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "../../app.const"


const PrivateRoute = ()=>{
    const localToken = localStorage.getItem(TOKEN);

    return localToken?<Outlet/>:<Navigate to="/" replace/>
}

export default PrivateRoute;