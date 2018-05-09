<template>
  <div class="mvpue-picker">
    <button type="default" @click="showPickerView">多级联动选择</button>
    <mpvue-picker :showPicker="showPicker" :columuNum=3 :pickerValueDefault=[1,0,1] @onChange="onChange" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
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
      pickerValueArray: [['中国', '美国', '日本', '俄罗斯'], ['茶', '咖啡', '寿司', '奶酪'], ['歼20', 'F22', '秋月级', 'T50']],
      showPicker: false
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    pickerCancel() {
      this.showPicker = false;
    },
    showPickerView() {
      this.showPicker = true;
    }
  }
};
</script>

<style>

</style>
