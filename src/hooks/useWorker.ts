export default function useWorker() {
  let worker: any;
  const creatWorker = function () {
    const workercode = function () {
      this.onmessage = async function (event: any) {
        const { fnStr, arg } = event.data;
        const fn = new Function(`return ${fnStr}`);
        const r = await fn().apply(this, arg);
        this.postMessage(r)
      };
    };
    let code = workercode.toString();
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
    const blob = new Blob([code], { type: 'application/javascript' });
    worker = URL.createObjectURL(blob);
    return new Worker(worker);
  };
  const killWorker = function () {
    worker&&URL.revokeObjectURL(worker);
  };
  return {
    creatWorker,
    killWorker,
  };
}
