## 移动端布局兼容(例：vue)

> 技术栈：

- vue-cli：脚手架工具；
- postcss-pxtorem：转换px为rem的插件；[Git链接](https://github.com/cuth/postcss-pxtorem)

> 设置根节点html的font-size：

1. 创建rem.js文件：计算根节点字体大小；

   ```javascript
   // 基准大小，设计稿基准字体，设计稿推荐：750 * 1136 (iphone6)
   const baseSize = 32;
   // 设置计算 rem 函数
   const setRem = function () {
     // 当前页面宽度相对于 750 宽的缩放比例，可根据设计稿修改
     const scale = document.documentElement.clientWidth / 750 ;
     // 设置页面根节点字体
     document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
   }
   // 初始化
   setRem();
   // 窗口大小改变时，重置 rem
   window.onresize = function () { setRem() };
   ```

2. 配置 `postcss-pxtorem`：自动转换px为rem：

   1. 安装 :

      ```javascript
      $ npm install postcss-pxtorem -D  // npm
      $ yarn add postcss-pxtorem --dev  // yarn
      ```

   2. 配置：

      ```javascript
      // vue-cli2: 根目录.postcssrc.js
      module.exports = {
        "plugins": {
          "postcss-pxtorem":{
            rootValue: 32,
            unitPrecision: 5, // 最小精度，小数点位数
            propList: ['*','!font*'], //设置哪些属性转换 !不匹配属性（这里是字体相关属性不转换）
            selectorBlackList: [],
            minPixelValue:2 // 替换的最小像素值
          }
        }
      }
      // vue-cli3: 根目录 package.json
      "postcss": {
        "plugins": {
          "autoprefixer": {},
          "postcss-pxtorem": {
            "rootValue": 75,
            "unitPrecision": 5, 
            "propList": ["*","!font*"], 
            "selectorBlackList": [],
            "minPixelValue":2 
          }
        }
      }
      ```

   3. 配置后，即可直接在项目中使用px，打包时自动转变为rem；
