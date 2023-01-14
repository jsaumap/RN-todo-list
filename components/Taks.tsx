import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Props = {
  id: string;
  title: string;
  priority: string;
  status: 'pending' | 'finished';
  onHandleDeleteTask: (id: string) => void;
  onHandleCompleteTask: (id: string) => void;
};

const Task: React.FC<Props> = ({
  id,
  title,
  priority,
  status,
  onHandleDeleteTask,
  onHandleCompleteTask
}) => {
  return (
    <View style={styles.item} testID={`task-${id}`}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <Text>{priority}</Text>
        </View>
        <View style={styles.textSpace}>
          <Text style={styles.itemText}>{title}</Text>

          <Text style={styles.statusTextPending}>{status}</Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity
          testID={`delete-button-${id}`}
          onPress={() => onHandleDeleteTask(id)}
        >
          <MaterialCommunityIcons
            name='delete-circle-outline'
            size={35}
            color='red'
          />
        </TouchableOpacity>

        {status === 'finished' ? (
          <TouchableOpacity
            testID={`complete-button-${id}`}
            onPress={() => onHandleCompleteTask(id)}
          >
            <MaterialCommunityIcons
              name='undo'
              size={35}
              color='black'
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`complete-button-${id}`}
            onPress={() => onHandleCompleteTask(id)}
          >
            <MaterialCommunityIcons
              name='check-circle-outline'
              size={35}
              color='green'
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  square: {
    width: 40,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 18
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  rightIcon: {
    marginLeft: 15
  },
  textSpace: {
    width: '60%'
  },
  statusTextPending: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'yellow',
    borderRadius: 20,
    maxWidth: '40%',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#c2c2c2'
  }
});
export default Task;
