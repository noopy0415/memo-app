import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { loadAll } from "./Store";
import { List, FAB, Text } from 'react-native-paper';
import moment from "moment";
export function Main() {

// const memos:Memo[] = [
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
  const [memos, setMemos] = useState<Memo[]>([]);
  
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
        data={memos}
        renderItem={({item})=>(
          // <Text style={styles.item}>{item.text}</Text>
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={`
              作成日時：${item.createdAt}
            `}
            // descriptionStyle={styles.description}
          />
          )}
        keyExtractor={(item) => `${item.createdAt}`}
      />
      {/* <Button
        onPress={toCompose}
        title="toCompose"
      /> */}
      <FAB
        // icon
        style={styles.addButton}
        icon="pencil"
        onPress={toCompose}
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
  item: {
    flex:1,
    minWidth: "100%",
    flexDirection: "column",
    borderWidth:1,
    borderColor: "#ddd",
    padding: 10,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
