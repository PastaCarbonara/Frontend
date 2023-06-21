import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Separator from '../Separator';
import { LinearGradient } from 'expo-linear-gradient';
import { RecipeIngredient } from '../../types';
import tw from '../../lib/tailwind';
import SpicinessIndicator from './SpicinessIndicator';
import ImageBackground from '../ImageBackground';

const styles = StyleSheet.create({
    title: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: '5%',
        alignItems: 'center',
        textAlignVertical: 'bottom',
    },
    description: {
        // paddingTop: 5,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxWidth: '100%',
        paddingTop: '2.5%',
        paddingHorizontal: '2.5%',
    },
    descriptionInfo: {
        color: '#FAFAFA',
        flex: 1,
        alignContent: 'flex-end',
        padding: 5,
    },
    infoBox: {
        flexDirection: 'row',
        alignContent: 'space-between',
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        width: '100%',
    },
    btn: {
        position: 'absolute',
        top: 4,
        left: 4,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 36,
        aspectRatio: 1,
        borderRadius: 35,
        backgroundColor: '#00000054',
    },
    stepCounter: {
        borderColor: '#F79F5F',
        backgroundColor: '#F79F5F',
        borderRadius: 100,
        borderWidth: 1,
        color: '#FAFAFA',
        width: 25,
        aspectRatio: 1,
        alignSelf: 'flex-start',
        textAlign: 'center',
        justifyContent: 'center',
    },
    centerText: {
        textAlign: 'center',
    },
    instructions: {
        flex: 8,
        textAlignVertical: 'center',
        color: '#434343',
    },
    scrollBox: {
        maxWidth: '100%',
        width: '100%',
        marginBottom: '2.5%',
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
    },
});
export default function Recipe({ recipeInfo }: any) {
    const navigation = useNavigation();
    return (
        <View style={[tw`bg-bg_color`]}>
            <ImageBackground
                style={tw`w-full aspect-256/187`}
                imageStyle={tw`w-full h-full`}
                placeholder={{
                    uri: recipeInfo?.image?.urls?.xs,
                }}
                source={[
                    {
                        uri: recipeInfo?.image?.urls?.lg,
                        width: 1000,
                        height: 1000,
                    },
                    {
                        uri: recipeInfo?.image?.urls?.md,
                        width: 800,
                        height: 800,
                    },
                    {
                        uri: recipeInfo?.image?.urls?.sm,
                        width: 250,
                        height: 250,
                    },
                ]}
            >
                <LinearGradient
                    colors={['#00000000', '#00000065', '#000000']}
                    style={tw`p-4 h-full w-full justify-end`}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={tw`absolute top-4 left-4 bg-black/50 p-2 rounded-full aspect-square`}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-[#FAFAFA]`}>
                        <View style={tw`flex-row items-end w-full pb-4`}>
                            <View style={tw`flex-2`}>
                                <h1
                                    style={tw.style(
                                        'font-display',
                                        'text-2xl',
                                        'mb-0',
                                        { lineHeight: '36px' }
                                    )}
                                >
                                    {recipeInfo?.name}
                                </h1>
                            </View>
                            <View
                                style={tw`w-full content-end flex-1 flex-col`}
                            >
                                <Text style={tw`text-right`}>
                                    <MaterialCommunityIcons
                                        name="clock"
                                        size={20}
                                        style={tw`p-1`}
                                    >
                                        <Text style={tw`font-sans ml-2`}>
                                            {recipeInfo?.preparation_time}
                                        </Text>
                                    </MaterialCommunityIcons>
                                </Text>
                                <Text
                                    style={[
                                        styles.descriptionInfo,
                                        styles.flexRow,
                                        tw`text-right`,
                                    ]}
                                >
                                    <SpicinessIndicator
                                        spiciness={recipeInfo?.spiciness}
                                    />
                                </Text>
                            </View>
                        </View>
                    </Text>
                </LinearGradient>
            </ImageBackground>
            <View style={tw`w-full p-4 rounded-t-xl -mt-4 bg-bg_color`}>
                <Text style={tw`font-sans text-center`}>
                    <i>{recipeInfo?.description}</i>
                </Text>
                <Separator style={'border-orange_primary my-4'} />
                <h2 style={tw`font-display text-text_primary`}>Ingredient:</h2>
                <Text style={tw`flex-col font-sans`}>
                    {recipeInfo?.ingredients?.map(
                        (ingredient: RecipeIngredient) => (
                            <li
                                key={recipeInfo?.ingredients?.indexOf(
                                    ingredient
                                )}
                            >
                                <View style={styles.infoBox}>
                                    <Text style={tw`flex-7`}>
                                        {ingredient.name}
                                    </Text>
                                    <Text style={tw`flex-3 text-right`}>
                                        {ingredient.amount +
                                            ' ' +
                                            ingredient.unit}
                                    </Text>
                                </View>
                            </li>
                        )
                    )}
                </Text>
                <Separator style={'border-orange_primary my-4'} />
                <h2 style={tw`font-display text-text_primary`}>
                    Bereidingswijze:
                </h2>
                <Text style={tw`flex-col font-sans`}>
                    {recipeInfo?.instructions?.map((instruction: string) => (
                        <li
                            key={recipeInfo?.instructions?.indexOf(instruction)}
                        >
                            <View style={styles.infoBox}>
                                <View style={styles.stepCounter}>
                                    <Text style={styles.centerText}>
                                        {(
                                            recipeInfo?.instructions.indexOf(
                                                instruction
                                            ) + 1
                                        ).toString()}
                                    </Text>
                                </View>
                                <Text style={tw`flex-8 text-text_primary ml-2`}>
                                    {instruction}
                                </Text>
                            </View>
                        </li>
                    ))}
                </Text>
            </View>
        </View>
    );
}
