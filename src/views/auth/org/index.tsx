import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import useDB from '../../../hooks/useDb';
import useWorker from '../../../hooks/useWorker';

const Org = () => {
  let g = 0;
  const { connectDB } = useDB('711', 1);
  const { creatWorker, killWorker } = useWorker();
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const worker = creatWorker();
  const makeClick = async () => {
    function ddd() {
      let g = 0;
      // return new Promise((resolve, reject) => {
      //   while (true) {
      //     g += 0.1;
      //     console.log(g);
      //     if (
      //       g >
      //       9999
      //     )
      //       return Promise.resolve(g);
      //   }
      // });
    }
    while (true) {
      g += 0.1;
      console.log(g);
      if (g > 9999) return Promise.resolve(g);
    }
    // worker.postMessage({ fnStr: ddd.toString(), arg: [1, 2] });
    // worker.onmessage = function (event: any) {
    //   console.log(event.data);
    //   killWorker();
    // };

    // const db: IDBDatabase = await connectDB();
    // db.transaction('person', 'readwrite').objectStore('person').add({
    //   id: 1,
    //   name: 'zolaa',
    //   age: 122,
    //   gender: 1,
    //   mail: 'zolaa@hotmail.com',
    // });
    // db
    //   .transaction('person', 'readwrite')
    //   .objectStore('person')
    //   .openCursor().onsuccess = function (event: any) {
    //   const cursor = event.target.result;

    //   if (cursor) {
    //     console.log(cursor.value);
    //     cursor.continue();
    //   }
    // };
  };
  const fileChange = async (e) => {
    e.persist();
    const db: IDBDatabase = await connectDB();
    const file = e.target.files[0];
    db.transaction('person', 'readwrite').objectStore('person').add({
      id: 3,
      name: 'hikari',
      age: 22,
      email: 'hpcgg@foxmail.com',
      file: file,
    });
  };
 
  return (
    <div>
      {/* <Button >点击</Button> */}
      <button className="btn" onClick={makeClick}>
        点击
      </button>
      <button
        className="btn"
        onClick={() => {
          console.log(888);
        }}
      >
        阻击
      </button>
    </div>
  );
};
export default Org;
