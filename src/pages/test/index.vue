<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" :pickerValueArray="pickerValueArray" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
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
      pickerValueDefault: [1]
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
