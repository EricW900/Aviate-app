import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import type { ReactNode } from "react";

type AlertType = "success" | "error";

interface AlertData {
    message: string;
    type: AlertType;
}

interface AlertContextType {
    alert: AlertData | null,
    showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext({} as AlertContextType);

export const AlertProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [alert, setAlert] = useState<AlertData | null>(null);

    const showAlert = useCallback((
        message: string,
        type: AlertType
    ) => {
        setAlert({
            message,
            type,
        });

        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }, []);

    return (
        <AlertContext.Provider
            value={{
                alert,
                showAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
