import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Task from './components/Taks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ITask } from './interface';
import { Picker } from '@react-native-picker/picker';
const initialData: ITask[] = [
  {
    id: '1',
    title: 'first task',
    priority: 'HIGH',
    status: 'pending'
  },
  {
    id: '2',
    title: 'second task',
    priority: 'Low',
    status: 'pending'
  },
  {
    id: '3',
    title: 'third task',
    priority: 'Low',
    status: 'finished'
  }
];

export default function App() {
  const [todoList, setTodoList] = useState<ITask[]>(initialData);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('High');
  const [sorterBy, setSorterBy] = useState('');

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
    const newTask: ITask = {
      id: Date.now() + task,
      title: task,
      priority,
      status: 'pending'
    };
    setTask('');
    setTodoList([...todoList, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    const filterTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(filterTodoList);
  };
  const handleCompleteTask = (id: string) => {
    const newTodoList: ITask[] = todoList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === 'finished' ? 'pending' : 'finished'
        };
      }
      return task;
    });
    setTodoList(newTodoList);
  };

  const sortList = (sorter: string) => {
    setSorterBy(sorter);

    const sortedTodoList = todoList.sort((a, b) => {
      if (sorter === 'name') {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      if (sorter === 'priority') {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      }

      return 0;
    });
    setTodoList(sortedTodoList);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo List</Text>

        <View
          style={styles.sorterPicker}
        >
          <Picker
            selectedValue={sorterBy}
            onValueChange={(itemValue) => sortList(itemValue)}
          >
            <Picker.Item label='Sorter by: Priority' value='priority' />
            <Picker.Item label='Sorter by: Name' value='name' />
          </Picker>
        </View>
        <View style={styles.listTitles}>
          <Text style={styles.subTitle}>Priority</Text>
          <Text style={styles.subTitle}>Task</Text>
          <Text style={styles.subTitleLeft}>Actions</Text>
        </View>
        <View style={styles.items}>
          {todoList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              onHandleDeleteTask={handleDeleteTask}
              onHandleCompleteTask={handleCompleteTask}
            />
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <View style={styles.writeTaskContainer}>
            <Picker
              style={{ width: 100 }}
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}
            >
              <Picker.Item label='High' value='High' />
              <Picker.Item label='Low' value='Low' />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder='Write a task'
              onChangeText={(text) => setTask(text)}
              value={task}
            />
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <StatusBar style='auto' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    flex: 1,
    backgroundColor: '#E8EAED '
  },
  listTitles: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 30
  },
  subTitle: {
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  subTitleLeft: {
    paddingLeft: 180,
    fontWeight: 'bold'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24
  },
  items: {},
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10
  },
  writeTaskContainer: {
    flexDirection: 'row'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    width: 200
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
  addText: {},
  sorterPicker:{
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    marginTop:10
  }
});
