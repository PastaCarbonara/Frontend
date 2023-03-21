import {Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from "react";
import Separator from "../Separator";


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
    img: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 13,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        minHeight: '18%',
        maxHeight: '42%',
    },

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
        // borderRadius: 5,
        // borderColor:'#AFAFAF',
        // borderWidth: 0.5, padding: 5,
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.3,
    },
})
export default function Recipe({recipeInfo, ingredientInfo}: any) {
    const navigation = useNavigation();

    return (
        <View style={styles.rcp}>
            <Image source={{uri: recipeInfo?.image}} style={styles.img}/>
            <Text style={{padding: 5, textAlign: 'center', color: '#434343'}}>
                <h1 style={{color: '#3F3F3F'}}>{recipeInfo?.name}<br/></h1>
                {recipeInfo.description}
            </Text>
            <Separator/>
            <ScrollView style={{width: '100%'}}>
                <Text>
                    <h2 style={{color: '#3F3F3F'}}>Ingredients:</h2>
                    <View style={{flexDirection: 'column', width: '100%',}}>
                        {recipeInfo?.ingredients?.map((ingredient: string) => <li
                            key={recipeInfo?.ingredients?.indexOf(ingredient)}>
                            <View style={{
                                flexDirection: 'row',
                                alignContent: 'flex-start',
                                width: '95%',
                                padding: 5,
                            }}>
                                {/*<span style={styles.step}>*/}
                                {/*<Text style={{textAlignVertical: 'center', alignItems: 'center',}}><b>*/}
                                {/*    ✓*/}
                                {/*</b></Text>*/}
                                {/*</span>*/}
                                <Text style={styles.instructions}>{ingredient}</Text>
                                <Text>??? gr/l/stk</Text>
                            </View>
                        </li>)}
                    </View>
                </Text>
                <Separator/>
                <Text>
                    <h2 style={{color: '#3F3F3F'}}>Instructions:</h2>
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