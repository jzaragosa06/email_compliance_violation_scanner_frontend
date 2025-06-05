import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useVerifyQuery = () => {
        const location = useLocation();
    const [verify, setVerify] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const verifyParam = queryParams.get("verify");

        setVerify(verifyParam === "true");
    }, [location.search]);

    return verify; 

}