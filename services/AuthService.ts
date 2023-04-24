import { API_URL } from '@env';

const login = async () => {
    const testUUID =
        'uVoiyg/F9gmsIdpMc3PGuxWmltq/hRlWxAQummplGtLyGyyUXguR26S6PPVNAVt1cCzaPu7s9kvXr/iJ0tLSRiRrjzeO6SPVFxG+bF/d70B81c151Hw0WD5Na1TeuuAjEIUm7IqIuh5EKJL3DT7pIeCR2nXpmPvGhstcGu186+1ArICLeirgc0YTvOEqej2WIsYD+TJ76QIXrFLynqgAhDmwwKMtnkSrv719q23ysZ+pX4VST0FTn9iSkB7XjOVvFwuQr33P6zgM8pNxrLAVA6MPqTHbbnqP7iTn2Z3vrNIH1Mjx2S19DaQVYrcZ7TIvYdKfKVZ9SaaxCw4zzBwM+A==';

    try {
        const response = await fetch(`${API_URL}/auth/client-token-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: testUUID }),
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
export const authService = {
    login,
    verifyToken,
};
