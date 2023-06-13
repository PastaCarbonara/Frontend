import React from 'react';
import { Text } from 'react-native';

import { Group } from '../../../types';
import tw from '../../../lib/tailwind';

export default function EditGroupAsAdmin({}: { group: Group }) {
    return (
        <Text
            style={tw`m-18 bg-black text-white rounded-full w-min text-l px-5 py-1 text-center align-center`}
        >
            you are admin
        </Text>
    );
}
