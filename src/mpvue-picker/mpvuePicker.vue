<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <!-- 单列 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange" v-if="mode==='selector' && pickerValueSingleArray.length > 0">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueSingleArray" :key="index">{{item}}</div>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 时间选择器 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange" v-if="mode==='timeSelector'">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueHour" :key="index">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMinute" :key="index">{{item}}</div>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 多列选择 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange" v-if="mode==='multiSelector'">
        <block v-for="(n,index) in pickerValueMulArray.length" :key="index">
          <picker-view-column>
            <div class="picker-item" v-for="(item,index1) in pickerValueMulArray[n]" :key="index1">{{item}}</div>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 二级联动 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChangeMul" v-if="mode==='multiLinkageSelector' && deepLength===2">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMulTwoOne" :key="index">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMulTwoTwo" :key="index">{{item}}</div>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 三级联动 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChangeMul" v-if="mode==='multiLinkageSelector' && deepLength===3">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMulThreeOne" :key="index">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMulThreeTwo" :key="index">{{item}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in pickerValueMulThreeThree" :key="index">{{item}}</div>
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
      pickerValueArrayChange: true,
      pickerValueSingleArray: [],
      pickerValueHour: [],
      pickerValueMinute: [],
      pickerValueMulArray: [],
      pickerValueMulTwoOne: [],
      pickerValueMulTwoTwo: [],
      pickerValueMulThreeOne: [],
      pickerValueMulThreeTwo: [],
      pickerValueMulThreeThree: []
    };
  },
  props: {
    /* mode */
    mode: {
      type: String,
      default: 'selector'
    },
    /* 是否显示控件 */
    showPicker: {
      type: Boolean,
      default: false
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
    /* 几级联动 */
    deepLength: {
      type: Number,
      default: 2
    }
  },
  watch: {
    pickerValueArray(oldVal, newVal) {
      this.pickerValueArrayChange = true;
    }
  },
  methods: {
    initPicker(valueArray) {
      let pickerValueArray = valueArray;
      this.pickerValue = this.pickerValueDefault;
      // 初始化多级联动
      if (this.mode === 'selector') {
        this.pickerValueSingleArray = valueArray;
      } else if (this.mode === 'timeSelector') {
        let hourArray = [];
        let minuteArray = [];
        for (let i = 0; i < 24; i++) {
          hourArray.push(i > 9 ? `${i} 时` : `0${i} 时`);
        }
        for (let i = 0; i < 60; i++) {
          minuteArray.push(i > 9 ? `${i} 分` : `0${i} 分`);
        }
        this.pickerValueHour = hourArray;
        this.pickerValueMinute = minuteArray;
      } else if (this.mode === 'multiSelector') {
        this.pickerValueMulArray = valueArray;
      } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 2) { // 两级联动
        let pickerValueMulTwoOne = [];
        let pickerValueMulTwoTwo = [];
        // 第一列
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
      } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 3) {
        let pickerValueMulThreeOne = [];
        let pickerValueMulThreeTwo = [];
        let pickerValueMulThreeThree = [];
        // 第一列
        for (let i = 0, length = pickerValueArray.length; i < length; i++) {
          pickerValueMulThreeOne.push(pickerValueArray[i].label);
        }
        // 渲染第二列
        this.pickerValueDefault = this.pickerValueDefault.length === 3 ? this.pickerValueDefault : [0, 0, 0];
        if (this.pickerValueDefault.length === 3) {
          let num = this.pickerValueDefault[0];
          for (let i = 0, length = pickerValueArray[num].children.length; i < length; i++) {
            pickerValueMulThreeTwo.push(pickerValueArray[num].children[i].label);
          }
          // 第三列
          let numSecond = this.pickerValueDefault[1];
          for (let i = 0, length = pickerValueArray[num].children[numSecond].children.length; i < length; i++) {
            pickerValueMulThreeThree.push(pickerValueArray[num].children[numSecond].children[i].label);
          }
        }
        this.pickerValueMulThreeOne = pickerValueMulThreeOne;
        this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
      }
    },
    show() {
      setTimeout(() => {
        if (this.pickerValueArrayChange) {
          this.initPicker(this.pickerValueArray);
          this.showPicker = true;
          this.pickerValueArrayChange = false;
        } else {
          this.showPicker = true;
        }
      }, 0);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
    },
    pickerConfirm(e) {
      this.showPicker = false;
      if (this.pickerValue.length === 0) {
        if (this.mode === 'selector') {
          this.pickerValue = [0];
        } else if (this.mode === 'multiSelector') {
          this.pickerValue = new Int8Array(this.pickerValueArray.length);
        } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 2) {
          this.pickerValue = [0, 0];
        } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 3) {
          this.pickerValue = [0, 0, 0];
        }
      }
      this.$emit('onConfirm', this.pickerValue);
    },
    showPickerView() {
      this.showPicker = true;
    },
    pickerChange(e) {
      this.pickerValue = e.mp.detail.value;
      this.$emit('onChange', e.mp.detail.value);
    },
    pickerChangeMul(e) {
      if (this.deepLength === 2) {
        let pickerValueArray = this.pickerValueArray;
        let changeValue = e.mp.detail.value;
        let pickerValueMulTwoTwo = [];
        // 第一列滚动第二列数据更新
        for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
          pickerValueMulTwoTwo.push(pickerValueArray[changeValue[0]].children[i].label);
        }
        this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
        this.pickerValue = changeValue;
      } else if (this.deepLength === 3) {
        let pickerValueArray = this.pickerValueArray;
        let changeValue = e.mp.detail.value;
        let pickerValueMulThreeTwo = [];
        let pickerValueMulThreeThree = [];
        // 重新渲染第二列
        // 如果是第一列滚动
        if (changeValue[0] !== this.pickerValue[0]) {
          this.pickerValueMulThreeTwo = [];
          for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
            pickerValueMulThreeTwo.push(pickerValueArray[changeValue[0]].children[i].label);
          }
          // 重新渲染第三列
          for (let i = 0, length = pickerValueArray[changeValue[0]].children[changeValue[1]].children.length; i < length; i++) {
            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[changeValue[1]].children[i].label);
          }
        } else { // 第二列滚动
          // 重新渲染第三列
          this.pickerValueMulThreeThree = [];
          pickerValueMulThreeTwo = this.pickerValueMulThreeTwo;
          for (let i = 0, length = pickerValueArray[changeValue[0]].children[changeValue[1]].children.length; i < length; i++) {
            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[changeValue[1]].children[i].label);
          }
        }
        this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        this.pickerValue = changeValue;
      }
      this.$emit('onChange', this.pickerValue);
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
