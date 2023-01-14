import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';
import React from 'react';

describe('App', () => {
  it('should add a new task to the todo list', () => {
    const { getByTestId, getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('Write a task');
    const addButton = getByTestId('add-button');
    const taskList = getByTestId('task-list');

    expect(taskList.props.children).toHaveLength(3);

    fireEvent.changeText(input, 'Clean the kitchen');
    fireEvent.press(addButton);

    expect(taskList.props.children).toHaveLength(4);
  });
  it('deletes a task from the task list when the delete button is pressed', async () => {
    const { getByTestId } = render(<App />);
    const taskList = getByTestId('task-list');

    expect(taskList.props.children).toHaveLength(3);

    const deleteButton = getByTestId('delete-button-1');

    fireEvent.press(deleteButton);

    expect(taskList.props.children).toHaveLength(2);
  });
  it('marks a task as complete when the complete button is pressed', async () => {
    const { getByTestId } = render(<App />);
    const taskList = getByTestId('task-list');
    const completeButton = getByTestId('complete-button-1');

    fireEvent.press(completeButton);

    expect(taskList.props.children[0].props.status).toBe('finished');

    fireEvent.press(completeButton);

    expect(taskList.props.children[0].props.status).toBe('pending');
  });
  it('sorts the todo list by priority', async () => {
    const { getByTestId } = render(<App />);
    const taskList = getByTestId('task-list');
    const sortByPriorityButton = getByTestId('sort-by-priority');

    fireEvent.press(sortByPriorityButton);

    expect(taskList.props.children[0].props.priority).toBe('HIGH');
  });
  it('sorts the todo list by name', async () => {
    const { getByTestId } = render(<App />);
    const taskList = getByTestId('task-list');
    const sortByPriorityButton = getByTestId('sort-by-name');

    fireEvent.press(sortByPriorityButton);

    expect(taskList.props.children[0].props.title).toBe('first task');
  });
});
