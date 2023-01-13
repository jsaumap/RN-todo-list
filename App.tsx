import { StatusBar } from 'expo-status-bar';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Task from './components/Taks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ITask } from './interface';

const initialData: ITask[] = [
  {
    id: '1',
    title: 'first task',
    priority: 1,
    status: 'pending'
  },
  {
    id: '2',
    title: 'second task',
    priority: 1,
    status: 'pending'
  },
  {
    id: '3',
    title: 'third task',
    priority: 1,
    status: 'finished'
  }
];

export default function App() {
  const [todoList, setTodoList] = useState<ITask[]>(initialData);
  const [task, setTask] = useState('');

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
  const handleAddTask = () => {
    console.log(task);
    const newTask: ITask = {
      id: Date.now() + task,
      title: task,
      priority: 1,
      status: 'pending'
    };
    setTodoList([...todoList, newTask]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo List</Text>
        <View style={styles.items}>
          {todoList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
            />
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder='Write a task'
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <StatusBar style='auto' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
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
    marginTop: 30
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {}
});
