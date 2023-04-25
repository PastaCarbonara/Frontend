import { API_URL } from '@env';

const login = async (user_uuid: string) => {
    console.log(user_uuid);
    const testUUID =
        'ON0fpgwF0vxpPg4a3mf0Cq5H/SK8U66WdRmJiCdCgqlzrOtGmxdQKsV5WVumVD23vtopi3W/c9kv/jkGTJhNXclA1pwiBgXL0oZlSSm3zrKIztJCr+3IpCHOWi5ktYWG5VihOaDaIi9ygrZHuvSIBNz+VR4PY7RowhcTvfcw+sC+02T4gjqqwJzF0t1v5bfKl2s1GshFmyDL55pk6O0Qz3YEMKAxQ6ZyI3dRkwAWx7Jk5reFte8PPjY46XhhcBOrFK83IJxbELXWPQSadh4+Ys1wPnzkugCqKuEABrvQ3Fz6mJFpVBMdJPBh18ENfMkSeYLoHffZXSGr+6A6UCwGQA==';
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

export const authService = {
    login,
    verifyToken,
    refreshToken,
};
