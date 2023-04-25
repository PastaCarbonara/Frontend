import { API_URL } from '@env';
import HttpErrorHandling from './HttpErrorHandling';

const login = async (uuid: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/client-token-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: uuid }),
        });
        return response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

const verifyToken = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        return response.ok;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        return false;
    }
};

const refreshToken = async (access_token: string, refresh_token: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token, refresh_token }),
        });
        return response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

const getPublicKey = async () => {
    return fetch(`${API_URL}/auth/public-key`)
        .then((response) => HttpErrorHandling.responseChecker(response))
        .then((response) => {
            return response;
        });
};

export const authService = {
    login,
    verifyToken,
    refreshToken,
    publicKey: getPublicKey,
};
