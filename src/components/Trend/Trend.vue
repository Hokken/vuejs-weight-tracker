<template>
  <div>
    <trend
      :data="data"
      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
      auto-draw
      smooth
    ></trend>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default { 
   mounted() {
    this.$store
      .dispatch("getData")
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
   ...mapState({
      data: state => state.trends
   })
  }
}
</script>