import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = props => {
    return (

        <View style={styles.listItem}>
            <Text>{props.item}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onDeleteItem}>
                <Text style={styles.deleteText}>Del</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginTop: 10,
        fontSize: 14,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#A6ACFF',
    },
    deleteText: {
        fontSize: 12,
        backgroundColor: 'red',
        borderWidth: 1,
        paddingHorizontal: 5,
        color: 'white',
    },
});

export default TaskItem;