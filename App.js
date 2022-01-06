import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import TaskItem from './components/TaskItem';
import TaskInput from './components/TaskInput';
import Logo from './components/Logo';
import RoundedButton from './components/RoundedButton';

const { width, height } = Dimensions.get('screen');
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskID, setTaskID] = useState(1);
  const [showModal, setShowModal] = useState(false);



  const manageAddBtn = (taskToAdd, taskDescription, date) => {
    setTasks(renewTaskList => [...renewTaskList, { id: taskID, value: taskToAdd, description: taskDescription, time: date }]);
    setTaskID(taskID + 1);
    setShowModal(false);
  };

  const deleteItem = (taskId) => {
    setTasks(currentTasks => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  const clearAllTasks = () => {
    setTasks([]);
  };
  const showAddTaskModal = () => {
    setShowModal(true);
  }
  const onCancelBtnHandler = () => setShowModal(false);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <View style={styles.addBtn}>
          <RoundedButton title='Clear' style={styles.cancelBtn} onPress={() => clearAllTasks()} />
        </View>
      </View>
      <TaskInput visible={showModal}
        onAndPress={manageAddBtn}
        onCancel={onCancelBtnHandler} />
      <FlatList keyExtractor={(item, index) => item.id}
        data={tasks}
        renderItem={itemData => (
          <TaskItem description={itemData.item.description}
            id={itemData.item.id}
            item={itemData.item.value}
            date={itemData.item.time}
            onDeleteItem={() => deleteItem(itemData.item.id)}
          />
        )
        } />
      <View style={styles.closeAllBtn}>
        <RoundedButton title='Add new Task' onPress={() => showAddTaskModal()} style={styles.addTaskBtn} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  addTaskBtn: {
    width: width * 0.8,
    height: height * 0.06,
    backgroundColor: 'blue'
  },
  cancelBtn: {
    borderColor: 'red',
    backgroundColor: 'red',
    height: height * 0.05,
    width: height * 0.12,
  },
  addBtn: {
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tasksContainer: {
    height: '100%',

  },
  closeAllBtn: {
    //backgroundColor: 'black',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.01,

  },


});
