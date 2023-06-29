import { Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import CreateSessionModal from './CreateSessionModal';
import { SwipeSession } from '../../types';
import SessionButton from './SessionButton';
import { Image } from 'expo-image';

export default function Sessions({
    sessions,
    showControls,
}: {
    sessions: SwipeSession[];
    showControls?: boolean;
}) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const orderedSessions = sessions.sort(
        (a, b) =>
            new Date(b.session_date).getTime() -
            new Date(a.session_date).getTime()
    );

    const openCreateSessionModal = () => {
        setIsModalVisible(true);
    };

    return (
        <View style={tw`gap-2.5`}>
            <View style={tw`flex flex-row justify-between`}>
                <Text style={tw`font-sans text-lg font-bold text-text_primary`}>
                    Sessies
                </Text>
                {showControls ? (
                    <Pressable
                        style={tw`flex flex-row items-center`}
                        onPress={openCreateSessionModal}
                    >
                        <Text style={tw`font-sans text-sm text-text_primary`}>
                            Sessie toevoegen
                        </Text>
                        <MaterialCommunityIcons
                            name={'plus'}
                            size={28}
                            style={tw`text-text_primary`}
                        />
                    </Pressable>
                ) : (
                    <></>
                )}
            </View>
            <View style={tw`gap-2.5`}>
                {orderedSessions.map((session) => (
                    <ListSession session={session} key={session.id} />
                ))}
            </View>
            <CreateSessionModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </View>
    );
}

function ListSession({ session }: { session: SwipeSession }) {
    return (
        <View
            style={tw`flex-row items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl`}
        >
            <View
                style={tw`w-12 h-12 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <Image
                    placeholder={{
                        uri:
                            session.swipe_match?.image?.urls.xs ??
                            `https://placehold.co/400`,
                    }}
                    source={[
                        {
                            uri:
                                session.swipe_match?.image?.urls.lg ??
                                `https://placehold.co/400`,
                            width: 1000,
                            height: 1000,
                        },
                        {
                            uri:
                                session.swipe_match?.image?.urls.md ??
                                `https://placehold.co/400`,
                            width: 800,
                            height: 800,
                        },
                        {
                            uri:
                                session.swipe_match?.image?.urls.sm ??
                                `https://placehold.co/250`,
                            width: 250,
                            height: 250,
                        },
                    ]}
                    style={tw`w-12 h-12 rounded-2xl`}
                />
            </View>
            <View style={tw`gap-0 grow`}>
                <Text
                    style={tw`font-sans text-base font-bold text-text_primary max-w-44`}
                >
                    {session.swipe_match?.name}
                </Text>
                <Text style={tw`font-sans text-xs text-text-primary`}>
                    {session.session_date}
                </Text>
            </View>
            <SessionButton session={session} />
        </View>
    );
}
