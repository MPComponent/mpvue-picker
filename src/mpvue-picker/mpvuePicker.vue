<template>
  <div class="mpvue-picker">
    <button type="default" @click="showPickerView">多级联动选择</button>
    <div :class="{'pickerMask':isShowMask}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':pickerShow}">
      <div class="mpvue-picker__hd">
        <div href="javascript:;" class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div href="javascript:;" class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" @change="pickerChange">
        <picker-view-column>
          <div class="picker-item" v-for="item in columuOne" :key="index">{{item}}</div>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMask: true,
      pickerShow: true,
      columuOne: ['中国', '美国', '日本', '俄罗斯']
    };
  },
  methods: {
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    pickerConfirm() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    showPickerView() {
      this.isShowMask = true;
      this.pickerShow = true;
    },
    pickerChange(e) {
      console.log(e.mp.detail.value);
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
