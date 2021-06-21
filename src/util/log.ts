export const print = (message) => {
  if (Object.prototype.toString.call(message) === '[object Object]') {
    message = JSON.stringify(message);
  }
  console.log(
    '%c' + '日志' + '%c' + message,
    'color:#fff;background:#5cb87a;padding:2px 4px;border-radius:2px 0 0 2px',
    'color:white;background:#409eff;padding:2px 4px;border-radius:0 2px 2px 0'
  );
};

export function debug(err) {
  console.log(
    '%c错误' + '%c' + err,
    'color:#fff;background:#f56c6c;padding:2px 4px;border-radius:2px 0 0 2px',
    'color:#fff;background:#fadb14;padding:2px 4px;border-radius:0 2px 2px 0'
  );
}
