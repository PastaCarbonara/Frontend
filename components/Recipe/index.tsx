import {Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import React from "react";
import Separator from "../Separator";
import {LinearGradient} from 'expo-linear-gradient';


const styles = StyleSheet.create({
    rcp: {
        height: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 13,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        backgroundColor: '#FFFFFF',
        shadowOpacity: 0.25,
        shadowRadius: 3.3,
        elevation: 6,
    },
    title: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: '10%',
        padding: 10,
        alignItems: 'center',
    },
    description: {
        // paddingTop: 5,
        width: '695px',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxWidth: '100%',
        marginTop: '-10%',
        paddingTop:'5%',
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
        width: '95%',
        padding: 5,
    },
    flexColumn: {
        flexDirection: 'column',
        width: '100%',
    },
    flexRow: {
        flexDirection: 'row',
        width: '100%',
    },
    btn: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 36,
        margin: 9,
        aspectRatio: 1,
        borderRadius: 35,
        backgroundColor: '#00000054',
    },
    stepCounter: {
        borderColor: '#F79F5F',
        backgroundColor: '#F79F5F',
        borderRadius: 100,
        borderWidth: 1,
        color: '#FaFaFa',
        width: 25,
        aspectRatio: 1,
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    centerText: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    instructions: {
        flex: 8,
        textAlignVertical: 'center',
        color: '#434343',
    },
    img: {
        width: '100%',
        maxWidth: '695px',
        resizeMode: 'cover',
    },
    scrollBox: {
        maxWidth: '695px',
        marginBottom:'2.5%',
        borderBottomRightRadius:13,
        borderBottomLeftRadius:13,
    },
});
export default function Recipe({recipeInfo, ingredientInfo}: any) {
    const navigation = useNavigation();
    return (
        <View style={[styles.rcp, styles.flexColumn]}>
            <View style={{maxWidth: '100%',}}>
                <ImageBackground
                    style={styles.img}
                    source={{
                        uri: recipeInfo?.image,
                    }}
                    imageStyle={styles.img}>

                    <LinearGradient
                        colors={['#00000000', '#00000065', '#000000']}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={styles.btn}>
                            <AntDesign name="arrowleft" size={24} color="white"/>
                        </TouchableOpacity>
                        <Text style={{textAlignVertical: 'bottom', color: '#FAFAFA',}}>
                            <View style={[styles.infoBox, styles.title,]}>
                                <View style={[styles.flexRow, {alignItems: 'center',},]}>
                                    <Text style={{flex: 2,}}>
                                        <h1>{recipeInfo?.name}<br/></h1>
                                    </Text>
                                    <View style={[styles.flexColumn, styles.descriptionInfo,]}>
                                        <Text style={[styles.descriptionInfo, {textAlign: 'right',},]}>
                                            <MaterialCommunityIcons name="clock" size={24} style={{flex: 1,}}>
                                                {recipeInfo?.preparing_time}m
                                            </MaterialCommunityIcons>
                                        </Text>
                                        <Text style={[styles.descriptionInfo, {textAlign: 'right',},]}>
                                            <FontAwesome5 name="pepper-hot" size={24}>
                                                <FontAwesome5 name="pepper-hot" size={24}/>
                                            </FontAwesome5>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.description}>
                    <Text style={styles.centerText}><i>{recipeInfo?.description}</i></Text>
                    <Separator/>
                </View>
            </View>
            <ScrollView style={styles.scrollBox}>
                <View style={{width: '95%', alignSelf: 'center',}}>
                    <Text>
                        <h2 style={{color: '#3F3F3F'}}>Ingrediënten:</h2>
                        <View style={styles.flexColumn}>
                            {recipeInfo?.ingredients?.map((ingredient: string) => <li
                                key={recipeInfo?.ingredients?.indexOf(ingredient)}>
                                <View style={styles.infoBox}>
                                    <Text style={styles.instructions}>{ingredient}</Text>
                                    <Text style={{marginLeft: 18,}}>??? gr/l/stk</Text>
                                </View>
                            </li>)}
                        </View>
                    </Text>
                    <View style={{maxWidth: '695px'}}>
                        <Separator/>
                    </View>
                    <Text>
                        <h2 style={{color: '#3F3F3F'}}>Bereidingswijze:</h2>
                        <View style={styles.flexColumn}>
                            {recipeInfo?.instructions?.map((instruction: string) => <li
                                key={recipeInfo?.instructions?.indexOf(instruction)}>
                                <View style={styles.infoBox}>
                                <span style={styles.stepCounter}>
                                <Text style={styles.centerText}><b>
                                    {+(recipeInfo?.instructions.indexOf(instruction) + 1).toString()}
                                </b></Text>
                                </span>
                                    <Text style={[styles.instructions, {paddingLeft: 10}]}>{instruction}</Text>
                                </View>
                            </li>)}
                        </View>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}