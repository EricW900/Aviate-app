import { useAlert } from "../../context/AlertContext";
import Alert from "./Alert";

const AlertContainer = () => {
    const { alert } = useAlert();

    if (!alert) return null;

    return (
        <Alert message={alert.message} type={alert.type}
         />
    );
};

export default AlertContainer;