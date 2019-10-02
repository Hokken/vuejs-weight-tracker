<template>
  <div class="container">
    <button
      v-if="records.length>0"
      @click.prevent="deleteAll"
      class="btn btn-sm btn-danger d-block ml-1 mb-3"
    >Delete All</button>
    <app-record
      class="d-inline-flex m-1"
      mode="read"
      v-for="record in records"
      :key="record.id"
      :weight="record.weight"
      :notes="record.notes"
      :id="record._id"
    />
  </div>
</template>
<script>
import Record from "../components/Record/Record";
import { mapState } from "vuex";
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
  components: {
    "app-record": Record
  },
  computed: {
    ...mapState({
      records: state => state.records
    })
  },
  methods: {
    deleteAll() {
      this.$store.dispatch("deleteData");
    }
  }
};
</script>
<style scoped lang="scss">
</style>
