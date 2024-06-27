import React, { useContext, useState } from "react";
const AuthContext=React.createContext(
    {
        token:'',
        isLoggedIn: false,
        login:(token)=>{},
        logout:()=>{}

    }
);

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const[token,setToken]=useState(initialToken)
    const userIsloggedIn = !!token;

    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token)
    };
    const logOutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
    };
    const contextValue={
        token:token,
        isLoggedIn:userIsloggedIn,
        login:loginHandler,
        logout:logOutHandler
    };
    return <AuthContext.Provider value={contextValue}>{props.children} </AuthContext.Provider>
}

export default AuthContext; 

