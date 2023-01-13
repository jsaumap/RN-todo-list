import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Task from './components/Taks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ITask } from './interface';

const initialData = [
  {
    id: '1',
    description: 'first task',
    priority: 1,
    status: 'pending'
  },
  {
    id: '2',
    description: 'second task',
    priority: 1,
    status: 'pending'
  },
  {
    id: '3',
    description: 'third task',
    priority: 1,
    status: 'finished'
  }
];

export default function App() {
  const [todoList, setTodoList] = useState<any[]>(initialData);

 /*  TODO: Fetch data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        setTodoList(value.split(','));
        return;
      }
      await AsyncStorage.setItem('@storage_Key', initialData.toString());
      setTodoList(initialData);
    } catch (e) {
      // error reading value
    }
  }; */

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}></Text>
        <View style={styles.items}>
          {todoList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              status={task.status}
              priority={task.priority}
            />
          ))}
        </View>
        <StatusBar style='auto' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED '
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24
  },
  items: {
    margin: 30
  }
});
