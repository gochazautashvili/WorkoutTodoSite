import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext(null)

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))

        if (userData) {
            dispatch({ type: "LOGIN", payload: userData })
        }

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
