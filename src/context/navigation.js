import { useEffect, useState } from "react";
import { createContext } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
    
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const routerHandler = () => {
            setCurrentPath(window.location.pathname);
        };

        document.addEventListener("popstate", routerHandler);

        // Cleanup function for event listner
        return document.removeEventListener("popstate", routerHandler);
        // Cleanup function for event listner
    }, []);

    const navigationTo = (to) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }

    return (
        <NavigationContext.Provider value={{currentPath,navigationTo}}>
            {/* {currentPath} */}
            {children}
        </NavigationContext.Provider>
    );
}

export { NavigationProvider };
export default NavigationContext;