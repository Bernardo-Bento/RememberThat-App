import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import EditTask from './EditTask';


const { width, height } = Dimensions.get('screen');
const TaskItem = props => {
    const [showEdit, setShowEdit] = useState(false);
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState(props.item);
    const [description, setDescription] = useState(props.description)
    //const [date, setDate] = useState(props.date);
    let checkMark;

    let dateText = props.date;

    const update = (newTitle, newDescription) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    if (done === false) {
        checkMark = (
            <View style={styles.checkCircle}>

            </View>
        );
    }
    if (done === true) {
        checkMark = (
            <View>
                <Image source={require('../assets/check.png')} style={styles.checkImage} />
            </View>
        );
    }
    return (
        <View>
            <TouchableOpacity onPress={() => setShowEdit(true)}>
                <View style={styles.listItem}>
                    <View style={styles.leftSize}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                        <View style={styles.date}>
                            <Image source={require('../assets/clock.png')} style={styles.clockImage} />
                            <Text> {dateText}</Text>
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <TouchableOpacity activeOpacity={0.8} onPress={props.onDeleteItem} >
                            <Image source={require('../assets/trash.png')} style={styles.imageScale} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (done === false) {
                                setDone(true);
                            }
                            if (done === true) {
                                setDone(false);
                            }
                        }}>
                            {checkMark}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
            <EditTask showScreen={showEdit} onCancelPress={() => setShowEdit(false)} taskText={props.item} description={description} onUpdate={update} />
        </View >
    )
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 10,
        fontSize: 14,
        width: '100%',
        height: height * 0.3,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#A6ACFF',
    },
    checkImage: {
        marginTop: 3,
        height: 30,
        width: 30,
    },
    descriptionText: {
        marginTop: 8,
    },
    clockImage: {
        height: 25,
        width: 25,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.01,
    },
    checkCircle: {
        height: 25,
        width: 25,
        borderWidth: 1,
        borderRadius: 100,

    },
    rightSide: {
        //backgroundColor: 'green',
        width: width * 0.1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 7,
    },
    leftSize: {
        width: width * 0.7,
        // backgroundColor: 'blue',
    },
    deleteText: {
        fontSize: 12,
        backgroundColor: 'red',
        borderWidth: 1,
        paddingHorizontal: 5,
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: height * 0.03,
        color: 'blue',
    },
    imageScale: {
        height: 25,
        width: 25,
    },
});

export default TaskItem;