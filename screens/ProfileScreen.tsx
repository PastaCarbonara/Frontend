import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserService from '../services/UserService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import tagService from '../services/TagService';
import userService from '../services/UserService';

export default function ProfileScreen() {
    const [userTags, setUserTags] = useState<Array<object>>([]);
    const [allTags, setAllTags] = useState<Array<object>>([]);

    const { userId } = useContext(SessionWebsocketContext);
    const { me, isLoading } = userService.useMe();

    useEffect(() => {
        Promise.all([
            UserService.fetchFilters().then((tags) => setUserTags(tags)),
            tagService.fetchAllTags().then((tags) => setAllTags(tags)),
        ]);
    }, [userId]);

    return !isLoading ? (
        <UserProfile user={me} userTags={userTags} allTags={allTags} />
    ) : (
        <>Loading...</>
    );
}
