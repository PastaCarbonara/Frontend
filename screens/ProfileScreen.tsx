import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserService from '../services/UserService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import tagService from '../services/TagService';

export default function ProfileScreen() {
    const [userData, setUserData] = useState<any>();
    const [userTags, setUserTags] = useState<any>();
    const [allTags, setAllTags] = useState<any>([]);

    const { userId } = useContext(SessionWebsocketContext);

    useEffect(() => {
        UserService.fetchMe()
            .then((userInfo) => {
                setUserData(userInfo);
            })
            .then(UserService.fetchFilters)
            .then((tags) => setUserTags(tags))
            .then(tagService.fetchAllTags)
            .then((tags) => setAllTags(tags));
    }, [userId]);

    return userData ? (
        <UserProfile user={userData} userTags={userTags} allTags={allTags} />
    ) : (
        <>Loading...</>
    );
}
