import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function Compose() {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        // mode="outlined"
        placeholder="メモしたいことを入力してください。"
        multiline
        onChangeText={(text) => setText(text)}
      />
      <Button
        // mode="contained"
        onPress={()=>{console.log(text)}}
        title="保存"
      />
      <Button
        onPress={toBack}
        title="戻る"
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
