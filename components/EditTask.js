import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Dimensions } from 'react-native';
import RoundedButton from "./RoundedButton";

const { width, height } = Dimensions.get('screen');
const EditTask = props => {
    const [taskText, setTaskText] = useState(props.taskText);
    const [taskDescription, setTaskDescription] = useState(props.description);
    return (
        <Modal animationType="slide" visible={props.showScreen}>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> Task Update </Text>
                </View>

                <TextInput defaultValue={taskText} style={styles.textInput} />
                <TextInput defaultValue={taskDescription}
                    style={styles.description}
                    placeholder="Description (optional)"
                    multiline={true}
                    textAlignVertical={"top"} />
                <View style={styles.buttonContainer}>
                    <RoundedButton title='Cancel' onPress={props.onCancelPress} style={styles.cancelBtn} />
                    <RoundedButton title='Update' onPress={props.onUpdate(taskText, taskDescription)} style={styles.updateBtn} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: width * 0.2,
        width: '100%',
    },
    header: {
        marginTop: height * 0.06,
    },
    headerText: {
        color: 'blue',
        fontSize: height * 0.05,
        fontWeight: 'bold',
    },
    textInput: {
        borderBottomWidth: 1,
        marginBottom: 5,
        borderBottomColor: 'black',
        width: width * 0.8,
        marginTop: height * 0.06,
    },
    cancelBtn: {
        marginTop: 30,
        backgroundColor: 'red',
        borderColor: 'red',
        height: height * 0.05,
        width: width * 0.25,
    },
    updateBtn: {
        marginTop: 30,
        width: width * 0.25,
        height: height * 0.05,
        borderColor: 'blue',
        backgroundColor: 'blue',
    },
    description: {
        marginTop: 30,
        height: height * 0.25,
        width: width * 0.85,
        borderWidth: 1,
        padding: 10,
    },
});

export default EditTask;