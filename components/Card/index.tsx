import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import {Recipe} from "../../types";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
  cardImg: {
    flex: 1,
    borderRadius: 13,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 48,
  },
  controlRow: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 55,
    height: 55,
    padding: 5,
    borderRadius: 35,
    backgroundColor: '#fff',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.3,
    elevation: 6,
  },
  text_button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    height: 55,
    padding: 5,
    borderRadius: 35,
    backgroundColor: '#fff',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.3,
    elevation: 6,
  },
});

export default function Card({ recipe, onLike, onDislike } : { recipe: Recipe, onLike: () => void, onDislike: () => void }) {
  const navigation = useNavigation()
  return (
    <View style={[styles.card]}>
      <ImageBackground
        style={styles.cardImg}
        source={{
          uri: recipe?.image,
        }}
        imageStyle={styles.cardImg}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{recipe?.name}</Text>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={onDislike}
              style={styles.button}
            >
              <MaterialCommunityIcons name="close-thick" size={28} color="#D94513" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Recipe", {
                id: recipe.id
              }); //this is correct, idk why TypeScript gives an error.
            }}
            style={styles.text_button}>
              <Text>Bekijk recept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onLike}
              style={styles.button}
            >
              <MaterialCommunityIcons name="check-bold" size={28} color="#A8C899" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
