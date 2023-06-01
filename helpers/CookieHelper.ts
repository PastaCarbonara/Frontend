const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
};

const setCookie = (name: string, value: string, days: number) => {
    if (!name || !value) {
        console.error('Cookie name or value is missing');
        return;
    }
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const deleteCookie = (cookieName: string) => {
    const cookieValue = cookieHelper.getCookie(cookieName);
    if (cookieValue) {
        setCookie(cookieName, cookieValue, -1);
    }
};
const deleteAllCookies = () => {
    const user_uuid = cookieHelper.getCookie('user_uuid');
    const refresh_token = cookieHelper.getCookie('refresh_token');
    const access_token = cookieHelper.getCookie('access_token');
    const currentGroup = cookieHelper.getCookie('currentGroup');

    if (user_uuid) {
        cookieHelper.setCookie('user_uuid', user_uuid, -1);
    }
    if (refresh_token) {
        cookieHelper.setCookie('refresh_token', refresh_token, -1);
    }
    if (access_token) {
        cookieHelper.setCookie('access_token', access_token, -1);
    }
    if (currentGroup) {
        cookieHelper.setCookie('currentGroup', currentGroup, -1);
    }
};

export const cookieHelper = {
    getCookie,
    setCookie,
    deleteCookie,
    deleteAllCookies,
};
