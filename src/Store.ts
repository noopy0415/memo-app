import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

// ストレージの初期化
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24, //milliseconds 24時間
  enableCache: true,
});

export const save = (text: string, createdAt: number) => {
  const key = "memo";
  storage.save({
    key: key,           // データの合言葉 keyでアンダースコア（"_"）を使用しないでください
    id: `${createdAt}`,      // これがないと常に上書きになってしまう。
    data: {
      text: text,
      createdAt: createdAt,
    },
  });
  alert("保存されました");
};

export const loadAll = async () => {
  const key = "memo";
  const memos = await storage.getAllDataForKey<Memo>(key);
  return memos;
};

// export default storage;