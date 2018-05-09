<template>
  <div class="mvpue-picker">
    <mpvue-picker :columuNum=3 @onChange="onChange"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from '@/mpvue-picker/mpvuePicker.vue';
export default {
  components: {
    mpvuePicker
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
