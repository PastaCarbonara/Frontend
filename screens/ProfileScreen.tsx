import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserService from '../services/UserService';
import { SessionWebsocketContext } from '../contexts/SessionContext';

export default function ProfileScreen() {
    const [userData, setUserData] = useState<any>();
    const [userTags, setUserTags] = useState<any>();

    const { userId } = useContext(SessionWebsocketContext);

    useEffect(() => {
        UserService.fetchMe()
            .then((userInfo) => {
                setUserData(userInfo);
            })
            .then(UserService.fetchFilters)
            .then((tags) => setUserTags(tags));
    }, [userId]);

    return userData ? (
        <UserProfile user={userData} tags={userTags} />
    ) : (
        <>Loading...</>
    );
}
