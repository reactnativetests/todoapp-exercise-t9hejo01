import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoScreen from "../screens/ToDoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDo">
        <Stack.Screen name="ToDo" component={ToDoScreen} options={{ title: 'To-Do List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


