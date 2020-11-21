# 初期化

## 流れ

1. 初期化
1. 2画面の`Main.tsx`、 `Compose.tsx` を作成して `App.tsx` の内容をコピー
1. Main.tsxとCompose.tsxはexport function 名前に変更してTextも名前を変えておく
1. それぞれの画面のナビゲーションを作成

```shell
$ expo init memo-app
> blank(TypeScript)
```

cd memo-app
code .

機能と必要なライブラリとコンポーネント

- 一覧画面
  - 登録したメモの一覧が表示される
  - 入力ボタンで入力画面に遷移 -> ライブラリ(React Navigation)
  - メモをタップして編集画面に遷移 -> ライブラリ(React Navigation)
- 入力画面
  - 保存 -> ライブラリ(React Native Storage)
  - 保存後、一覧画面に遷移 -> ライブラリ(React Navigation)
- 編集画面
  - 保存されている内容を表示
  - 内容を編集
  - 保存 -> ライブラリ(React Native Storage)
  - 保存後、一覧画面に遷移 -> ライブラリ(React Navigation)

react-navigationをインストール

[公式サイトより](https://reactnavigation.org/docs/getting-started/)

react-navigationのコアライブラリをインストール

```shell
yarn add @react-navigation/native
```

依存ライブラリをインストール
(expo installとすることで依存しているバージョンをインストールしてくれる)

```shell
$ expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```



| @react-navigation/stack | React Navigation 補助ライブラリ |

| react-native-paper | コンポーネントのライブラリ |
| react-native-storage | React Native Storage コアライブラリ |
| @react-narive-community | React Native Storage 補助ライブラリ |

```shell
yarn add @react-navigation/native
yarn add @react-navigation/stack
yarn add react-native-gesture-handler@~1.7.0
yarn add react-native-paper
```

`App.tsx` 不要なコードを削除

```tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // 中身を削除
  )
}

// スタイルを削除
```

ナビゲーションの設定を書いていく

`App.tsx`

```tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// react navigation ライブラリ
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

// Screens
import { Main } from "./src/Main";
import { Compose } from "./src/Compose";

const Stack = createStackNavigator();

export default function App() {
  return (
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
  )
}

```

一覧画面

`Main.tsx`

```tsx
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function Main() {
  const navigation = useNavigation();
  
  const toCompose = () => {
    navigation.navigate("Compose")
  }

  return (
    <View style={styles.container}>
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
```

入力画面

`Compose.tsx`

```tsx
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function Compose() {
  const navigation = useNavigation();

  const toBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
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
```

一覧画面を作る

一覧画面はFlatListを使って書いていきます。
複数の列を表示するのに適しています。今回はメモを複数保存して表示します。
[FlatList](https://reactnative.dev/docs/next/flatlist)

`Main.tsx`

```tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// react navigation ライブラリ
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

// Screens
import { Main } from "./src/Main";
import { Compose } from "./src/Compose";

const Stack = createStackNavigator();

export default function App() {
  return (
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
  )
}
```

入力画面

`Compose`

```tsx
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function Compose() {
  const navigation = useNavigation();

  const toBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="test"
        multiline
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
```

入力した値を保存して出力する

`Compose.tsx`

```tsx
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function Compose() {
  const navigation = useNavigation();
  const [text, setText] = React.useState(""); // 追加

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="メモしたいことを入力してください。"
        multiline
        onChangeText={(text) => setText(text)}
      />
      <Button                             // 追加
        onPress={()=>{console.log(text)}} // 追加
        title="保存"                       // 追加
      />                                  {/* 追加 */}
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
