/**
 * 1.连接db connectDB
 * 2.读取db数据 getDB
 * 3.写入db数据 writeDB
 */
interface IDB {
  connectDB: () => Promise<any>;
}
export default function useDB(databaseName: string, version: number): IDB {
  const connectDB = () => {
    //打开或者新建数据库
    const request = window.indexedDB.open(databaseName, version);
    return new Promise((resolve, reject) => {
      request.onerror = function () {
        reject();
      };
      request.onsuccess = function () {
        const db = request.result as IDBDatabase;
        resolve(db);
      };
      request.onupgradeneeded = function (event: any) {
        const db = event.target.result;
        //建表
        if (!db.objectStoreNames.contains('person')) {
          const objectStore = db.createObjectStore('person', { keyPath: 'id' });
          objectStore.createIndex('name', 'name', { unique: false });
          objectStore.createIndex('email', 'email', { unique: true });
        }
      };
    });
  };
  return {
    connectDB,
  };
}
