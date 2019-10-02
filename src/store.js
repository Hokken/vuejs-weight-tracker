import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const apiUrl = "/api";

export default new Vuex.Store({
  state: {
    records: [],
    trends: []
  },
  mutations: {   
    setRecords(state, data) {
      state.records = [...data];
      state.trends = state.records.map(el => {
        return parseInt(el.weight);
      })
    }
  },
  actions: {
    saveData({ commit }, data) {
      return new Promise((resolve, reject) => {
      console.log("Attempting to save data...");
      axios
        .post(`${apiUrl}/save`, data)
        .then(response => {
          resolve('data saved');             
        })
        .catch(err => {
          reject(err); 
        });
      });
    },
    updateData({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${apiUrl}/update`, data)
          .then(response => {
            resolve("Record updated, refreshing data...");
            dispatch("getData")
              .then(resp => {
                console.log(resp);
                this.pmode = "read";
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getData({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${apiUrl}/get`, data)
          .then(response => {
            resolve("Data updated");
            commit("setRecords", response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteData({ dispatch }, data) {
      return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/delete`, data)
        .then(response => {
          resolve("Record deleted");
          dispatch("getData");
        })
        .catch(err => {
          reject(err);
        });
      });
    }    
  }
});
