<template>
  <div class="mvpue-picker">
    <mpvue-picker :columuNum=3 :pickerValueDefault=[1,0,1] @onChange="onChange" :pickerValueArray="pickerValueArray"></mpvue-picker>
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
      pickerValueArray: [['中国', '美国', '日本', '俄罗斯'], ['茶', '汉堡', '寿司', '奶酪'], ['歼20', 'F22', '秋月级', 'T50']]
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    }
  }
};
</script>

<style>

</style>
