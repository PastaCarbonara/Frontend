import React, { useCallback, useEffect, useState } from 'react';
import { authService } from '../services/AuthService';
import { cookieHelper } from '../helpers/CookieHelper';
import { v4 as uuidv4 } from 'uuid';

export type AuthContextType = {
    authData?: {};
    loading: boolean;
    refreshToken: () => void;
    verifyToken: () => Promise<boolean>;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authData, setAuthData] = useState<{
        access_token: string | undefined;
        refresh_token: string | undefined;
    }>({
        access_token: cookieHelper.getCookie('access_token'),
        refresh_token: cookieHelper.getCookie('refresh_token'),
    });
    const [, setLoading] = useState(false);

    const login = useCallback(
        async (user_uuid: string) => {
            try {
                setLoading(true);
                const { access_token, refresh_token } = await authService.login(
                    user_uuid
                );
                setAuthData({ ...authData, access_token, refresh_token });
                cookieHelper.setCookie('access_token', access_token, 1);
                cookieHelper.setCookie('refresh_token', refresh_token, 1);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [authData]
    );

    const verifyToken = useCallback(async () => {
        if (!authData.access_token) return false;
        return await authService.verifyToken(authData.access_token);
    }, [authData.access_token]);

    useEffect(() => {
        let user_uuid = cookieHelper.getCookie('user_uuid');

        if (!user_uuid) {
            //generate uuid
            cookieHelper.setCookie('user_uuid', uuidv4(), 365000);
            user_uuid = cookieHelper.getCookie('user_uuid');
        }

        if (!authData.access_token || !authData.refresh_token) {
            // void is used to ignore the return value of login() since we don't need it
            if (user_uuid) {
                // eslint-disable-next-line no-void
                void login(user_uuid);
            } else {
                console.log('no user_uuid');
            }
        } else {
            verifyToken().then((verified) => {
                if (
                    !verified &&
                    authData.refresh_token &&
                    authData.access_token
                ) {
                    refreshToken(
                        authData.access_token,
                        authData.refresh_token
                    ).then((data) => {
                        setAuthData(data);
                        document.cookie = `access_token=${data.access_token};`;
                        document.cookie = `refresh_token=${data.refresh_token};`;
                    });
                }
            });
        }
    }, [authData, login, verifyToken]);

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
            verifyToken,
        }),
        [verifyToken]
    );

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
