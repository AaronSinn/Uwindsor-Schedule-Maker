import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const toastRef = useRef(null);

    const sendErrorMessage = (summary, msg) => {
        toastRef.current.show({ severity: 'error', summary, detail: msg, life: 3000 });
    };

    return (
        <ToastContext.Provider value={{ sendErrorMessage }}>
            <Toast ref={toastRef} position="top-right" />
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
