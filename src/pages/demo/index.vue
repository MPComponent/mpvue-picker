<template>
  <div class="mvpue-picker">
    <button type="default" @click="showPickerView">多级联动选择</button>
    <mpvue-picker ref="mpvuePicker" :isMul='false' :pickerValueDefault=[1,1,1] @onChange="onChange" @pickerConfirm="pickerConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from '@/mpvue-picker/mpvuePicker.vue';
export default {
  components: {
    mpvuePicker
  },
  data() {
    return {
      pickerValueArray: [
        ['中国', '美国', '日本', '俄罗斯'],
        ['茶', '咖啡', '寿司', '奶酪'],
        ['歼20', 'F22', '秋月级', 'T50']
      ],
      mulLinkagePicker: [{
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
    onChange(e) {
      console.log(e);
    },
    showPickerView() {
      this.$refs.mpvuePicker.show();
    },
    pickerConfirm(e) {
      console.log(e);
      this.showPicker = false;
    }
  }
};
</script>

<style>

</style>
