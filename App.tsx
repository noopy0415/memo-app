import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// react navigation ライブラリ
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
// react native paper ライブラリ
import { Provider as PaperProvider } from "react-native-paper"; // 追加

// Screens
import { Main } from "./src/Main";
import { Compose } from "./src/Compose";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Main'
            component={Main}
          />
          <Stack.Screen
            name='Compose'
            component={Compose}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
