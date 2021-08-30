import React, { useEffect } from 'react';
import { useLoop } from '../../../hooks/index';

const Org = () => {
  const [run, over] = useLoop(function () {
    console.log('org');
  });
  useEffect(() => {
    run();
    return () => {
      over();
    };
  }, []);
  return <div> 机构列表 </div>;
};
export default Org;
