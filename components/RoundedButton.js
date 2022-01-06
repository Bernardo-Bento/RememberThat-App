import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');
const RoundedButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ ...styles.roundedButton, ...props.style }}>
                <Text style={{ ...styles.text, ...props.styleText }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );


};

const styles = StyleSheet.create({
    roundedButton: {
        borderColor: 'blue',
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 30,
        width: 100,
        alignItems: 'center'

    },

    text: {
        color: 'white',
        fontSize: height * 0.023,
        fontWeight: 'bold',
    }
});

export default RoundedButton;
