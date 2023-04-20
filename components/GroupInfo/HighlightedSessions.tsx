import tw from '../../lib/tailwind';
import {
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import React from 'react';
import CreateSessionModal from './CreateSessionModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function HighlightedSessions({ sessions }: { sessions: any[] }) {
    const orderedSessions = sessions.sort(
        (a, b) =>
            new Date(a.session_date).getTime() -
            new Date(b.session_date).getTime()
    );

    return sessions.length! > 0 ? (
        <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={tw`w-full gap-4`}
        >
            {orderedSessions.map((session) => {
                if (
                    session.status === 'Staat klaar' ||
                    session.status === 'Gepauzeerd' ||
                    session.status === 'Is bezig'
                ) {
                    return <OpenSession session={session} key={session.id} />;
                } else if (
                    session.status === 'Voltooid' ||
                    session.status === 'Gestopt'
                ) {
                    return <ClosedSession session={session} key={session.id} />;
                }
            })}
        </ScrollView>
    ) : (
        <NoOpenSessions />
    );
}

function NoOpenSessions() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    return (
        <View
            style={tw`flex-col w-full items-center pt-10 pb-6 gap-4 bg-white shadow-md rounded-3xl`}
        >
            <Text style={tw`font-sans text-base font-bold text-text_primary`}>
                Je hebt nog geen sessies
            </Text>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 min-w-28 h-9 bg-orange_primary rounded-lg `}
                onPress={() => {
                    setIsModalVisible(true);
                }}
            >
                <Text
                    style={tw`font-sans font-bold text-base leading-normal text-white`}
                >
                    Maak sessie
                </Text>
            </Pressable>
            <CreateSessionModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </View>
    );
}

function OpenSession({ session }: { session: any }) {
    const { width } = useWindowDimensions();
    const cardWidth = width - 32;
    return (
        <View
            style={tw.style(
                `flex-row w-[${cardWidth}px] items-center py-8 px-4 gap-2 bg-white shadow-md rounded-3xl`
            )}
        >
            <View
                style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <View style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}>
                    <Text style={tw`text-center text-xs text-white`}>
                        {new Date(session.session_date).toLocaleString(
                            'default',
                            {
                                month: 'short',
                            }
                        )}
                    </Text>
                </View>
                <Text style={tw`text-2xl font-bold text-text_primary`}>
                    {new Date(session.session_date).toLocaleString('default', {
                        day: 'numeric',
                    })}
                </Text>
            </View>
            <View style={tw`gap-0 grow`}>
                <Text
                    style={tw`font-sans text-base font-bold text-text_primary`}
                >
                    {session.status}
                </Text>
                <Text style={tw`font-sans text-sm text-text_primary`}>
                    {session.status === 'Is bezig' && 'Huidige sessie'}
                </Text>
            </View>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
            >
                <Text
                    style={tw`font-sans font-bold text-base leading-normal text-white`}
                >
                    {session.status === 'Staat klaar' ||
                    session.status === 'Gepauzeerd'
                        ? 'Start'
                        : 'Stop'}
                </Text>
            </Pressable>
        </View>
    );
}

function ClosedSession({ session }: { session: any }) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { width } = useWindowDimensions();
    const cardWidth = width - 32;
    return (
        <ImageBackground
            source={{ uri: session.matches[0]?.image.file_url }}
            style={tw.style(
                `flex-row w-[${cardWidth}px] items-center py-8 px-4 gap-2 bg-black border border-white shadow-md rounded-3xl`
            )}
            imageStyle={tw.style(`rounded-3xl opacity-50`)}
        >
            <View
                style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <View style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}>
                    <Text style={tw`text-center text-xs text-white`}>
                        {new Date(session.session_date).toLocaleString(
                            'default',
                            {
                                month: 'short',
                            }
                        )}
                    </Text>
                </View>
                <Text style={tw`text-2xl font-bold text-text_primary`}>
                    {new Date(session.session_date).toLocaleString('default', {
                        day: 'numeric',
                    })}
                </Text>
            </View>
            <View style={tw`gap-0 grow`}>
                <Text style={tw`font-sans text-base font-bold text-white`}>
                    {session.matches[0]?.name}
                </Text>
                <Text style={tw`font-sans text-sm text-white`}>
                    {session.status}
                </Text>
            </View>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                onPress={() => {
                    navigation.navigate('Recipe', {
                        id: session.matches[0].id,
                    });
                }}
            >
                <Text
                    style={tw`font-sans font-bold text-base leading-normal text-white`}
                >
                    Bekijk
                </Text>
            </Pressable>
        </ImageBackground>
    );
}
