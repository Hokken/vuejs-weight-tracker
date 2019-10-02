import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import AddRecord from "./views/AddRecord";
import ViewRecords from "./views/ViewRecords";
import Trends from "./components/Trend/Trend";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/add", component: AddRecord },
  { path: "/view", component: ViewRecords },
  { path: "/trends", component: Trends }
];

export default new Router({
  mode: "history",
  routes
});
