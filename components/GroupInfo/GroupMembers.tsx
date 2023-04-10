import tw from '../../lib/tailwind';
import { Image, ScrollView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function GroupMembers() {
    const members = [
        { uri: 'https://picsum.photos/id/10/60/60' },
        { uri: 'https://picsum.photos/id/222/60/60' },
        { uri: 'https://picsum.photos/id/353/60/60' },
        { uri: 'https://picsum.photos/id/485/60/60' },
        { uri: 'https://picsum.photos/id/531/60/60' },
        { uri: 'https://picsum.photos/id/786/60/60' },
    ];
    return (
        <View style={tw`gap-2.5`}>
            <Text style={tw`font-sans text-lg font-bold text-text_primary`}>
                Groepleden
            </Text>
            <ScrollView horizontal contentContainerStyle={tw`gap-2.5`}>
                <View
                    style={tw`flex justify-center items-center p-4 w-16 h-16 bg-indigo_secondary/20 border-dashed border border-indigo_primary rounded-4`}
                >
                    <MaterialCommunityIcons
                        name="plus"
                        size={28}
                        style={tw`text-indigo_primary`}
                    />
                </View>
                {members.map((member) => (
                    <View
                        style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                    >
                        <Image
                            style={tw`w-16 h-16 rounded-4`}
                            source={member}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
