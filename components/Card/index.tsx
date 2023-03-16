import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

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
});

export default function Card({ recipe }: any) {
  return (
    <View style={[styles.card]}>
      <ImageBackground
        style={tw`rounded-xl justify-end w-full flex-1`}
        resizeMode="cover"
        source={{
          uri: recipe?.image,
        }}
        imageStyle={tw`rounded-xl justify-end w-full flex-1`}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{recipe?.name}</Text>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
              }}
              style={styles.button}
            >
              <MaterialCommunityIcons name="close-thick" size={28} color="#D94513" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              }}
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
