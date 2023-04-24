import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Group } from '../types';
import MyGroups from '../components/Groups';
import groupService from '../services/GroupService';

export default function MyGroupsScreen() {
    const [data, setData] = useState<Group[] | null>(null);
    useEffect(() => {
        groupService.fetchGroups().then((groups) => {
            setData(groups);
        });
    }, []);
    return data ? <MyGroups myGroups={data} /> : <Text>Loading...</Text>;
}
