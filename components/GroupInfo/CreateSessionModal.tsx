import React from 'react';
import {
    Modal,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';
import swipeSessionService from '../../services/SwipeSessionService';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

export default function CreateSessionModal({
    isModalVisible,
    setIsModalVisible,
}: {
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
}) {
    const route = useRoute<RouteProp<RootStackParamList, 'Group'>>();
    const groupId = route.params?.groupId;
    const [sessionDate, setSessionDate] = React.useState<string>(
        new Date().toISOString()
    );
    return (
        <Modal animationType="fade" visible={isModalVisible} transparent={true}>
            <View
                style={tw`w-full h-full justify-center items-center p-4 overflow-hidden`}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setIsModalVisible(false);
                    }}
                >
                    <View style={tw`absolute inset-0 bg-black/20`} />
                </TouchableWithoutFeedback>
                <View style={tw`bg-white rounded-lg w-full max-w-screen-sm`}>
                    <View
                        style={tw`p-4 flex-row justify-between border-b border-gray-300`}
                    >
                        <Text
                            style={tw`font-sans text-lg font-bold text-text_primary`}
                        >
                            Nieuwe sessie aanmaken
                        </Text>
                        <Pressable
                            onPress={() => {
                                setIsModalVisible(false);
                            }}
                        >
                            <MaterialCommunityIcons
                                name={'close'}
                                size={28}
                                style={tw`text-text_primary`}
                            />
                        </Pressable>
                    </View>
                    <View style={tw`p-4`}>
                        <Text>Kies een datum</Text>
                        <DatePicker
                            mode={'calendar'}
                            options={{
                                mainColor: '#F97316', //orange_primary
                            }}
                            minimumDate={new Date().toISOString().split('T')[0]}
                            selected={sessionDate}
                            onDateChange={(date: string) => {
                                setSessionDate(date.replaceAll('/', '-')); //this replaces the / with - because the backend expects a date in the format yyyy-mm-dd
                            }}
                        />
                        <Pressable
                            style={tw`items-center justify-center p-4 gap-4 min-w-28 h-9 bg-orange_primary rounded-lg `}
                            onPress={async () => {
                                await swipeSessionService.createSwipeSession({
                                    session_date: sessionDate.split('T')[0], //this removes the time from the date
                                    groupId,
                                });
                                setIsModalVisible(false);
                            }}
                        >
                            <Text
                                style={tw`font-sans font-bold text-base leading-normal text-white`}
                            >
                                Maak sessie
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
