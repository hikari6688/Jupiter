import { useState } from 'react';

enum ExpireEnum {
  s = 1000,
  m = 60000,
  h = 3600000,
  d = 86400000,
}

interface RecordType {
  value: any;
  date: number;
  expire: number;
}

type SetType = (newState: any, expire?: [number, ExpireKey]) => void;

type ExpireKey = 's' | 'm' | 'h' | 'd';

const useLocalStorage = (key: string, initialValue?: any): [any, SetType] => {
  const [storage, setStorage] = useState<RecordType>(() => {
    try {
      const record: RecordType = JSON.parse(localStorage.getItem(key));
      if (record.expire && record.date) {
        const { expire, date } = record;
        const overdue = date + expire < new Date().getTime();
        overdue && localStorage.removeItem(key);
        return '';
      }
      return record && record.value ? record.value : initialValue;
    } catch (error) {
      return '';
    }
  });
  const setLocalStorageState: SetType = (newState, expire?) => {
    try {
      const record: RecordType = {
        value: newState,
        date: new Date().getTime(),
        expire: expire[0] * ExpireEnum[expire[1]],
      };
      const parsingData = JSON.stringify(record);
      localStorage.setItem(key, parsingData);
      setStorage(newState);
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  };
  return [storage, setLocalStorageState];
};

export default useLocalStorage;
