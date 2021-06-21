import { useState } from 'react';

const useLocalStorage = (key: string, initialValue?: any) => {
  const [storage, setStorage] = useState(() => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return item || initialValue;
    }
  });
  const setLocalStorageState = (newState: any): void | string => {
    try {
      const item = JSON.stringify(newState);
      localStorage.setItem(key, item);
      setStorage(item);
    } catch (error) {
      console.log(error);
    }
  };
  return [storage, setLocalStorageState];
};

export default useLocalStorage;
