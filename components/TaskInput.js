import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const TaskInput = props => {
    const [insertedTask, setInsertedTask] = useState('');


    const manageInputText = (inputText) => {
        setInsertedTask(inputText);
    };


    return (
        <Modal style={styles.addModal} visible={props.visible} animationType='slide'>
            <View style={styles.pageView}>

                <View style={styles.taskAdderHeader}>
                    <TextInput
                        placeholder="Input a new Task"
                        onChangeText={manageInputText}
                        style={styles.textInput}
                        value={insertedTask} />
                    <View style={styles.addBtn}>
                        <Button title="+" onPress={() => {
                            if (insertedTask != '') {
                                props.onAndPress(insertedTask);
                                setInsertedTask('');
                            }
                        }} />
                    </View>


                </View >
                <View style={styles.cancelBtn}>
                    <Button title='Cancel' onPress={props.onCancel} color='red' />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    pageView: {

        justifyContent: 'center',
        alignContent: 'center',
    },
    taskAdderHeader: {
        marginTop: 40,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    textInput: {
        marginLeft: 20,
        width: '70%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    addBtn: {
        width: '10%',
        marginRight: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cancelBtn: {
        marginTop: -20,
        justifyContent: 'flex-start',
        paddingHorizontal: 30,

    },

});

export default TaskInput;