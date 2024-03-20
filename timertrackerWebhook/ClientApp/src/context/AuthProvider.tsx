import { initial } from "lodash";
import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
// import { useNavigate } from "react-router-dom";

type Props = { children?: React.ReactNode };

const AuthContext = createContext({});
const client = new Api({
    baseUrl: "http://localhost:8080"
}).api;



export const AuthProvider = ({children} : Props) => {
    // const [currentUser, setCurrentUser] = useState(null);
    // const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [loading, setLoading] = useState(true);

    const login = async (payload: any) => {
        await client.login({});
    }
    
}
//     const navigate = useNavigate();
//     const [token, setToken] = useState({});
//     const [user, setUser] = useState({});
//     const [isReady, setIsReady] = useState(false);

//     useEffect(() => {
        
//     })

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;