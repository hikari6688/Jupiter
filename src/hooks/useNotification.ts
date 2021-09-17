const useNotification = () => {
  const options = {
    dir: 'auto', // 文字方向
    body: '通知：OBKoro1评论了你的朋友圈', // 通知主体
    requireInteraction: true, // 不自动关闭通知
    // 通知图标
    icon: 'https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  };
  notifyMe('这是通知的标题', options);
  function notifyMe(title, options) {
    // 先检查浏览器是否支持
    if (!window.Notification) {
      console.log('浏览器不支持通知');
    } else {
      // 检查用户曾经是否同意接受通知
      if (Notification.permission === 'granted') {
        var notification = new Notification(title, options); // 显示通知
      } else if (Notification.permission === 'default') {
        // 用户还未选择，可以询问用户是否同意发送通知
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('用户同意授权');
            var notification = new Notification(title, options); // 显示通知
          } else if (permission === 'default') {
            console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
          } else {
            // denied
            console.log('用户拒绝授权 不能显示通知');
          }
        });
      } else {
        // denied 用户拒绝
        console.log('用户曾经拒绝显示通知');
      }
    }
  }
};
export default useNotification;
