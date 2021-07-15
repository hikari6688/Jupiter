import { useState } from 'react';
interface dataType {
  value: any;
  date: number;
  expire: number;
}
const useLocalStorage = (key: string, initialValue?: any) => {
  const [storage, setStorage] = useState<dataType>(() => {
    const item: dataType = JSON.parse(localStorage.getItem(key));
    if (item.expire) {
      //时间过期之后调用直接清楚缓存
      const overdue = item.date + item.expire > new Date().getTime();
      overdue && localStorage.removeItem(key);
      return '';
    }
    try {
      return item && item.value ? item.value : initialValue;
    } catch (error) {
      return initialValue || '';
    }
  });

  const setLocalStorageState = (
    newState: any,
    expire?: number
  ): void | string => {
    try {
      const data: dataType = {
        value: newState,
        date: new Date().getTime(),
        expire,
      };
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      setStorage(newState);
    } catch (error) {
      console.log(error);
    }
  };
  return [storage, setLocalStorageState];
};

export default useLocalStorage;
