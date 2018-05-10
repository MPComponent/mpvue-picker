<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd">
        <div href="javascript:;" class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div href="javascript:;" class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValueDefault" @change="pickerChange">
        <block v-for="(n,index1) in columuNum" :key="index1" v-if="!isMul">
          <picker-view-column>
            <div class="picker-item" v-for="(item,index2) in pickerValueArray[n]" :key="index2">{{item}}</div>
          </picker-view-column>
        </block>
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index3) in pickerValueMulTwoOne" :key="index3">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index4) in pickerValueMulTwoTwo" :key="index4">{{item}}</div>
          </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerChangeValue: [],
      pickerValue: [],
      pickerValueMulTwoOne: [],
      pickerValueMulTwoTwo: []
    };
  },
  mounted() {
    console.log(this.pickerValueDefault);
    this.initPicker(this.pickerValueArray, true);
  },
  props: {
    /* 是否显示控件 */
    showPicker: {
      type: Boolean,
      default: false
    },
    /* picker 列数 */
    columuNum: {
      type: Number,
      default: 1
    },
    /* picker 数值 */
    pickerValueArray: {
      type: Array,
      default: []
    },
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default: []
    },
    /* 是否为级联 */
    isMul: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 接收两个参数，1.picker 的值；2.是否联动
    initPicker(valueArray, mulLinkage) {
      console.log(this);
      let pickerValueArray = valueArray;
      // 初始化多级联动
      // const mulNum = 2; // 假定为 2 级联动
      let pickerValueMulTwoOne = [];
      let pickerValueMulTwoTwo = [];
      for (let i = 0, length = pickerValueArray.length; i < length; i++) {
        pickerValueMulTwoOne.push(pickerValueArray[i].label);
      }
      // 渲染第二列
      // 如果有设定的默认值
      if (this.pickerValueDefault.length === 2) {
        let num = this.pickerValueDefault[0];
        for (let i = 0, length = pickerValueArray[num].children.length; i < length; i++) {
          pickerValueMulTwoTwo.push(pickerValueArray[num].children[i].label);
        }
      } else {
        for (let i = 0, length = pickerValueArray[0].children.length; i < length; i++) {
          pickerValueMulTwoTwo.push(pickerValueArray[0].children[i].label);
        }
      }

      this.pickerValueMulTwoOne = pickerValueMulTwoOne;
      this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this.$emit('pickerCancel');
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this.pickerValue = this.pickerValueDefault;
      console.log(this.pickerValue);
      this.$emit('pickerConfirm', this.pickerValue);
    },
    showPickerView() {
      this.showPicker = true;
    },
    pickerChange(e) {
      if (this.isMul) {
      } else {
        console.log(e.mp.detail.value);
        this.pickerValueDefault = e.mp.detail.value;
        this.$emit('onChange', e.mp.detail.value);
      }
    }
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
  cursor: pointer;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
