import React from "react";
import ToDoScreen from "../screens/ToDoScreen";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

describe('ToDoScreen component', () => {
    it('renders correctly', () => { 
        const { getByText, getByPlaceholderText } = render(<ToDoScreen />);
        expect(getByText('To-Do List')).toBeTruthy();
        expect(getByPlaceholderText('Add a task')).toBeTruthy();
    });

    it('adds a task when "Add a task" is pressed', async () => {
        const { getByText, getByTestId, getByPlaceholderText } = render(<ToDoScreen />);
        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        fireEvent.changeText(input, 'Buy groceries');
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText('Buy groceries')).toBeTruthy();
        });
    });

    it('deletes a task', async () => {
        const { getByText, getByTestId, getByPlaceholderText, queryByText } = render(<ToDoScreen />);
        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        fireEvent.changeText(input, 'Walk a dog');
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText('Walk a dog')).toBeTruthy();
        });

        const deleteButton = getByText('Delete');
        fireEvent.press(deleteButton);

        await waitFor(() => {
            expect(queryByText('Walk a dog')).toBeNull();
        })
    })

    it('does not add empty task', () => {
        const { getByTestId, queryAllByText } = render(<ToDoScreen />);
        const addButton = getByTestId('add-button');

        fireEvent.press(addButton);

        const taskItems = queryAllByText(/Delete/);
        expect(taskItems.length).toBe(0);
    })

    it('does not add task when input is only numbers', () => {
        const { getByPlaceholderText, getByTestId, queryAllByText } = render(<ToDoScreen />);

        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        fireEvent.changeText(input, '123456');
        fireEvent.press(addButton);

        const deleteButtons = queryAllByText(/Delete/);
        expect(deleteButtons.length).toBe(0);
    })

    it('does not add a task if input exceeds character limit', () => {
        const { getByPlaceholderText, getByTestId, queryAllByText } = render(<ToDoScreen />);
        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        const longText = 'A'.repeat(101);

        fireEvent.changeText(input, longText);
        fireEvent.press(addButton);

        const deleteButtons = queryAllByText(/Delete/);
        expect(deleteButtons.length).toBe(0);
    })

    it('does not add a task if input is too short', () => {
        const { getByPlaceholderText, getByTestId, queryAllByText } = render(<ToDoScreen />);
        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        fireEvent.changeText(input, 'Hi');
        fireEvent.press(addButton);

        const deleteButtons = queryAllByText(/Delete/);
        expect(deleteButtons.length).toBe(0);
    })

    it('clears all tasks when "Clear all tasks" is pressed', async () => {
        const { getByPlaceholderText, getByTestId, getByText, queryByText } = render(<ToDoScreen />);
        const input = getByPlaceholderText('Add a task');
        const addButton = getByTestId('add-button');

        fireEvent.changeText(input, 'Walk a dog');
        fireEvent.press(addButton);

        fireEvent.changeText(input, 'Buy groceries');
        fireEvent.press(addButton)

        await waitFor(() =>  {
            expect(getByText('Walk a dog')).toBeTruthy();
            expect(getByText('Buy groceries')).toBeTruthy();
        });

        const clearAllButton = getByTestId('clear-all-button');
        fireEvent.press(clearAllButton);

        await waitFor(() => {
            expect(queryByText('Walk a dog')).toBeNull();
            expect(queryByText('Buy groceries')).toBeNull();
        })
    })
})
