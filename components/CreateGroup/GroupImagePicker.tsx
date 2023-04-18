import React, { useState } from 'react';
import { Image, Pressable, TouchableHighlight, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GroupImagePicker() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={tw`flex items-center justify-center`}>
            <View style={tw`flex-row items-end`}>
                <TouchableHighlight
                    style={tw`rounded-3xl ml-3`}
                    onPress={pickImage}
                    underlayColor={'#4338CA'}
                >
                    <View
                        style={tw`w-40 h-40 bg-bg_color border border-dashed border-indigo_primary rounded-3xl items-center justify-center`}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={tw`w-full h-full rounded-3xl`}
                                resizeMode={'cover'}
                            />
                        ) : (
                            <Image
                                source={require('/assets/images/munchie.png')}
                                style={tw`w-20 h-20 opacity-70`}
                                resizeMode={'contain'}
                            />
                        )}
                    </View>
                </TouchableHighlight>
                <Pressable onPress={pickImage}>
                    <View
                        style={tw`w-12 h-12 -ml-9 -mb-3 rounded-full bg-indigo_secondary items-center justify-center`}
                    >
                        {image ? (
                            <MaterialCommunityIcons
                                name={'camera-flip-outline'}
                                size={24}
                                style={tw`text-white`}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name={'camera-outline'}
                                size={24}
                                style={tw`text-white`}
                            />
                        )}
                    </View>
                </Pressable>
            </View>
        </View>
    );
}
