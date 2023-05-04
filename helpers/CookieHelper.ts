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

export const cookieHelper = {
    getCookie,
    setCookie,
};
