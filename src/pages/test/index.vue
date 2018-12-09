<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <button @click="showSinglePicker">single mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" :mode="mode" :themeColor="themeColor" :pickerValueDefault="pickerValueDefault" :deepLength = "deepLength" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
export default {
  data() {
    return {
      mode: 'selector',
      pickerValueDefault: [],
      pickerValueArray: [],
      deepLength: 2,
      themeColor: '',
      pickerSingleArray: [
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
      ],
      mulLinkageTwoPicker: [
        {
          label: '飞机票',
          value: 0,
          children: [
            {
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
          children: [
            {
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
          children: [
            {
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
              children: [
                {
                  label: 'iphoneX',
                  value: 1
                },
                {
                  label: 'iphone8',
                  value: 2
                },
                {
                  label: 'iphone8 Plus',
                  value: 3
                }
              ]
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
                },
                {
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
                },
                {
                  label: 'mackbook',
                  value: 3
                },
                {
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
                },
                {
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
  components: { mpvuePicker },
  methods: {
    showPicker() {
      this.mode = 'multiLinkageSelector';
      this.pickerValueArray = this.mulLinkageThreePicker;
      this.deepLength = 3;
      this.pickerValueDefault = [1, 1, 1];
      this.themeColor = '#3D8CF6';
      this.$refs.mpvuePicker.show();
      // TODO
    },
    showSinglePicker() {
      this.mode = 'selector';
      this.pickerValueArray = this.pickerSingleArray;
      this.pickerValueDefault = [2];
      this.$refs.mpvuePicker.show();
    },
    onChange(e) {
      console.log(e);
    },
    onConfirm(e) {
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
