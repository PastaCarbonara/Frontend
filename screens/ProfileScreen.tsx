import React from 'react';
import UserProfile from '../components/UserProfile';
import userService from '../services/UserService';
import tagService from '../services/TagService';

export default function ProfileScreen() {
    // const [userTags, setUserTags] = useState<Array<Tag>>([]);

    const { me, isLoading } = userService.useMe();
    const { filters, isLoadingFilters } = userService.useFilters();
    const { allTags, isLoadingTags } = tagService.useAllTags();

    return !isLoading && !isLoadingFilters && !isLoadingTags ? (
        <UserProfile user={me} userTags={filters} allTags={allTags} />
    ) : (
        <>Loading...</>
    );
}
