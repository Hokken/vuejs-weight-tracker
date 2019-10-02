<template>
  <div class="c-container">
    <nav class="navbar navbar-expand fixed-top navbar navbar-dark bg-dark">
      <a class="navbar-brand" @click.prevent="goHome" href="#">
        <img
          src="../../assets/weighttracker.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        />
        WEIGHT TRACKER
      </a>
      <ul class="navbar-nav">
        <router-link to="/add" activeClass="active" class="nav-item" tag="li">
          <a class="nav-link small">Add A Record</a>
        </router-link>
        <router-link to="/view" activeClass="active" class="nav-item" tag="li">
          <a class="nav-link small">View Records</a>
        </router-link>
        <router-link to="/trends" activeClass="active" class="nav-item" tag="li">
          <a class="nav-link small">View Trends</a>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    goHome(){
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.c-container {
  .navbar-brand {
    color: #5fb7f1;
  }
}
</style>