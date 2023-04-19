import React, { useEffect, useState } from 'react';
import { Groups } from '../types';
import MyGroups from '../components/Groups';
import groupService from '../services/GroupService';

export default function MyGroupsScreen() {
    const [data, setData] = useState<Groups[]>([]);
    useEffect(() => {
        groupService.fetchGroups().then((groups) => {
            setData(groups);
        });
    }, []);
    console.log(data);
    return <MyGroups myGroups={data} />;
}
