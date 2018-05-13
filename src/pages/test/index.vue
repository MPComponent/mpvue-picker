<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
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
      pickerValueDefault: [1, 1],
      deepLength: 2,
      mode: 'multiLinkageSelector',
      mulLinkageTwoPicker: [
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
    };
  },
  methods: {
    showPicker() {
      this.$refs.mpvuePicker.show();
    },
    onConfirm(e) {
      console.log(e);
    }
  }
};
</script>

<style>

</style>
