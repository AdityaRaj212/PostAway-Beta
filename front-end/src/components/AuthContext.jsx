import React,{useState, useEffect, createContext} from "react";
import { isAuthenticated } from "./auth";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuth,setIsAuth] = useState(isAuthenticated());
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setIsAuth(isAuthenticated());
        console.log(isAuthenticated());
    },[isAuth]);

    const changeAuthState = ()=>{
        setIsAuth(false);
    }

    return(
        <AuthContext.Provider value={{isAuth,setIsAuth, changeAuthState}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext,AuthProvider};