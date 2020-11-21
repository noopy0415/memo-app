import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { loadAll } from "./Store";

export function Main() {

// const memos = [
//   {
//     text: "これがメモの内容だよ",
//     createdAt: `new Date()`,
//   },
//   {
//     text: "2つ目のメモだよ",
//     createdAt: "1585574700000",
//   },
//   {
//     text:
//       "３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ３つ目のメモだよ",
//     createdAt: "1234567890123",
//   },
// ];

  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);
  
  // useEffectは最初にページが読み込まれた時に呼び出される
  useEffect(() => {
    // asyncで非同期で読み込み
    const initialize = async () => {
      // awaitで読み込みが終わるまで待機
      const newMemos = await loadAll();
      setMemos(newMemos);
    };
    // 画面が戻ってきた時に動作するようにnavigationの動作に追加
    navigation.addListener("focus", initialize);
  })
  
  const toCompose = () => {
    navigation.navigate("Compose")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}                                      // 表示するオブジェクト
        renderItem={(item)=>(                             // オブジェクトから1つずつ受け取った値を
          <Text>{item.item.text}</Text>                   // 表示
        )}
        keyExtractor={(item, index) => index.toString()}
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
