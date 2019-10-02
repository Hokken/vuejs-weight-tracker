<template>
  <div id="app">
    <app-header/>   
    <router-view class="c-container"></router-view>
  </div>
</template>
<script>
import Header from "./components/Header/Header";

export default {
  components: {
    "app-header": Header
  }
};
</script>
<style lang="scss" scoped>
.c-container {
  margin: 80px 20px;
}
</style> 
