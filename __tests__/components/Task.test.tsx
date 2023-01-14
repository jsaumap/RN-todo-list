import { render, screen, fireEvent } from '@testing-library/react-native';
import Task from '../../components/Taks';
import React from 'react';

describe('<Task />', () => {

  it('calls the onHandleDeleteTask prop when the delete button is pressed', async () => {
    const onHandleDeleteTaskMock = jest.fn();
    const renderer = render(
      <Task
        id='1'
        title='Clean the kitchen'
        priority='High'
        status='pending'
        onHandleDeleteTask={onHandleDeleteTaskMock}
        onHandleCompleteTask={() => {}}
      />
    );
    const deleteButton = renderer.getByTestId('delete-button-1');

    fireEvent.press(deleteButton);

    expect(onHandleDeleteTaskMock).toHaveBeenCalledWith('1');
  });
  it('calls the onHandleDeleteTask prop when the delete button is pressed', async () => {
    const onHandleCompleteTaskMock = jest.fn();
    const renderer = render(
      <Task
        id='1'
        title='Clean the kitchen'
        priority='High'
        status='pending'
        onHandleDeleteTask={() => {}}
        onHandleCompleteTask={onHandleCompleteTaskMock}
      />
    );
    const deleteButton = renderer.getByTestId('complete-button-1');

    fireEvent.press(deleteButton);

    expect(onHandleCompleteTaskMock).toHaveBeenCalledWith('1');
  });
  it('Test that the task displayed all props correctly', async () => {
    const { getByText } = render(
      <Task
        id='1'
        title='Write Test'
        priority='High'
        status='pending'
        onHandleDeleteTask={() => {}}
        onHandleCompleteTask={() => {}}
      />
    );
    expect(getByText('Write Test')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
    expect(getByText('pending')).toBeTruthy();
  });
});
