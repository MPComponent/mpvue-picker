<template>
  <div class="mvpue-picker">
    <button type="default" @click="showPickerView">多级联动选择</button>
    <mpvue-picker ref="mpvuePicker" :isMul='true' :deepLength=3 :pickerValueDefault=[0,1,1] @onChange="onChange" @pickerConfirm="pickerConfirm" @pickerCancel="pickerCancel" :pickerValueArray="mulLinkageThreePicker"></mpvue-picker>
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
      ],
      mulLinkageThreePicker: [
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
