import { Image, Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import CreateSessionModal from './CreateSessionModal';

export default function Sessions({ sessions }: { sessions: any[] }) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const createSession = () => {
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
                    onPress={createSession}
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
                {sessions.map((session) => (
                    <View
                        style={tw`flex-row items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl`}
                        key={session.id}
                    >
                        <View
                            style={tw`w-12 h-12 items-center bg-white border border-white shadow-md rounded-2xl`}
                        >
                            <Image
                                source={{
                                    uri:
                                        session.matches.length > 0
                                            ? session.matches[0].image.file_url
                                            : 'https://placehold.co/400',
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
                            <Text style={tw`font-sans text-xs text-gray-500`}>
                                {session.session_date}
                            </Text>
                        </View>
                        <Pressable
                            style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                        >
                            <Text
                                style={tw`font-sans font-bold text-base leading-normal text-white`}
                            >
                                Start
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </View>
            <CreateSessionModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </View>
    );
}
