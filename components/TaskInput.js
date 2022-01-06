import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker, TextInput, StyleSheet, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback, Keyboard, Platform, Image } from 'react-native';
import RoundedButton from './RoundedButton';
import DateTimePicker from "@react-native-community/datetimepicker";


const { width, height } = Dimensions.get('screen');
const TaskInput = props => {
    const [insertedTask, setInsertedTask] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [daysBetween, setDaysBetween] = useState();
    let finalDate = '' + date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear();

    const onChange = (event, selectedDate) => {

        setShow(Platform.OS === 'ios');
        if (event.type == "set" && Platform.OS === 'android') {
            let selected = new Date(selectedDate);
            setDate(selected);
        }
        if (Platform.OS === 'ios') {
            let selected = new Date(selectedDate);
            setDate(selected);
        }
        else {
            return;
        }
    };

    useEffect(() => {
        let today = new Date();
        const diffTime = Math.abs(date - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (date.getDate() === today.getDate()) {
            setDaysBetween(0);
        }
        else {
            setDaysBetween(diffDays);
        }
    }, [date, setDaysBetween])

    const showDatepicker = () => {
        setShow(true);
    };

    const manageInputText = (inputText) => {
        setInsertedTask(inputText);
    };
    const descriptionHandler = (insertedDescription) => {
        setDescription(insertedDescription);
    };
    const onCancelPress = () => {
        setDate(new Date());
        setDaysBetween();
        setDescription('');
        setInsertedTask('');
        props.onCancel();
    }

    return (
        <Modal style={styles.addModal} visible={props.visible} animationType='slide'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.pageView}>

                    <View style={styles.taskAdderHeader}>
                        <TextInput
                            placeholder="Input a new Task"
                            onChangeText={manageInputText}
                            style={styles.textInput}
                            value={insertedTask} />
                        <View style={styles.addBtn}>
                            <RoundedButton title='+' style={styles.addTask} onPress={() => {
                                if (insertedTask != '') {
                                    props.onAndPress(insertedTask, description, finalDate);
                                    setInsertedTask('');
                                    setDescription('');
                                }

                            }} />
                        </View>


                    </View >
                    <View style={styles.descriptionBox}>
                        <TextInput style={styles.description}
                            placeholder='Enter Description (optional)'
                            multiline={true}
                            textAlignVertical={'top'}
                            value={description}
                            onChangeText={descriptionHandler} />
                    </View>


                    <View style={styles.dateBtnContainer}>
                        {Platform.OS === 'android' && (
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.androidSetDate}>
                                    <Image source={require('../assets/clock.png')} style={styles.clockImage} />
                                    <Text style={styles.deadlineText}> {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()} </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        {Platform.OS === 'android' && show && (

                            <DateTimePicker
                                testID="dateTimePicker"
                                mode={'date'}
                                is24Hour={true}
                                value={date}
                                display="default"
                                onChange={onChange}
                                style={styles.calendar}
                                minimumDate={new Date()}
                            />

                        )}

                        {Platform.OS === 'ios' && (
                            <View style={styles.iosDatePicker}>
                                <Image source={require('../assets/clock.png')} style={styles.clockImage} />
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    mode={'date'}
                                    is24Hour={true}
                                    value={date}
                                    display="default"
                                    onChange={onChange}
                                    style={styles.calendar}
                                    minimumDate={new Date()}
                                />
                            </View>
                        )}

                    </View>
                    <View style={styles.cancelBtnContainer}>
                        <RoundedButton title='Cancel' onPress={onCancelPress} style={styles.cancelBtn} />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </Modal >
    );
};

const styles = StyleSheet.create({
    pageView: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    androidSetDate: {
        marginTop: 10,
        flexDirection: 'row',
        width: width * 0.5,
        height: height * 0.05,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    iosDatePicker: {
        marginTop: 10,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clockImage: {
        width: 30,
        height: 30,
    },
    deadlineText: {
        fontSize: height * 0.023,
        color: 'black',
    },
    addTask: {
        borderRadius: 100,
        width: height * 0.06,
        height: height * 0.06,
        backgroundColor: 'blue',
    },
    description: {
        height: height * 0.25,
        width: width * 0.85,
        borderWidth: 1,
        padding: 10,

    },
    dateBtnContainer: {
        width: '100%',
        alignItems: 'center',
    },
    calendar: {
        width: width * 0.3,
        height: height * 0.06,
    },
    dateText: {
        fontSize: height * 0.025,
    },
    dateContainer: {
        marginTop: 20,
        width: width,
        paddingHorizontal: width * 0.07,
    },
    dateInputContainer: {},
    taskAdderHeader: {
        marginTop: 40,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    descriptionBox: {
        marginTop: 10,
        width: width,
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 20,
        width: '70%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    cancelBtn: {
        borderColor: 'red',
        backgroundColor: 'red',
        width: width * 0.85,
        height: height * 0.06,

    },
    addBtn: {
        width: '10%',
        marginRight: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cancelBtnContainer: {
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'flex-start',
        paddingHorizontal: 30,

    },

});

export default TaskInput;