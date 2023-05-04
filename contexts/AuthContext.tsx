import React, { useCallback, useEffect, useState } from 'react';
import { authService } from '../services/AuthService';
import { cookieHelper } from '../helpers/CookieHelper';
import { v4 as uuidv4 } from 'uuid';

export type AuthContextType = {
    authData?: {};
    loading: boolean;
    refreshToken: () => void;
    verifyToken: () => void;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authData, setAuthData] = useState<{
        user_uuid: string | undefined;
        access_token: string | undefined;
        refresh_token: string | undefined;
    }>({
        user_uuid: cookieHelper.getCookie('user_uuid'),
        access_token: cookieHelper.getCookie('access_token'),
        refresh_token: cookieHelper.getCookie('refresh_token'),
    });
    const [, setLoading] = useState(false);

    const login = useCallback(async () => {
        try {
            setLoading(true);
            const { access_token, refresh_token } = await authService.login(
                authData.user_uuid!
            );
            setAuthData({ ...authData, access_token, refresh_token });
            cookieHelper.setCookie('access_token', access_token, 1);
            cookieHelper.setCookie('refresh_token', refresh_token, 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [authData]);

    useEffect(() => {
        const user_uuid = cookieHelper.getCookie('user_uuid');

        if (!user_uuid) {
            //generate uuid
            cookieHelper.setCookie('user_uuid', uuidv4(), 365000);
            console.log('user_uuid generated!');
            console.log(cookieHelper.getCookie('user_uuid'));
        }

        if (!authData.access_token || !authData.refresh_token) {
            console.log('no token found! Requesting a new token...');
            // void is used to ignore the return value of login() since we don't need it
            // eslint-disable-next-line no-void
            void login();
        } else {
            console.log('verifying token...');
            console.log(authData);
            verifyToken(authData.access_token).then((verified) => {
                if (
                    !verified &&
                    authData.refresh_token &&
                    authData.access_token
                ) {
                    console.log(
                        'token not verified! Requesting a new token...'
                    );
                    refreshToken(
                        authData.access_token,
                        authData.refresh_token
                    ).then((data) => {
                        setAuthData(data);
                        document.cookie = `access_token=${data.access_token};`;
                        document.cookie = `refresh_token=${data.refresh_token};`;
                        console.log('token refreshed!');
                    });
                }
            });
        }
    }, [authData, login]);

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

    const auth: AuthContextType = React.useMemo(
        () => ({
            authData: {},
            loading: false,
            refreshToken: () => {},
            verifyToken: () => {},
        }),
        []
    );

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
