import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useUnsavedChangesWarning = (isDirty) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty]);

    useEffect(() => {
        const handlePopState = (event) => {
            if (isDirty) {
                const confirmed = window.confirm("You have unsaved changes. Do you really want to leave?");
                if (!confirmed) {
                    event.preventDefault();
                    navigate(location.pathname, { replace: true });
                }
            }
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isDirty, navigate, location]);
};

export default useUnsavedChangesWarning;
