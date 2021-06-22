export const print = (message) => {
  if (Object.prototype.toString.call(message) === '[object Object]') {
    message = JSON.stringify(message);
  }
  console.log(
    '%c' + '日志' + '%c' + message,
    'color:#fff;background:#5cb87a;padding-right:4px;padding-left:4px;padding-top:2px;padding-bottom:2px;border-radius:4px 0 0 4px;font-size:12px;',
    'color:white;background:#409eff;padding-right:6px;padding-left:6px;padding-top:2px;padding-bottom:2px;border-radius:0 4px 4px 0'
  );
};

export function debug(err) {
  console.log(
    '%c错误' + '%c' + err,
    'color:#fff;background:#f56c6c;padding-right:4px;padding-left:4px;padding-top:2px;padding-bottom:2px;border-radius:2px 0 0 2px',
    'color:#fff;background:#fadb14;padding-right:6px;padding-left:6px;padding-top:2px;padding-bottom:2px;border-radius:0 2px 2px 0'
  );
}
