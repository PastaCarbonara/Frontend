import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserService from '../services/UserService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import tagService from '../services/TagService';

export default function ProfileScreen() {
    const [userData, setUserData] = useState<object>({});
    const [userTags, setUserTags] = useState<Array<object>>([]);
    const [allTags, setAllTags] = useState<Array<object>>([]);

    const { userId } = useContext(SessionWebsocketContext);

    useEffect(() => {
        Promise.all([
            UserService.fetchMe().then((userInfo) => {
                setUserData(userInfo);
            }),
            UserService.fetchFilters().then((tags) => setUserTags(tags)),
            tagService.fetchAllTags().then((tags) => setAllTags(tags)),
        ]);
    }, [userId]);

    return userData ? (
        <UserProfile user={userData} userTags={userTags} allTags={allTags} />
    ) : (
        <>Loading...</>
    );
}
