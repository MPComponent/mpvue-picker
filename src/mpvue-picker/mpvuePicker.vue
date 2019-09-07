<template>
  <view class="mpvue-picker">
    <view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
    <view class="mpvue-picker-content" :class="{'mpvue-picker-view-show':showPicker}">
      <view class="mpvue-picker__hd" catchtouchmove="true">
        <view class="mpvue-picker__action" @click="pickerCancel">取消</view>
        <view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</view>
      </view>
      <!-- 单列 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode==='selector' && pickerValueSingleArray.length > 0"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueSingleArray"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 日期选择器 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerDateChange"
        v-if="mode==='dateSelector'"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueYear"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMonth"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueDay"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 时间选择器 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode==='timeSelector'"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueHour"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMinute"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 多列选择 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode==='multiSelector'"
      >
        <block v-for="(n,index) in pickerValueMulArray.length" :key="index">
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index1) in pickerValueMulArray[index]"
              :key="index1"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 二级联动 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChangeMul"
        v-if="mode==='multiLinkageSelector' && deepLength===2"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMulTwoOne"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMulTwoTwo"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 三级联动 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChangeMul"
        v-if="mode==='multiLinkageSelector' && deepLength===3"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMulThreeOne"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMulThreeTwo"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item,index) in pickerValueMulThreeThree"
              :key="index"
            >{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
    </view>
  </view>
</template>

<script>
import { transformDateToIndex, getDatePickerIndex, getDays, fixPickerValueDefault } from '../utils/index.js';
/* 由于 getMonth 返回 0-11（1月-12月），因此在设置的时候 month-1 */
const MIN_DATE = new Date(1900, 0, 1); // 最小支持日期 1990-01-01
const MAX_DATE = new Date(2099, 11, 31); // 最大支持日期 2099-12-31
/* eslint-disable-next-line */
const NOW_DATE = new Date(); // 当前日期
export default {
  data() {
    return {
      pickerChangeValue: [],
      pickerValue: [],
      pickerValueArrayChange: true,
      modeChange: false,
      pickerValueSingleArray: [],
      pickerValueYear: [],
      pickerValueMonth: [],
      pickerValueDay: [],
      pickerValueHour: [],
      pickerValueMinute: [],
      pickerValueMulArray: [],
      pickerValueMulTwoOne: [],
      pickerValueMulTwoTwo: [],
      pickerValueMulThreeOne: [],
      pickerValueMulThreeTwo: [],
      pickerValueMulThreeThree: [],
      /* 是否显示控件 */
      showPicker: false
    };
  },
  props: {
    /* mode */
    mode: {
      type: String,
      default: 'selector'
    },
    /* picker 数值 */
    pickerValueArray: {
      type: Array,
      default() {
        return [];
      }
    },
    /* 默认值 */
    pickerValueDefault: {
      type: [Array, Date],
      default() {
        return [];
      }
    },
    /* 几级联动 */
    deepLength: {
      type: Number,
      default: 2
    },
    /* 主题色 */
    themeColor: String
  },
  watch: {
    pickerValueArray(oldVal, newVal) {
      this.pickerValueArrayChange = true;
    },
    mode(oldVal, newVal) {
      this.modeChange = true;
    }
  },
  methods: {
    initPicker(valueArray) {
      try {
        let pickerValueArray = valueArray;
        let initPickerValue = this._initPickerValue();
        setTimeout(() => {
          this.pickerValue = initPickerValue;
        });
        // 初始化选择器
        if (this.mode === 'selector') { // 单列选择器
          this.pickerValueSingleArray = valueArray;
        } else if (this.mode === 'dateSelector') { // 日期选择器
          let yearList = [];
          let monthList = [];
          let dayList = [];
          for (let i = MIN_DATE.getFullYear(); i <= MAX_DATE.getFullYear(); i++) {
            yearList.push({ label: i + '年', value: i });
          }
          for (let i = 0; i < 12; i++) {
            monthList.push({ label: i + 1 + '月', value: i + 1 });
          }
          let dayLength = getDays(MIN_DATE.getFullYear() + initPickerValue[0], initPickerValue[1] + 1);
          for (let i = 0; i < dayLength; i++) {
            dayList.push({ label: i + 1 + '日', value: i + 1 });
          }
          this.pickerValueYear = yearList;
          this.pickerValueMonth = monthList;
          this.pickerValueDay = dayList;
        } else if (this.mode === 'timeSelector') { // 时间选择器
          this.modeChange = false;
          let hourArray = [];
          let minuteArray = [];
          for (let i = 0; i < 24; i++) {
            hourArray.push({
              value: i,
              label: i > 9 ? `${i} 时` : `0${i} 时`
            });
          }
          for (let i = 0; i < 60; i++) {
            minuteArray.push({
              value: i,
              label: i > 9 ? `${i} 分` : `0${i} 分`
            });
          }
          this.pickerValueHour = hourArray;
          this.pickerValueMinute = minuteArray;
        } else if (this.mode === 'multiSelector') { // 多级联动
          this.pickerValueMulArray = valueArray;
        } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 2) { // 二级联动
          // 两级联动
          let pickerValueMulTwoOne = [];
          let pickerValueMulTwoTwo = [];
          // 第一列
          for (let i = 0, length = pickerValueArray.length; i < length; i++) {
            pickerValueMulTwoOne.push(pickerValueArray[i]);
          }
          // 渲染第二列
          let num = initPickerValue[0];
          for (let i = 0, length = pickerValueArray[num].children.length; i < length; i++) {
            pickerValueMulTwoTwo.push(pickerValueArray[num].children[i]);
          }
          this.pickerValueMulTwoOne = pickerValueMulTwoOne;
          this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
        } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 3) { // 三级联动
          let pickerValueMulThreeOne = [];
          let pickerValueMulThreeTwo = [];
          let pickerValueMulThreeThree = [];
          // 第一列
          for (let i = 0, length = pickerValueArray.length; i < length; i++) {
            pickerValueMulThreeOne.push(pickerValueArray[i]);
          }
          // 渲染第二列
          let num = initPickerValue[0];
          for (let i = 0, length = pickerValueArray[num].children.length; i < length; i++) {
            pickerValueMulThreeTwo.push(pickerValueArray[num].children[i]);
          }
          // 第三列
          let numSecond = initPickerValue[1];
          for (let i = 0, length = pickerValueArray[num].children[numSecond].children.length; i < length; i++) {
            pickerValueMulThreeThree.push(
              pickerValueArray[num].children[numSecond].children[i]
            );
          }
          this.pickerValueMulThreeOne = pickerValueMulThreeOne;
          this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
          this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        }
      } catch (error) {
        console.error(error);
      }
    },
    show() {
      setTimeout(() => {
        if (this.pickerValueArrayChange || this.modeChange) {
          this.initPicker(this.pickerValueArray);
          setTimeout(() => {
            this.showPicker = true;
            this.pickerValueArrayChange = false;
            this.modeChange = false;
          });
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
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
      };
      this.$emit('onCancel', pickObj);
    },
    pickerConfirm(e) {
      this.showPicker = false;
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
      };
      this.$emit('onConfirm', pickObj);
    },
    showPickerView() {
      this.showPicker = true;
    },
    pickerChange(e) {
      this.pickerValue = e.mp.detail.value;
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
      };
      this.$emit('onChange', pickObj);
    },
    pickerDateChange(e) {
      let value = e.mp.detail.value;
      if (this.pickerValue[0] !== value[0]) {
        if (value[1] === 1) { // only for February
          this.getDaysList(this.pickerValueYear[value[0]].value, this.pickerValueMonth[value[1]].value, value);
        } else {
          this.pickerValue = value;
        }
      } else if (this.pickerValue[1] !== value[1]) {
        this.getDaysList(this.pickerValueYear[value[0]].value, this.pickerValueMonth[value[1]].value, value);
      } else {
        this.pickerValue = value;
      }
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
      };
      this.$emit('onChange', pickObj);
    },
    pickerChangeMul(e) {
      if (this.deepLength === 2) {
        let pickerValueArray = this.pickerValueArray;
        let changeValue = e.mp.detail.value;
        // 处理第一列滚动
        if (changeValue[0] !== this.pickerValue[0]) {
          let pickerValueMulTwoTwo = [];
          // 第一列滚动第二列数据更新
          for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
            pickerValueMulTwoTwo.push(pickerValueArray[changeValue[0]].children[i]);
          }
          this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
          // 第二列初始化为 0
          changeValue[1] = 0;
        }
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
            pickerValueMulThreeTwo.push(pickerValueArray[changeValue[0]].children[i]);
          }
          // 重新渲染第三列
          for (let i = 0, length = pickerValueArray[changeValue[0]].children[0].children.length; i <
            length; i++) {
            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[0].children[i]);
          }
          changeValue[1] = 0;
          changeValue[2] = 0;
          this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
          this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        } else if (changeValue[1] !== this.pickerValue[1]) {
          // 第二列滚动
          // 重新渲染第三列
          this.pickerValueMulThreeThree = [];
          pickerValueMulThreeTwo = this.pickerValueMulThreeTwo;
          for (let i = 0, length = pickerValueArray[changeValue[0]].children[changeValue[1]].children.length; i < length; i++) {
            pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[changeValue[1]].children[i]);
          }
          changeValue[2] = 0;
          this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        }
        this.pickerValue = changeValue;
      }
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
      };
      this.$emit('onChange', pickObj);
    },

    // 获取 pickerLabel
    _getPickerLabelAndValue(value, mode) {
      let pickerLable;
      let pickerGetValue = [];
      // selector
      if (mode === 'selector') {
        pickerLable = this.pickerValueSingleArray[value].label;
        pickerGetValue.push(this.pickerValueSingleArray[value].value);
      } else if (mode === 'dateSelector') {
        pickerLable =
          `${this.pickerValueYear[value[0]].label}-${this.pickerValueMonth[value[1]].label}-${this.pickerValueDay[value[2]].label}`;
        pickerGetValue.push(this.pickerValueYear[value[0]].value);
        pickerGetValue.push(this.pickerValueMonth[value[1]].value);
        pickerGetValue.push(this.pickerValueDay[value[2]].value);
      } else if (mode === 'timeSelector') {
        pickerLable = `${this.pickerValueHour[value[0]].label}-${this.pickerValueMinute[value[1]].label}`;
        pickerGetValue.push(this.pickerValueHour[value[0]].value);
        pickerGetValue.push(this.pickerValueMinute[value[1]].value);
      } else if (mode === 'multiSelector') {
        for (let i = 0; i < value.length; i++) {
          if (i > 0) {
            pickerLable += this.pickerValueMulArray[i][value[i]].label + (i === value.length - 1 ? '' : '-');
          } else {
            pickerLable = this.pickerValueMulArray[i][value[i]].label + '-';
          }
          pickerGetValue.push(this.pickerValueMulArray[i][value[i]].value);
        }
      } else if (mode === 'multiLinkageSelector') {
        /* eslint-disable indent */
        pickerLable =
          this.deepLength === 2
            ? `${this.pickerValueMulTwoOne[value[0]].label}-${this.pickerValueMulTwoTwo[value[1]].label}`
            : `${this.pickerValueMulThreeOne[value[0]].label}-${this.pickerValueMulThreeTwo[value[1]].label}-${this.pickerValueMulThreeThree[value[2]].label}`;
        if (this.deepLength === 2) {
          pickerGetValue.push(this.pickerValueMulTwoOne[value[0]].value);
          pickerGetValue.push(this.pickerValueMulTwoTwo[value[1]].value);
        } else {
          pickerGetValue.push(this.pickerValueMulThreeOne[value[0]].value);
          pickerGetValue.push(this.pickerValueMulThreeTwo[value[1]].value);
          pickerGetValue.push(this.pickerValueMulThreeThree[value[2]].value);
        }
        /* eslint-enable indent */
      }
      return {
        label: pickerLable,
        value: pickerGetValue
      };
    },

    // 初始化 pickerValue 默认值
    _initPickerValue() {
      let tempPickerValue;
      if (this.pickerValueDefault.length === 0) {
        if (this.mode === 'selector') {
          tempPickerValue = [0];
        } else if (this.mode === 'dateSelector') {
          tempPickerValue = transformDateToIndex();
        } else if (this.mode === 'multiSelector') {
          tempPickerValue = new Int8Array(this.pickerValueArray.length);
        } else if ((this.mode === 'multiLinkageSelector' && this.deepLength === 2) || this.mode === 'timeSelector') {
          tempPickerValue = [0, 0];
        } else if (this.mode === 'multiLinkageSelector' && this.deepLength === 3) {
          tempPickerValue = [0, 0, 0];
        }
      } else {
        // 单独处理 dateSelector 的初始值
        if (this.mode === 'dateSelector') {
          tempPickerValue = getDatePickerIndex(this.pickerValueDefault);
        } else {
          tempPickerValue = this.pickerValueDefault;
        }
      }
      // tempPickerValue 作兼容处理，防止因默认值设置不正确而出现 bug
      tempPickerValue = fixPickerValueDefault(tempPickerValue, this.mode, this.pickerValueArray);
      return tempPickerValue;
    },
    getDaysList(year, month, value) {
      let dayLength = getDays(year, month);
      value[2] = dayLength < this.pickerValueDay.length && this.pickerValue[2] > dayLength - 1 ? dayLength - 1 : this.pickerValue[2];
      if (dayLength !== this.pickerValueDay.length) {
        let dayList = [];
        for (let i = 0; i < dayLength; i++) {
          dayList.push({ label: i + 1 + '日', value: i + 1 });
        }
        this.pickerValueDay = dayList;
      }
      this.pickerValue = value;
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
  opacity: 0;
}

.mpvue-picker-view-show {
  transform: translateY(0);
  opacity: 1;
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
  content: ' ';
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
  font-size: 16px;
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
