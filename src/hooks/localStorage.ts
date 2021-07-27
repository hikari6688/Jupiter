import { useState } from 'react';

interface RecordType {
  value: any;
  date: number;
  expire: number;
}
interface SetType {
  newState: any;
  expire?: [number, ExpireKey];
}
type ExpireKey = 's' | 'm' | 'h' | 'd';

enum ExpireEnum {
  s = 1000,
  m = 60000,
  h = 3600000,
  d = 86400000,
}

const useLocalStorage = (
  key: string,
  initialValue?: any
): [RecordType, (newState: any, expire?: [number, ExpireKey]) => void] => {
  const [storage, setStorage] = useState<RecordType>(() => {
    try {
      const record: RecordType = JSON.parse(localStorage.getrecord(key));
      if (record.expire && record.date) {
        const { expire, date } = record;
        const overdue = date + expire > new Date().getTime();
        overdue && localStorage.removerecord(key);
        return '';
      }
      return record && record.value ? record.value : initialValue;
    } catch (error) {
      return '';
    }
  });

  const setLocalStorageState = (
    newState: any,
    expire?: [number, ExpireKey]
  ): void => {
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
