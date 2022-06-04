import { LinearProgress } from "@mui/material";
import { createContext, useContext, useState } from "react";

const SpinnerContext = createContext();

const SpinnerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => {
        setLoading(true);
    }

    const hideLoader = () => {
        setLoading(false);
    }

    return (<SpinnerContext.Provider value={{ loading, hideLoader, showLoader }}>
        {loading && <LinearProgress color="success" />}
        {children}
    </SpinnerContext.Provider>)
}

export const useSpinner = () => {
    return useContext(SpinnerContext);
}

export default SpinnerProvider;