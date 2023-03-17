import {Text, TouchableOpacity, View, Image, StyleSheet, ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";


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
    }
})
export default function Recipe({recipeData}: any) {
    const navigation = useNavigation();
    const ingredientMap = recipeData?.ingredients?.map((ingredient: string) => <li key={recipeData.ingredients.indexOf(ingredient)}>{ingredient}</li>);
    const instructionMap = recipeData?.instructions?.map((instruction: string) => <li key={recipeData.instructions.indexOf(instruction)}>{instruction}</li>);
    return (
        <View style={styles.rcp}>
            <Image source={{uri: recipeData?.image}} style={styles.img}/>
            <h1>{recipeData?.name}<br/></h1>
            <ScrollView>
                <Text style={styles.rcpbox}>
                    <Text>
                        <h2>Ingredients:</h2>
                        <Text>{ingredientMap}</Text>
                    </Text>
                </Text>
                <Text>
                    <Text>
                        <h2>Instructions:</h2>
                        <Text>{instructionMap}</Text>
                    </Text>
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