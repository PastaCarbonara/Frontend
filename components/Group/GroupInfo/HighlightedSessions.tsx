import tw from '../../../lib/tailwind';
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
import { SwipeSession } from '../../../types';
import SessionButton from './SessionButton';

export default function HighlightedSessions({
    sessions,
}: {
    sessions: SwipeSession[];
}) {
    const orderedSessions = sessions.sort(
        (a, b) =>
            new Date(a.session_date).getTime() -
            new Date(b.session_date).getTime()
    );

    return sessions.length! > 0 ? (
        <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={tw`w-full gap-4 pb-4 pl-4`}
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
    const { width } = useWindowDimensions();
    const cardWidth = width - 32;
    return (
        <View
            style={tw`flex-col w-[${cardWidth}px] items-center pt-10 pb-6 mx-4 gap-4 bg-white shadow-md rounded-3xl`}
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

function OpenSession({ session }: { session: SwipeSession }) {
    const { width } = useWindowDimensions();
    const cardWidth = width - 32;
    return (
        <View style={tw`pl-4`}>
            <View
                style={tw.style(
                    `flex-row w-[${cardWidth}px] items-center py-8 px-4 mr-4 gap-2 bg-white shadow-md rounded-3xl`
                )}
            >
                <View
                    style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
                >
                    <View
                        style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}
                    >
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
                        {new Date(session.session_date).toLocaleString(
                            'default',
                            {
                                day: 'numeric',
                            }
                        )}
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
                <SessionButton session={session} />
            </View>
        </View>
    );
}

function ClosedSession({ session }: { session: SwipeSession }) {
    const { width } = useWindowDimensions();
    const cardWidth = width - 32;
    console.log(session);
    return (
        <View style={tw`pl-4`}>
            <ImageBackground
                source={{ uri: session.matches[0]?.image.file_url }}
                style={tw.style(
                    `flex-row w-[${cardWidth}px] items-center py-8 px-4 mr-4 gap-2 bg-black border border-white shadow-md rounded-3xl`
                )}
                imageStyle={tw.style(`rounded-3xl opacity-50`)}
            >
                <View
                    style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
                >
                    <View
                        style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}
                    >
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
                        {new Date(session.session_date).toLocaleString(
                            'default',
                            {
                                day: 'numeric',
                            }
                        )}
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
                <SessionButton session={session} />
            </ImageBackground>
        </View>
    );
}
