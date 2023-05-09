import { ImageBackground, ScrollView, View } from 'react-native';
import NoGroupsFound from './NoGroupsFound';
import GroupsFound from './GroupsFound';
import tw from '../../lib/tailwind';
import FloatingActionButton from '../FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function MyGroups({ myGroups }: any) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`bg-bg_color h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../../assets/images/header_background.svg')}
            />
            <ScrollView style={tw`h-full mt-15`}>
                <View style={tw`h-full`}>
                    {myGroups?.length < 1 ? (
                        <NoGroupsFound />
                    ) : (
                        <GroupsFound groups={myGroups} />
                    )}
                </View>
            </ScrollView>

            <FloatingActionButton
                icon={'plus'}
                color={'indigo_primary'}
                onPress={() => {
                    navigation.navigate('CreateGroup');
                }}
            />
        </View>
    );
}
