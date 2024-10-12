import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
// import LogIn from "../pages/LogIn";

export default function NotLoginUserRoute(){
    const user = useSelector((user)=> user.login.logIn)
    return user ? <Navigate to='/'/> : <Outlet/>
}