import React, { useCallback, useEffect, useState } from 'react';
import { authService } from '../services/AuthService';
import { cookieHelper } from '../helpers/CookieHelper';
import { v4 as uuidv4 } from 'uuid';
import { ActivityIndicator, View } from 'react-native';
import tw from '../lib/tailwind';

export type AuthContextType = {
    authData?:
        | {
              access_token: string | undefined;
              refresh_token: string | undefined;
          }
        | undefined;
    isLoading: boolean;
    refreshToken: (
        access_token: string,
        refresh_token: string
    ) => Promise<AuthContextType['authData']>;
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
    const [isLoading, setIsLoading] = useState(true);

    const login = useCallback(async (user_uuid: string): Promise<void> => {
        try {
            const { access_token, refresh_token } = await authService.login(
                user_uuid
            );
            setAuthData({ access_token, refresh_token });
            cookieHelper.setCookie('access_token', access_token, 1);
            cookieHelper.setCookie('refresh_token', refresh_token, 1);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const verifyToken = useCallback(async () => {
        if (!authData.access_token) return false;
        return await authService.verifyToken(authData.access_token);
    }, [authData.access_token]);

    const refreshToken = async (
        access_token: string,
        refresh_token: string
    ): Promise<AuthContextType['authData']> => {
        if (refresh_token) {
            try {
                const data = await authService.refreshToken(
                    access_token,
                    refresh_token
                );
                setAuthData(data);
                document.cookie = `access_token=${data.access_token};`;
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        let user_uuid = cookieHelper.getCookie('user_uuid');

        if (!user_uuid) {
            //generate uuid
            cookieHelper.setCookie('user_uuid', uuidv4(), 365000);
            user_uuid = cookieHelper.getCookie('user_uuid');
        }

        const initialize = async () => {
            if (
                !authData.access_token ||
                !authData.refresh_token ||
                authData.access_token === 'undefined' ||
                authData.refresh_token === 'undefined'
            ) {
                if (user_uuid) {
                    try {
                        await login(user_uuid);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log('no user_uuid');
                }
            } else {
                verifyToken().then(async (verified) => {
                    if (!verified) {
                        try {
                            const data = await refreshToken(
                                authData.access_token!,
                                authData.refresh_token!
                            );
                            if (!data) return;
                            setAuthData(data);
                            document.cookie = `access_token=${data.access_token};`;
                            document.cookie = `refresh_token=${data.refresh_token};`;
                        } catch (error) {
                            console.error('Failed to refresh token:', error);
                        }
                    }
                });
            }
        };
        initialize().then(() => {
            setIsLoading(false);
        });
    }, [authData, login, verifyToken]);

    const auth: AuthContextType = React.useMemo(
        () => ({
            authData,
            isLoading,
            refreshToken,
            verifyToken,
        }),
        [authData, isLoading, verifyToken]
    );

    return (
        <AuthContext.Provider value={auth}>
            {isLoading ? (
                <View style={tw`flex-1 grow items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
