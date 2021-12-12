import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Logo = props => {
    return (
        <Text style={styles.logoBlack}>
            Remember
            <Text style={styles.logoBlue}>That</Text>
        </Text>
    );
};

const styles = StyleSheet.create({
    logoBlack: {
        marginTop: 5,
        fontSize: 30,
        fontWeight: 'bold',
    },
    logoBlue: {
        color: 'blue',
    },

});

export default Logo;