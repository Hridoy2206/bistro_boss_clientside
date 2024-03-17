import { createContext, useState } from "react";

export const StateContext = createContext();
const GlobalStateManagment = ({ children }) => {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const stateInfo = {
        navbarToggle,
        setNavbarToggle,
        sidebarToggle,
        setSidebarToggle
    }
    return (
        <StateContext.Provider value={stateInfo}>
            {children}
        </StateContext.Provider>
    )
};

export default GlobalStateManagment;