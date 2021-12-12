# vue测试

## 遇到的问题

### 1. [已解决]无法识别import语句(20211212)

#### 问题描述

初始化一个空项目,使用`@vue/cli-plugin-unit-jest`进行测试

1. vue add unit-jest
2. 修改jest.config.js中的preset为@vue/cli-plugin-unit-jest/presets/typescript-and-babel
3. yarn run test:unit就会报下面这个错误

```bash
 FAIL  utils/__tests__/index.test.js
  ● Test suite failed to run

    /Users/ranwawa/Documents/personal/bug-report/utils/__tests__/index.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import { testA, testB } from '../index';
                                                                                             ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at ScriptTransformer._transformAndBuildScript (../../../../../usr/local/lib/node_modules/@vue/cli-plugin-unit-jest/node_modules/_@jest_transform@24.9.0@@jest/transform/build/ScriptTransformer.js:539:17)

/Users/ranwawa/Documents/personal/bug-report/node_modules/babel-jest/build/index.js
```

#### 原因分析

将jest.config.js中的typescript-and-babel替换成no-babel可以正常运行命令

对比了一下这两个预设文件,no-babel中多出了以下配置

```javascript
    globals: {
      'vue-jest': {
        babelConfig: {
          plugins: ['babel-plugin-transform-es2015-modules-commonjs']
        }
      }
    }
```

js文件是通过babel-js处理的,而babel默认只能识别commonjs语法
因为使用了typescript-and-babel
所以要支持ESM语法,那就需要我们自己去设置babel配置了

#### 问题解决

1. 安装@babel/preset-env
2. babel.config.js
3. 要注意preset-env的modules设置成false,则不会处理ESM语法

```javascript
module.exports = {
 presets: [
  [
   '@babel/preset-env'
  ]
 ]
}
```

### 2. [已解决]无法在markdown文件中使用markdown all in one加粗的快捷键(20211212)

#### 问题描述

安装了markdown all in one
然后想要使用`cmd + b`的快捷键
但是无效

使用`cmd + i`却有效

#### 原因分析

VScode默认提供了一个`cmd + b`的快捷键,用户跳转到变量定义的地方

这两个快捷键冲突导致的

#### 问题解决

1. `cmd + K`, `cmd + S`打开快捷键设置面板
2. 搜索`cmd + B`快捷键
3. 右键系统的快捷键, Change when expression
4. 将其触发条件修改成editorLangId != 'markdown`即可

### 3. [已解决]readme.md无法显示markdown图标,必须要改成readme.markdown才会生效(20211212)

#### 问题描述

默认显示成了一个信息图标,如下

![bad](markdown-imgs/2021-12-12-14-11-21.png)

但我期望的是这种图标

![good](markdown-imgs/2021-12-12-14-13-31.png)

#### 原因分析

图标是由Material Icon Theme插件提供
可能是.md没有关联到markdown这种格式上
根据文档设置图标关联无法生效

"material-icon-theme.languages.associations": {
  "*.md": "markdown"
}

要设置成2个*号来覆盖之前的设置
"material-icon-theme.languages.associations": {
  "**.md": "markdown"
}

#### 问题解决

不用修改
因为信息图标就是readme的默认图标

### 4. 在另外一个项目中出现,但是无法复现的问题(20211212)

#### 问题描述

render一个*-o.vue组件
组件中引入同级的一个utils.js函数
该函数引用其他js
其他js(econfig.js)最后又引入这个utils.js中的一个函数
导致了循环引用
最终编译的时候报错

#### 描述内容

```javascript
 FAIL  src/components/driver-index/__tests__/cancel-order-judge-o.teset.js
  ● Test suite failed to run

    TypeError: (0 , _utils.getAllUrlParams) is not a function

      20 |     const {
      21 |         business_type = 'uapp'
    > 22 |     } = getAllUrlParams() || {}
         |         ^
      23 |     const businessMap = {
      24 |         'uapp': 1,  // 用户端
      25 |         1: 1,  // 用户端-旧版APP历史问题

      at businessMap (src/econfig.js:22:9)
      at getSaCountUrl (src/econfig.js:33:63)
      at Object.<anonymous> (src/config.js:25:20)
      at Object.<anonymous> (src/utils/index.js:4:1)
      at Object.<anonymous> (src/utils/webview.js:4:1)
      at Object.<anonymous> (src/assets/lib/utils.js:2:1)
      at Object.<anonymous> (src/components/driver-index/utils.js:1:1)
      at src/components/driver-index/cancel-order-judge-o.vue:119:1
      at Object.<anonymous> (src/components/driver-index/cancel-order-judge-o.vue:894:3)
      at Object.<anonymous> (src/components/driver-index/__tests__/cancel-order-judge-o.teset.js:1:1)
```

#### 参考

- https://ayase.moe/2016/10/02/es6-circular-import/