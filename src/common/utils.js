// 用于格式化时间
// 设置按需导出
export function formatDate(value, format) {
  //value: 需要格式化的数据
  //format: 指定格式 yyyy-MM-dd hh:mm:ss
 
  // date对象是以毫秒为单位，所以要乘1000，让秒转换为毫秒
  let date = new Date(value * 1000);
  // 获取年份
  let year = date.getFullYear();
 
  if (/(y+)/.test(format)) {
    // 获取匹配组的内容
    let content = RegExp.$1;
    format = format.replace(content, year.toString().slice(4 - content.length));
  }
 
 let o = {
   // y: date.getFullYear(),  // 用这一句也行，但只适用于四位数显示时候用
   M: date.getMonth() + 1,
   d: date.getDate(),
   h: date.getHours(),
   m: date.getMinutes(),
   s: date.getSeconds()
 };
 
 for (let key in o) {
   // 构造动态正则
   let reg = new RegExp(`(${key}+)`);
 
   if (reg.test(format)) {
     // 获取匹配组的内容
     let content = RegExp.$1;
     let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
     format = format.replace(content, k);
   }
 }
 return format;
}

// 防抖操作
export function debounce(func, delay=100) {
  let timer = null // 此处也是局部变量，但下面形成了闭包，此局部变量就不会被销毁
  return function(...args) { // 可让func函数传多个参数
    if(timer) clearTimeout(timer) // 如果上一个定时器未执行完直接取消执行，减少对服务器的请求
    timer = setTimeout(() => {
      func.apply(this,args) // 调用func函数，接收args作为参数
    }, delay)
  }
}
