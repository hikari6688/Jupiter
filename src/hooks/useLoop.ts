function useLoop(fn: Function, delay: number = 1000) {
  let f = true;
  let timer = null;
  let count = 0;
  const _this = this;
  const run = (...args: []): void => {
    if (f) {
      fn.apply(_this, args);
      f = false;
    }
    timer = setInterval(() => {
      fn.apply(_this, args);
      count++;
      console.log(count);
    }, delay);
  };
  const stop = (): void => {
    clearInterval(timer);
  };
  return [run, stop] as const;
}
export default useLoop;
