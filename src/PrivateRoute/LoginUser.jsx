import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LogIn from "../pages/LogIn";

export default function LoginUserRoute(){
    const user = useSelector((user)=> user.login.logIn)
    return user ? <Outlet/> : <LogIn/>
}