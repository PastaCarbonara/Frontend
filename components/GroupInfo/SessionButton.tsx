import tw from '../../lib/tailwind';
import swipeSessionService from '../../services/SwipeSessionService';
import {
    RootStackParamList,
    SwipeSession,
    SwipeSessionStatus,
} from '../../types';
import { Pressable, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const isSessionInThePast = (session: SwipeSession) => {
    return (
        new Date(session.session_date) <= new Date(new Date().toDateString())
    );
};

export default function SessionButton({ session }: { session: SwipeSession }) {
    //write a switch case to render a different button depending on the status of the session
    const sessionButtonSwitch = () => {
        switch (session.status) {
            case SwipeSessionStatus.COMPLETED:
                return <ViewSessionButton session={session} />;
            case SwipeSessionStatus.READY:
                return <StartSessionButton session={session} />;
            case SwipeSessionStatus.PAUSED:
                return <StartSessionButton session={session} />;
            case SwipeSessionStatus.IN_PROGRESS:
                return <StopSessionButton session={session} />;
            default:
                return <></>;
        }
    };

    return <>{sessionButtonSwitch()}</>;
}

function StartSessionButton({ session }: { session: SwipeSession }) {
    return (
        <>
            {!isSessionInThePast(session) && (
                <Pressable
                    style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                    onPress={async () => {
                        console.log('Sessie wordt gestart');
                        await swipeSessionService.updateSwipeSessionStatus({
                            groupId: session.group_id,
                            swipeSessionId: session.id,
                            status: SwipeSessionStatus.IN_PROGRESS,
                        });
                    }}
                >
                    <Text
                        style={tw`font-sans font-bold text-base leading-normal text-white`}
                    >
                        Start
                    </Text>
                </Pressable>
            )}
        </>
    );
}

function StopSessionButton({ session }: { session: SwipeSession }) {
    return (
        <>
            {' '}
            {!isSessionInThePast(session) && (
                <Pressable
                    style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                    onPress={async () => {
                        console.log('Stop');
                        await swipeSessionService.updateSwipeSessionStatus({
                            groupId: session.group_id,
                            swipeSessionId: session.id,
                            status: SwipeSessionStatus.CANCELLED,
                        });
                    }}
                >
                    <Text
                        style={tw`font-sans font-bold text-base leading-normal text-white`}
                    >
                        Stop
                    </Text>
                </Pressable>
            )}
        </>
    );
}

function ViewSessionButton({ session }: { session: SwipeSession }) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Pressable
            style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
            onPress={() => {
                navigation.navigate('Recipe', {
                    id: session.matches[0]?.id,
                });
            }}
        >
            <Text
                style={tw`font-sans font-bold text-base leading-normal text-white`}
            >
                Bekijk
            </Text>
        </Pressable>
    );
}
