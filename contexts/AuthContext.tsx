import React, { useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services/AuthService';
import { cookieHelper } from '../helpers/CookieHelper';

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
        user_uuid: ' ',
        access_token: undefined,
        refresh_token: undefined,
    });
    const [, setLoading] = useState(false);

    const login = useCallback(async () => {
        try {
            setLoading(true);
            const data = await authService.login(authData.user_uuid!);
            setAuthData(data);
            document.cookie = `access_token=${data.access_token};`;
            document.cookie = `refresh_token=${data.refresh_token};`;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [authData.user_uuid]);

    useEffect(() => {
        const user_uuid = cookieHelper.getCookie('user_uuid');
        const access_token = cookieHelper.getCookie('access_token');
        const refresh_token = cookieHelper.getCookie('refresh_token');

        if (!user_uuid) {
            //generate uuid
            (async () => {
                await login();
            })();
        }

        if (!(access_token && refresh_token)) {
            (async () => await login())();
        } else {
            console.log('verifying token...');
            verifyToken(access_token).then((verified) => {
                if (verified) {
                    setAuthData({ user_uuid, access_token, refresh_token });
                    console.log('token verified!');
                } else {
                    console.log(
                        'token not verified! Requesting a new token...'
                    );
                    refreshToken(access_token, refresh_token).then((data) => {
                        setAuthData(data);
                        document.cookie = `access_token=${data.access_token};`;
                        document.cookie = `refresh_token=${data.refresh_token};`;
                        console.log('token refreshed!');
                    });
                }
            });
        }
    }, [login]);

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

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
