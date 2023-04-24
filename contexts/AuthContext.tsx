import React, { useEffect, useState } from 'react';
import { authService } from '../services/AuthService';

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

    useEffect(() => {
        const access_token = getCookie('access_token');
        if (access_token) {
            console.log('verifying token...');
            verifyToken(access_token).then((verified) => {
                if (verified) {
                    setAuthData({ access_token });
                    console.log('token verified!');
                } else {
                    console.log('token not verified! Request a new token.');
                    // TODO: request new token
                }
            });
        } else {
            try {
                setLoading(true);
                console.log('logging in...');
                authService.login().then((data) => {
                    console.log(data);
                    setAuthData(data);
                    document.cookie = `access_token=${data.access_token};`;
                    console.log('logged in!');
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    const verifyToken = async (token: string) => {
        return await authService.verifyToken(token);
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

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
