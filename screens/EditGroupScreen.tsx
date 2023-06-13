import React from 'react';
import userService from '../services/UserService';
import { User } from '../types';
import groupService from '../services/GroupService';
import EditGroupAsAdmin from '../components/Group/EditGroupAsUser/EditGroupAsAdmin';
import EditGroupAsPleb from '../components/Group/EditGroupAsUser/EditGroupAsPleb';

export default function EditGroupScreen({ route }: { route: any }) {
    const { groupId } = route.params;
    // const [userTags, setUserTags] = useState<Array<Tag>>([]);
    const { me, isLoading } = userService.useMe();
    const { group, isLoadingGroup } = groupService.useGroup(groupId);

    return isLoading || isLoadingGroup ? (
        <>Loading...</>
    ) : group.users.find((x: User) => x.id === me.id).is_admin ? (
        <EditGroupAsAdmin group={group} />
    ) : (
        <EditGroupAsPleb group={group} />
    );
}
