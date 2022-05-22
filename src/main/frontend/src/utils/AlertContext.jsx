import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const defaultFeedback = {
        severity: 'error',
        title: '',
        open: false
    };
    const [feedback, setFeedback] = useState(defaultFeedback);

    const handleCloseFeedback = () => setFeedback(defaultFeedback);

    return <AlertContext.Provider value={{feedback, setFeedback, handleCloseFeedback}}>{children}</AlertContext.Provider>
}

export const useAlert = () => {
    return useContext(AlertContext);
}

export default AlertProvider;