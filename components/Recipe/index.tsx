import {Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import React from "react";
import Separator from "../Separator";
import {LinearGradient} from 'expo-linear-gradient';


const styles = StyleSheet.create({
    //floating action button
    rcp: {
        width: '100%',
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 9,
        borderRadius: 13,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        backgroundColor: '#fff',
        shadowOpacity: 0.25,
        shadowRadius: 3.3,
        elevation: 6,
    },
    // img: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     borderRadius: 13,
    //     resizeMode: 'cover',
    //     justifyContent: 'center',
    //     width: '100%',
    //     minHeight: '18%',
    //     maxHeight: '42%',
    // },

    rcpbox: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start'
    },
    btn: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 55,
        padding: 5,
        borderRadius: 35,
        backgroundColor: '#fff',
    },
    step: {
        // flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        borderColor: '#F79F5F',
        backgroundColor: '#F79F5F',
        borderRadius: 100,
        borderWidth: 1,
        color: '#FaFaFa',
        width: 25,
        aspectRatio: 1,
    },
    instructions: {
        flex: 8,
        textAlignVertical: 'center',
        color: '#434343'
    },
    img: {
        width: '100%',
        maxWidth: '695px',
        resizeMode: 'cover',
    },
})
export default function Recipe({recipeInfo, ingredientInfo}: any) {
    const navigation = useNavigation();

    return (
        <View style={styles.rcp}>
            <View style={{maxWidth: '100%',}}>
                <ImageBackground
                    style={styles.img}
                    source={{
                        uri: recipeInfo?.image,
                    }}
                    imageStyle={styles.img}
                >
                    <LinearGradient
                        colors={['#00000000', '#00000065', '#000000']}
                    >
                        <Text style={{textAlignVertical: 'bottom', color: '#FaFaFa',}}>
                            <View style={{
                                alignSelf:'center',
                                width: '95%',
                                paddingVertical: '10%',
                                padding: 10,
                                flexDirection: 'row',
                                alignContent:'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{flex: 2,}}>
                                    <h1>{recipeInfo?.name}<br/></h1>
                                </Text>
                                <Text style={{flex: 1,}}>
                                    <MaterialCommunityIcons name="clock" size={24}>
                                        {recipeInfo.preparing_time} min.
                                    </MaterialCommunityIcons>
                                </Text>
                            </View>
                        </Text>
                    </LinearGradient>


                </ImageBackground>

                <View style={{
                    paddingTop: 5,
                    width: '695px',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    maxWidth: '100%',
                    marginTop: '-10%',
                    padding: '2.5%',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}><i>{recipeInfo.description}</i></Text>
                    <Separator/>
                </View>
            </View>

            <ScrollView style={{maxWidth: '100%',}}>
                <View style={{width: '95%', alignSelf: 'center',}}>
                    <Text>
                        <h2 style={{color: '#3F3F3F'}}>Ingrediënten:</h2>
                        <View style={{flexDirection: 'column', width: '100%',}}>
                            {recipeInfo?.ingredients?.map((ingredient: string) => <li
                                key={recipeInfo?.ingredients?.indexOf(ingredient)}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignContent: 'flex-start',
                                    width: '95%',
                                    padding: 5,
                                }}>
                                    <Text style={styles.instructions}>{ingredient}</Text>
                                    <Text>??? gr/l/stk</Text>
                                </View>
                            </li>)}
                        </View>x`
                    </Text>
                    <View style={{maxWidth: '695px'}}>
                        <Separator/>
                    </View>
                    <Text>
                        <h2 style={{color: '#3F3F3F'}}>Bereidingswijze:</h2>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                            {recipeInfo?.instructions?.map((instruction: string) => <li
                                key={recipeInfo?.instructions?.indexOf(instruction)}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignContent: 'flex-start',
                                    width: '95%',
                                    padding: 5,
                                }}>
                                <span style={styles.step}>
                                <Text style={{textAlignVertical: 'center', alignItems: 'center',}}><b>
                                    {+(recipeInfo.instructions.indexOf(instruction) + 1).toString()}
                                </b></Text>
                                </span>
                                    <span style={{padding: 5}}/>
                                    <Text style={styles.instructions}>{instruction}</Text>
                                </View>
                            </li>)}
                        </View>
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={styles.btn}
            >
                <AntDesign name="back" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    );
}