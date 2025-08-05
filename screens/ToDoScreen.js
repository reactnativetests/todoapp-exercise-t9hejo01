import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ToDoScreen = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        const trimmed = task.trim();
        if (trimmed === '' || /^\d+$/.test(trimmed) || trimmed.length >= 100 || trimmed.length <= 3) return;

        const newTask = {
            id: Date.now().toString(),
            text: task,
            date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        };

        setTasks([newTask, ...tasks]);
        setTask('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => item.id !== id));
    };

    return (
        <View style={StyleSheet.comtainer}>
            <Text style={styles.title}>To-Do List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a task"
                    value={task}
                    onChangeText={setTask}
                />
                <Button title="Add" testID='add-button' onPress={addTask} />
            </View>

            {tasks.length === 0 ? (
                <Text style={styles.noTasks}>No Tasks yet</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <View>
                                <Text style={styles.taskText}>{item.text}</Text>
                                <Text style={styles.timestamp}>{item.date}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <Text style={styles.delete}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {tasks.length > 0 && (
                <Button title="Clear all tasks" testID='clear-all-button' onPress={() => setTasks([])} />
            )}

            {task.length > 100 && (
                <Text style={styles.warning}>Task cannot exceed 100 characters</Text>
            )}
        </View>
    )
}

export default ToDoScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },    
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    taskText: { fontSize: 16 },
    timestamp: { fontSize: 12, color: '#888' },
    delete: { color: 'red', fontWeight: 'bold' },
    noTasks: { textAlign: 'center', color: '#888', marginTop: 50 },
    warning: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
        marginBottom: 8,
    }
});

