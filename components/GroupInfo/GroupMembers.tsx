import tw from '../../lib/tailwind';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Share,
    Text,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GroupStackParamList, User } from '../../types';
import * as Linking from 'expo-linking';

export default function GroupMembers({ members }: { members: User[] }) {
    const route = useRoute<RouteProp<GroupStackParamList, 'Group'>>();
    const groupId = route.params?.groupId;
    const [origin, setOrigin] = useState<string | undefined>(undefined);
    Linking.getInitialURL().then((url) => {
        if (!url) return;
        const urlObject = new URL(url);
        setOrigin(urlObject.origin);
    });
    return (
        <View style={tw`gap-2.5`}>
            <Text style={tw`font-sans text-lg font-bold text-text_primary`}>
                Groepleden
            </Text>
            <ScrollView
                horizontal
                contentContainerStyle={tw`gap-2.5 pb-2.5 -mb-2.5`}
            >
                <Pressable
                    onPress={async () => {
                        try {
                            const result = await Share.share({
                                url: `${origin}/group/${groupId}/join`, //for IOS
                                message: `${origin}/group/${groupId}/join`, //for Android
                            });
                            if (result.action === Share.sharedAction) {
                                if (result.activityType) {
                                    // shared with activity type of result.activityType
                                } else {
                                    // shared
                                }
                            } else if (
                                result.action === Share.dismissedAction
                            ) {
                                // dismissed
                            }
                        } catch (error: any) {
                            Alert.alert(error.message);
                        }
                    }}
                >
                    <View
                        style={tw`flex justify-center items-center p-4 w-16 h-16 bg-indigo_secondary/20 border-dashed border border-indigo_primary rounded-4`}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={28}
                            style={tw`text-indigo_primary`}
                        />
                    </View>
                </Pressable>
                {members.map((member) => (
                    <View
                        style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        key={member.id}
                    >
                        <Image
                            style={tw`w-16 h-16 rounded-4`}
                            source={{
                                uri:
                                    member.image?.urls.lg ??
                                    `https://api.dicebear.com/6.x/lorelei/svg?seed=${member.id}`,
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
