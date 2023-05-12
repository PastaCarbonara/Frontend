import { Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function Tag({
    tagValue,
    tagType,
}: {
    tagValue: string;
    tagType: string;
}) {
    const colour = setColour(tagType);
    return (
        <View style={tw`bg-${colour} rounded-full m-1 w-min`}>
            <Text style={tw`text-l text-white mx-5 my-1 text-center`}>
                {tagValue}
            </Text>
        </View>
    );
}

function setColour(filterType: string): string {
    switch (filterType) {
        case 'dietary-preference':
            return 'indigo_primary';
        case 'allergy':
            return 'orange_primary';
    }
    return 'white';
}
