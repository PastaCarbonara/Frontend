import {StyleSheet, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    separatingLine: {
        borderBottomColor: '#F79F5F',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        height: 0,
    },
});
export default function Separator () :any {
    return (
        <View style={styles.separatingLine}>

        </View>
    )
}