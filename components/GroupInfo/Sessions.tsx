import { Image, Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import CreateSessionModal from './CreateSessionModal';
import swipeSessionService from '../../services/SwipeSessionService';
import {
    RootStackParamList,
    SwipeSession,
    SwipeSessionStatus,
} from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Sessions({ sessions }: { sessions: SwipeSession[] }) {
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
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View
            style={tw`flex-row items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl`}
        >
            <View
                style={tw`w-12 h-12 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <Image
                    source={{
                        uri:
                            session.matches[0]?.image.file_url ??
                            'https://placehold.co/400',
                    }}
                    style={tw`w-12 h-12 rounded-2xl`}
                />
            </View>
            <View style={tw`gap-0 grow`}>
                <Text
                    style={tw`font-sans text-base font-bold text-text_primary`}
                >
                    {session.matches[0]?.name}
                </Text>
                <Text style={tw`font-sans text-xs text-text-primary`}>
                    {session.session_date}
                </Text>
            </View>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                onPress={async () => {
                    if (
                        session.status === 'Staat klaar' ||
                        session.status === 'Gepauzeerd'
                    ) {
                        console.log('Sessie wordt gestart');
                        await swipeSessionService.updateSwipeSessionStatus({
                            groupId: session.group_id,
                            swipeSessionId: session.id,
                            status: SwipeSessionStatus.IN_PROGRESS,
                        });
                    }
                    if (session.status === 'Is bezig') {
                        console.log('Stop');
                        await swipeSessionService.updateSwipeSessionStatus({
                            groupId: session.group_id,
                            swipeSessionId: session.id,
                            status: SwipeSessionStatus.CANCELLED,
                        });
                    }
                    if (session.status === 'Gestopt') {
                        console.log(
                            'Deze functionaliteit werkt nog niet in de backend'
                        );
                        // navigation.navigate('Recipe', {
                        //     id: session.matches[0]?.id,
                        // });
                    }
                    if (session.status === 'Voltooid') {
                        navigation.navigate('Recipe', {
                            id: session.matches[0]?.id,
                        });
                    }
                }}
            >
                <Text
                    style={tw`font-sans font-bold text-base leading-normal text-white`}
                >
                    {session.status === 'Staat klaar' ||
                    session.status === 'Gepauzeerd'
                        ? 'Start'
                        : session.status === 'Is bezig'
                        ? 'Stop'
                        : 'Bekijk'}
                </Text>
            </Pressable>
        </View>
    );
}
