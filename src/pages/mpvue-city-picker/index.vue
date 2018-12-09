<template>
  <div class="mpvue-picer">
    <button @click="showPicker">test for mpvuePicker</button>
    <mpvue-picker ref="mpvuePicker" mode="multiLinkageSelector" :deepLength=3 @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
import { cityData } from '@/pages/mpvue-city-picker/data';
export default {
  data() {
    return {
      pickerValueArray: cityData,
      pickerValueDefault: []
    };
  },
  components: { mpvuePicker },
  methods: {
    showPicker() {
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
