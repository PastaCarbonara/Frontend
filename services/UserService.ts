import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import { cookieHelper } from '../helpers/CookieHelper';
import { fetcher } from './Fetcher';
import useSWR from 'swr';

async function fetchMe() {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

function useMe() {
    const { data, error } = useSWR('/me', fetcher);

    return {
        me: data,
        isLoading: !error && !data,
        isError: error,
    };
}

const userService = {
    fetchMe,
    useMe,
};

export default userService;
