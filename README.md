# mpvue-picker

> 基于 mpvue 框架的小程序选择控件

![GitHub package version](https://img.shields.io/github/package-json/v/KuangPF/mpvue-picker.svg)

## 前言
在 [mpvue](https://github.com/Meituan-Dianping/mpvue)开源之初写了 [用 vue 写小程序，基于 mpvue 框架重写 weui。](https://github.com/KuangPF/mpvue-weui)。当时用的是小程序的原生组件，没有对其进行封装和组件化。而对于现在的前端开发环境，`组件化`，`模块化`，`工程化`以及`自动化`已经是一种标配。而`mpvue`框架又提供了一个很好的组件化开发平台，因此就对小程序中的 `picker` 组件进行封装，使其在用`mpvue`开发的时候能够用快速的实现 `picker`的功能。

## 为什么封装 `picker` 组件

* 其实小程序提供了原生的 `picker` 组件，但是在开发的时候会发现在 android 手机上看到的 `picker`效果与`微信开发者工具`预览的效果不一样，其实就是丑了一点点...

* 在小程序中使用 `picker` 的地方很多，很常见。

## 使用

* 安装
``` bash
npm install mpvue-picker --save 或者 cnpm install mpvue-picker --save
```
* 在页面中使用
``` javascript
<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" :pickerValueArray="pickerValueArray" :pickerValueDefault='pickerValueDefault' @pickerConfirm="pickerConfirm"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
export default {
  components: {
    mpvuePicker
  },
  data() {
    return {
      pickerValueArray: ['住宿费', '礼品费', '活动费', '通讯费', '补助'],
      pickerValueDefault: [1]
    };
  },
  methods: {
    showPicker() {
      this.$refs.mpvuePicker.show();
    },
    pickerConfirm(e) {
      console.log(e);
    }
  }
};
</script>

<style>

</style>

```
* 初始化

在父组件中调用 ` mpvuePicker` 实例中的 `show` 方法即可

## 参数

| 参数        | 说明                      | 类型      | 可选值  | 是否必须    | 默认值    |
| ---------  | ----------------------- | ------- | ---- | ---- |  ------ |
| mode    | picker 组件类型     | String | selector（单列） multiSelector（多列） multiLinkageSelector（级联）    | 否 |selector   |
| pickerValueArray    | picker 数据     | Array | -    | 是 | []   |
| pickerValueDefault    | picker 默认选中值     | Array | -    | 否 | []   |
| deepLength    | 几级联动     | Number | 2 , 3    | 当mode = multiLinkageSelector 时必须  | 2   |
| onChange    | picer 组件滚动时回调，返回选中的数组索引     | EventHandle | -   | 否 | -  |
| onConfirm    | picer 组件点击确定时回调，返回选中的数组索引     | EventHandle | -   | 否 | -  |