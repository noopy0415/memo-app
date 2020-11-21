import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const notes = [
  {
    text: "これがメモの内容だよ",
    createdAt: new Date(),
  },
  {
    text: "2つ目のメモだよ",
    createdAt: 1585574700000,
  },
  {
    text:
      "３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ",
    createdAt: 1234567890123,
  },
];

export function Main() {
  const navigation = useNavigation();
  
  const toCompose = () => {
    navigation.navigate("Compose")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={(note)=>(
          <Text>{note.item.text}</Text>
        )}
      />
      <Button
        onPress={toCompose}
        title="toCompose"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
