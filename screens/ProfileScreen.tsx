import React, { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import userService from '../services/UserService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import tagService from '../services/TagService';
import { Tag } from '../types';

export default function ProfileScreen() {
    const [userTags, setUserTags] = useState<Array<Tag>>([]);
    const [allTags, setAllTags] = useState<Array<Tag>>([]);

    const { userId } = useContext(SessionWebsocketContext);
    const { me, isLoading } = userService.useMe();

    useEffect(() => {
        Promise.all([
            userService.fetchFilters().then((tags) => setUserTags(tags)),
            tagService.fetchAllTags().then((tags) => setAllTags(tags)),
        ]);
    }, [userId]);

    return !isLoading ? (
        <UserProfile user={me} userTags={userTags} allTags={allTags} />
    ) : (
        <>Loading...</>
    );
}
