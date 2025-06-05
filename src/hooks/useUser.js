import { useEffect, useState } from "react"
import { fetchUser } from "../services/userService";

export const useUser = () => {
    const [user, setUser] = useState();
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState('');

    useEffect(() => {

        const fetchUserInfo = async () => {
            setIsLoadingUser(true);

            try {
                const response = await fetchUser();
                setUser({
                    user_email: response.data.user.email,
                    created_at: response.data.user.created_at,
                    first_name: response.data.user.UserInfo.first_name,
                    last_name: response.data.user.UserInfo.last_name,
                    country: response.data.user.UserInfo.country,
                    contact_number: response.data.user.UserInfo.contact_number,
                    job_title: response.data.user.UserInfo.job_title,
                    is_verified: response.data.user.UserInfo.is_verified,
                });
            } catch (error) {
                console.log(error);
                setErrorUser(`failed to fetch user. ${error.message}`)
            }
            finally {
                setIsLoadingUser(false);
            }
        }

        fetchUserInfo();
    }, []);

    return { user, setUser, isLoadingUser, errorUser };
}