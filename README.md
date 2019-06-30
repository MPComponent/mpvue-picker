# mpvue-picker

> 基于 mpvue 框架的小程序选择控件

> 支持单列、多列以及级联

> 目前版本为 2.0，1.0 使用请[点击](./README_1.x.x.md)

> citypicker 已支持，详情点击 [mpvue-citypicker](https://github.com/MPComponent/mpvue-citypicker)


![npm version](https://img.shields.io/npm/v/mpvue-picker.svg?style=flat)
![download](https://img.shields.io/npm/dm/mpvue-picker.svg?style=flat)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![license](https://img.shields.io/github/license/KuangPF/mpvue-picker.svg)

## 前言
在 [mpvue](https://github.com/Meituan-Dianping/mpvue)开源之初写了 [用 vue 写小程序，基于 mpvue 框架重写 weui](https://github.com/KuangPF/mpvue-weui)。当时用的是小程序的原生组件，没有对其进行封装和组件化。而对于现在的前端开发环境，`组件化`，`模块化`，`工程化`以及`自动化`已经是一种标配。而`mpvue`框架又提供了一个很好的组件化开发平台，因此就对小程序中的 `picker` 组件进行封装，使其在用`mpvue`开发的时候能够用快速的实现 `picker`的功能。

:warning:[`uni-app` 插件市场的 `mpvue-picker`](https://ext.dcloud.net.cn/search?q=mpvue-picker) 不是本人在维护，如果要在 `uni-app` 中使用的话推荐通过 `npm` 包的方式引入。

## 为什么封装 `picker` 组件

* 其实小程序提供了原生的 `picker` 组件，但是在开发的时候会发现在 android 手机上看到的 `picker`效果与`微信开发者工具`预览的效果不一样，其实就是丑了一点点...

* 在小程序中使用 `picker` 的地方很多，很常见。

## 使用

* 安装
``` bash
npm install mpvue-picker --save
```

* 在页面中使用
``` javascript
<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
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
      mode: 'selector',
      pickerValueArray: [
        {
          label: '住宿费',
          value: 1
        },
        {
          label: '活动费',
          value: 2
        },
        {
          label: '通讯费',
          value: 3
        },
        {
          label: '补助',
          value: 4
        }
      ],
      pickerValueDefault: [1]
    };
  },
  methods: {
    showPicker() {
      this.$refs.mpvuePicker.show();
    },
    onConfirm(e) {
      console.log(e);
    },
    onChange(e) {
      console.log(e);
    },
    onCancel(e) {
      console.log(e);
    }
  }
};
</script>

<style>

</style>

```
* [更多 demo](https://github.com/KuangPF/mpvue-picker/blob/master/src/pages/demo/index.vue)
* 初始化

在父组件中调用 ` mpvuePicker` 实例中的 `show` 方法即可

``` javascript
this.$refs.mpvuePicker.show();
```

## 效果

![mpvue-picker-demo01](https://github.com/KuangPF/mpvue-picker/blob/master/src/pages/img/picker01.gif)
![mpvue-picker-demo02](https://github.com/KuangPF/mpvue-picker/blob/master/src/pages/img/picker02.gif)
![mpvue-picker-demo03](https://github.com/KuangPF/mpvue-picker/blob/master/src/pages/img/picker03.gif)
![mpvue-picker-demo04](https://github.com/KuangPF/mpvue-picker/blob/master/src/pages/img/picker04.gif)

## 参数说明

### mode
* 说明：picker 组件类型 
* 类型：String
* 可选值：
    * selector（单列） 
    * timeSelector（时间选择）
    * dateSelector (日期选择)
    * multiSelector（多列） 
    * multiLinkageSelector（级联）
* 是否必填： 否
* 默认值：selector

### pickerValueArray
* 说明：picker 渲染数据
* 类型：Array
* 可选值：-
* 是否必填： 是（当 mode 值为 timeSelector 不用填）
* 默认值：-

### pickerValueDefault
* 说明：picker 默认选中值 
* 类型：Array || Date （类型为 Date 仅限 mode 为 dateSelector 的情形）
* 可选值：-
* 是否必填： 否 (当同一个组件使用多种 mode 来回切换使用时 pickerValueDefault 必填)
* 默认值：[]
* 相关说明：如果 mode 为 dateSelector，默认值为当前日期，初始值支持 Date 对象或者数组，以 2019-4-5 为例，`new Date('2019-04-05')` 和 `[2019, 4, 5]` 均可以
 
### deepLength
* 说明：几级联动
* 类型：Number
* 可选值：
  * 2
  * 3 
* 是否必填： 否
* 默认值：2

### themeColor
* 说明：主题颜色
* 类型：Color
* 是否必填： 否
* 默认值：#1aad19

### onChange
* 说明：picker 组件滚动时回调，返回选中的 label, value 和数组索引 index 的值
* 类型：EventHandle
* 可选值：-
* 是否必填： 否
* 默认值：-

### onConfirm
* 说明：picker 组件点击确定时回调，返回选中的 label, value 和数组索引 index 的值
* 类型：EventHandle
* 可选值：-
* 是否必填： 否
* 默认值：-

### onCancel
* 说明：picker 组件点击取消时回调，返回选中的 label, value 和数组索引 index 的值
* 类型：EventHandle
* 可选值：-
* 是否必填： 否
* 默认值：-

## 相关数据结构说明

#### **单列**
<details>
<summary>点击展开单列数据结构</summary>

``` javascript
pickerValueArray: [
  {
    label: '住宿费',
    value: 1
  },
  {
    label: '活动费',
    value: 2
  },
  {
    label: '通讯费',
    value: 3
  },
  {
    label: '补助',
    value: 4
  }
],
```
</details>


#### **多列**
<details>
<summary>点击展开多列数据结构</summary>

``` javascript
pickerMulArray: [
  [
    { label: '中国', value: 1 },
    { label: '美国', value: 2 },
    { label: '日本', value: 3 },
    { label: '俄罗斯', value: 4 }
  ],
  [
    { label: '茶', value: 1 },
    { label: '咖啡', value: 2 },
    { label: '寿司', value: 3 },
    { label: '奶酪', value: 4 }
  ],
  [
    { label: '歼20', value: 1 },
    { label: 'F22', value: 2 },
    { label: '秋月级', value: 3 },
    { label: 'T50', value: 4 }
  ]
]
```
</details>

#### **二级联动**
<details>
<summary>点击展开二级联动数据结构</summary>

``` javascript
pickerValueArray:
[
  {
    label: '飞机票',
    value: 0,
    children: [{
      label: '经济舱',
      value: 1
    },
    {
      label: '商务舱',
      value: 2
    }
    ]
  },
  {
    label: '火车票',
    value: 1,
    children: [{
      label: '卧铺',
      value: 1
    },
    {
      label: '坐票',
      value: 2
    },
    {
      label: '站票',
      value: 3
    }
    ]
  },
  {
    label: '汽车票',
    value: 3,
    children: [{
      label: '快班',
      value: 1
    },
    {
      label: '普通',
      value: 2
    }
    ]
  }
]
```
</details>


#### **三级联动**
<details>
<summary>点击展开三级联动数据结构</summary>

``` javascript
pickerValueArray:
[
  {
    label: 'phone',
    value: 0,
    children: [
      {
        label: 'iphone',
        value: 1,
        children: [{
          label: 'iphoneX',
          value: 1
        },
        {
          label: 'iphone8',
          value: 2
        }, {
          label: 'iphone8 Plus',
          value: 3
        }]
      },
      {
        label: 'android',
        value: 1,
        children: [
          {
            label: 'vivo',
            value: 1
          },
          {
            label: '魅族',
            value: 2
          }, {
            label: '小米',
            value: 3
          }
        ]
      }
    ]
  },
  {
    label: 'PC',
    value: 0,
    children: [
      {
        label: 'mac',
        value: 1,
        children: [
          {
            label: 'macbook Pro',
            value: 1
          },
          {
            label: 'iMac',
            value: 2
          }, {
            label: 'mackbook',
            value: 3
          }, {
            label: 'mackbook air',
            value: 3
          }
        ]
      },
      {
        label: 'windows',
        value: 1,
        children: [
          {
            label: 'dell',
            value: 1
          },
          {
            label: 'surface',
            value: 2
          }, {
            label: 'thinkpad',
            value: 3
          }
        ]
      }
    ]
  }
]
```
</details>


## 相关说明

对于多级联动，由于没有动态添加 picker 列数以及动态渲染其值，因此目前只支持 二级联动和三级联动。


## 版本日志

[version logs](https://github.com/KuangPF/mpvue-picker/releases)
