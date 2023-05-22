import { Text } from 'react-native';
import tw from '../lib/tailwind';

export default function Tag({
    tagValue,
    tagType,
}: {
    tagValue: string;
    tagType: string;
}) {
    const layout = setLayout(tagType);
    return (
        <Text
            style={tw`bg-${layout} rounded-full m-1 w-min text-l px-5 py-1 text-center align-middle`}
        >
            {tagValue}
        </Text>
    );
}

function setLayout(filterType: string): string {
    switch (filterType) {
        case 'dietary-preference':
            return 'indigo_primary text-white';
        case 'allergy':
            return 'orange_primary text-white';
        case 'more':
            return 'indigo_primary/20 text-indigo_primary border-2 border-indigo_primary border-dotted';
    }
    return 'white';
}
