import React, { useEffect, useState } from 'react';
import { authService } from '../services/AuthService';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';

export type AuthContextType = {
    authData?: {};
    loading: boolean;
    getCookie: (name: string) => string | undefined;
    refreshToken: () => void;
    verifyToken: () => void;
};

export const AuthContext = React.createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [, setAuthData] = useState({});
    const [, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const [uuid, setUuid] = useState('');

    useEffect(() => {
        const access_token = getCookie('access_token');
        const refresh_token = getCookie('refresh_token');

        generateUuid().then((data) => setUuid(data));
        authService.publicKey().then((data) => setKey(data));
        console.log(key);

        if (access_token && refresh_token) {
            console.log('verifying token...');
            verifyToken(access_token).then((verified) => {
                if (verified) {
                    setAuthData({ access_token });
                    console.log('token verified!');
                } else {
                    console.log(
                        'token not verified! Requesting a new token...'
                    );
                    refreshToken(access_token, refresh_token).then((data) => {
                        setAuthData(data);
                        document.cookie = `access_token=${data.access_token};`;
                        document.cookie = `refresh_token=${data.refresh_token};`;
                    });
                }
            });
        } else {
            try {
                setLoading(true);
                console.log('logging in...');
                authService.login(uuid).then((data) => {
                    console.log(data);
                    setAuthData(data);
                    document.cookie = `access_token=${data.access_token};`;
                    document.cookie = `refresh_token=${data.refresh_token};`;
                    console.log('logged in!');
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [uuid, key]);

    const verifyToken = async (token: string) => {
        return await authService.verifyToken(token);
    };

    const refreshToken = async (
        access_token: string,
        refresh_token: string
    ) => {
        if (refresh_token) {
            try {
                setLoading(true);
                const data = await authService.refreshToken(
                    access_token,
                    refresh_token
                );
                setAuthData(data);
                document.cookie = `access_token=${data.access_token};`;
                return data;
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
    };

    const auth: AuthContextType = React.useMemo(
        () => ({
            authData: {},
            loading: false,
            getCookie,
            refreshToken: () => {},
            verifyToken: () => {},
        }),
        []
    );

    const generateUuid = async () => {
        return btoa(sha256(uuidv4));
    };
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
