import tw from '../../lib/tailwind';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import React from 'react';
import CreateSessionModal from './CreateSessionModal';

export default function HighlightedSessions() {
    const sessions = [];
    const sessionStatus: number = 1;
    return sessions.length! > 0 ? (
        <OpenSession />
    ) : sessionStatus === 1 ? (
        <NoOpenSessions />
    ) : (
        <ClosedSession />
    );
}

function NoOpenSessions() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    return (
        <View
            style={tw`flex-col items-center pt-10 pb-6 gap-4 bg-white shadow-md rounded-3xl`}
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

function OpenSession() {
    let sessionStatus = 1;
    return (
        <View
            style={tw`flex-row items-center py-8 px-4 gap-2 bg-white shadow-md rounded-3xl`}
        >
            <View
                style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <View style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}>
                    <Text style={tw`text-center text-xs text-white`}>Apr</Text>
                </View>
                <Text style={tw`text-2xl font-bold text-text_primary`}>23</Text>
            </View>
            <View style={tw`gap-0 grow`}>
                <Text
                    style={tw`font-sans text-base font-bold text-text_primary`}
                >
                    Huidige sessie
                </Text>
                <Text style={tw`font-sans text-sm text-text_primary`}>
                    {sessionStatus === 1
                        ? 'Sessie gestart'
                        : 'Sessie niet gestart'}
                </Text>
            </View>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
            >
                <Text
                    style={tw`font-sans font-bold text-base leading-normal text-white`}
                >
                    {sessionStatus === 1 ? 'Stop' : 'Start'}
                </Text>
            </Pressable>
        </View>
    );
}

function ClosedSession() {
    return (
        <ImageBackground
            source={require('../../assets/images/pancakes.png')}
            style={tw`flex-row items-center py-8 px-4 gap-2 bg-white border border-white shadow-md rounded-3xl`}
        >
            <View
                style={tw`w-16 h-16 items-center bg-white border border-white shadow-md rounded-2xl`}
            >
                <View style={tw`w-full h-4 bg-orange_primary rounded-t-2xl`}>
                    <Text style={tw`text-center text-xs text-white`}>Apr</Text>
                </View>
                <Text style={tw`text-2xl font-bold text-text_primary`}>23</Text>
            </View>
            <View style={tw`gap-0 grow`}>
                <Text
                    style={tw`font-sans text-base font-bold text-text_primary`}
                >
                    Huidige sessie
                </Text>
                <Text style={tw`font-sans text-sm text-text_primary`}>
                    Sessie beindigd
                </Text>
            </View>
            <Pressable
                style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
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
