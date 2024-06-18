import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from 'js-cookie';


export const isAuthenticated = () => {
    return document.cookie.includes('jwtToken');
}

export const Logout = () => {
    const {setIsAuth,isAuth,changeAuthState} = useContext(AuthContext);
    const logout = () => {
        // document.cookie = `jwtToken=''; max-age=0; userInfo=''`;
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
            Cookies.remove(cookie);
        }
        
        setIsAuth(false);
        changeAuthState();
        console.log('Logout called');
        // handleLogout();
        window.location.reload();
    }

    if(!isAuth){
        return null;
    }
    
    return (
        <button className="btn btn-danger" onClick={logout}>Log Out</button>
    )
}