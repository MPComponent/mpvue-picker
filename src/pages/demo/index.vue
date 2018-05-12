<template>
  <div class="mvpue-picker">
    <div class="page-hd">
      <div class="page-title">mvpue-picker 示例</div>
    </div>
    <div class="page-bd">
      <button type="default" @click="showSinglePicker">单列选择</button>
      <button type="default" @click="showMulPicker">多列选择</button>
      <button type="default" @click="showMulLinkageTwoPicker">二级联动选择</button>
      <button type="default" @click="showMulLinkageThreePicker">三级联动选择</button>
    </div>
    <mpvue-picker ref="mpvuePicker" :isMul="isMul" :isMulLinkage='isMulLinkage' :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @pickerConfirm="pickerConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from '@/mpvue-picker/mpvuePicker.vue';
// import mpvuePicker from 'mpvue-picker';
export default {
  components: {
    mpvuePicker
  },
  data() {
    return {
      isMul: false, // 是否为多列
      isMulLinkage: false, // 是否为联动
      deepLength: 0, // 几级联动
      pickerValueDefault: [], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerSingleArray: ['住宿费', '礼品费', '活动费', '通讯费', '补助'],
      pickerMulArray: [
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
    // 单列
    showSinglePicker() {
      this.pickerValueArray = this.pickerSingleArray;
      this.isMul = false;
      this.isMulLinkage = false;
      this.$refs.mpvuePicker.show();
    },
    // 多列选择
    showMulPicker() {
      this.pickerValueArray = this.pickerMulArray;
      this.isMul = true;
      this.isMulLinkage = false;
      this.deepLength = 0;
      this.$refs.mpvuePicker.show();
    },
    // 二级联动选择
    showMulLinkageTwoPicker() {
      this.pickerValueArray = this.mulLinkageTwoPicker;
      this.isMul = false;
      this.isMulLinkage = true;
      this.deepLength = 2;
      this.pickerValueDefault = [1, 0];
      this.$refs.mpvuePicker.show();
    },
    // 三级联动选择
    showMulLinkageThreePicker() {
      this.pickerValueArray = this.mulLinkageThreePicker;
      this.isMulLinkage = true;
      this.isMul = false;
      this.deepLength = 3;
      this.pickerValueDefault = [1, 1, 1];
      this.$refs.mpvuePicker.show();
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
.page-hd {
  padding: 40px;
}
.page-title {
  font-size: 20px;
  font-weight: 400px;
}
.page-bd {
  padding: 15px;
}
button {
  margin-top: 15px;
}
</style>
