// 基准大小，设计稿基准字体，设计稿推荐：750 * 1136 (iphone6)
const baseSize = 32;
// 设置计算 rem 函数
const setRem = function () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据设计稿修改
  const scale = document.documentElement.clientWidth / 750 ;
  // 设置页面根节点字体
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
};
// 初始化
setRem();
// 窗口大小改变时，重置 rem
window.onresize = function () { setRem() };
