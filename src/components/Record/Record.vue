<template>
  <transition appear name="fade">
    <div class="card bg-light mb-3" style="max-width: 28rem;">
      <div class="card-body">
        <h5 class="card-title">Add a Record</h5>
        <form>
          <div class="form-group">
            <label>Date</label>
            <input v-model="currentDate" readonly type="email" class="form-control" />
          </div>
          <div class="form-group">
            <label>Weight</label>
            <input v-model="pweight" :readonly="isEditable()" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea v-model="pnotes" :readonly="isEditable()" type="text" class="form-control" />
          </div>
          <button
            v-if="this.pmode==='read'"
            @click.prevent="editRecord"
            class="btn btn-sm btn-primary"
          >Edit</button>
          <button
            v-if="this.pmode==='edit' || this.pmode==='add'"
            @click.prevent="getState"
            class="btn btn-sm btn-success"
          >Save</button>
          <button
            v-if="this.pmode==='edit' || this.pmode==='read'"
            @click.prevent="deleteRecord"
            class="btn btn-sm btn-danger"
          >Delete</button>
          <span class="ml-2 text-danger">{{error}}</span>
        </form>
      </div>
    </div>    
  </transition>
</template>
<script>
import { mapState } from "vuex";
import { TweenLite } from 'gsap/all';
export default {
  data: () => {
    return {
      error: "",
      pweight: "",
      pnotes: "",
      pmode: ""
    };
  },
  props: {
    mode: String,
    notes: String,
    weight: String,
    id: String
  },
  computed: {
    currentDate() {
      return new Date().toDateString();
    }
  },
  mounted() {
    this.pweight = this.weight;
    this.pnotes = this.notes;
    this.pmode = this.mode;
  },
  methods: {   
    getState() {
      if (this.pmode === "edit") {
        this.updateRecord();
      } else {
        this.saveRecord();
      }
    },
    editRecord() {
      this.pmode = "edit";
    },
    deleteRecord() {
      this.$store
        .dispatch("deleteData", {
          id: this.id
        })
        .then(resp => {
          console.log(resp);
          this.pmode = "read";
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateRecord() {
      if (this.pnotes === "" || this.pweight === "") {
        this.error = "Please fill up all the fields";
        return;
      }
      this.error = "";

      this.$store
        .dispatch("updateData", {
          date: this.currentDate,
          weight: this.pweight,
          notes: this.pnotes,
          id: this.id
        })
        .then(resp => {
          console.log(resp);
          this.pmode = "read";
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveRecord() {
      if (this.pnotes === "" || this.pweight === "") {
        this.error = "Please fill up all the fields";
        return;
      }
      this.error = "";
      this.$store
        .dispatch("saveData", {
          date: this.currentDate,
          weight: this.pweight,
          notes: this.pnotes
        })
        .then(resp => {
          console.log(resp);         
        })
        .catch(err => {
          console.log(err);
        });
    },
    isEditable() {
      return this.pmode === "read";
    }
  }
};
</script>
<style lang="scss" scoped>
.card,
input,
textarea {
  font-size: 0.9rem;
}
button + button {
  margin-left: 5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
