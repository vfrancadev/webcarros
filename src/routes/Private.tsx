import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateProps{
    children: ReactNode
}

export function Private ({children} : PrivateProps): any {

    const {signed, loadingAuth} = useContext(AuthContext);

    if(loadingAuth){
        return <div></div>

    }

    if(!signed){
        
        return <Navigate to="/login"/>
    
    }

    return children;
}