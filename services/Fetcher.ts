import { cookieHelper } from '../helpers/CookieHelper';
import { API_URL } from '@env';

export const fetcher = async (key: string) => {
    const access_token = cookieHelper.getCookie('access_token');
    const res = await fetch(API_URL + key, {
        headers: {
            Authorization: `bearer ${access_token}`,
        },
    });
    return res.json();
};
