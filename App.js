import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import TaskItem from './components/TaskItem';
import TaskInput from './components/TaskInput';
import Logo from './components/Logo';


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskID, setTaskID] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const manageAddBtn = (taskToAdd) => {
    setTasks(renewTaskList => [...renewTaskList, { id: taskID, value: taskToAdd }]);
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
          <Button title='Clear' onPress={clearAllTasks} />
        </View>
      </View>
      <TaskInput visible={showModal} onAndPress={manageAddBtn} onCancel={onCancelBtnHandler} />
      <FlatList keyExtractor={(item, index) => item.id}
        data={tasks}
        renderItem={itemData => (
          <TaskItem id={itemData.item.id} item={itemData.item.value} onDeleteItem={() => deleteItem(itemData.item.id)} />
        )
        } />
      <View style={styles.closeAllBtn}>
        <Button title='Add new Task' onPress={showAddTaskModal} />
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
  addBtn: {
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tasksContainer: {
    height: '100%',

  },
  closeAllBtn: {},


});
