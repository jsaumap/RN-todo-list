import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Props = {
  id: string;
  title: string;
  priority: number;
  status: 'pending' | 'finished';
  onHandleDeleteTask: (id: string) => void;
};

const Task: React.FC<Props> = ({
  id,
  title,
  priority,
  status,
  onHandleDeleteTask
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.icons}>
        <MaterialCommunityIcons
          name='delete-circle-outline'
          size={35}
          color='red'
          onPress={() => onHandleDeleteTask(id)}
        />
        <MaterialCommunityIcons
          name='check-circle-outline'
          size={35}
          color='green'
          style={styles.deleteIcon}
        />
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
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  itemText: {
    maxWidth: '80%'
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
  deleteIcon: {
    marginLeft: 15
  }
});
export default Task;
