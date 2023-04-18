import React, { useEffect, useState } from 'react';
import GroupInfo from '../components/GroupInfo';
import groupService from '../services/GroupService';

export default function GroupScreen({ route }: { route: any }) {
    const { groupId } = route.params;
    const [groupData, setGroupData] = useState<any>();

    useEffect(() => {
        groupService.fetchGroupInfo(groupId).then((recipeInfo) => {
            setGroupData(recipeInfo);
        });
    }, [groupId]);
    return <GroupInfo group={groupData} />;
}
