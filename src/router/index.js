import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signUP from "../views/signup.vue";
import signIn from "../views/signin.vue";
import profile from "../views/profile/userProfile.vue";
import updateprofile from "../views/profile/updateProfile.vue";
import NotFound from "../components/NotFound";
import AddNewRestourant from "../components/AddNewRestourant.vue";
import DeleteRestaurant from "../components/DeleteRestaurant.vue";
import DeleteAll from "../components/DeleteAll.vue";
import UpDAte from "../components/UpDAte.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signUP",
    name: "signUP",
    component: signUP,
  },
  {
    path: "/DeleteRestaurant/:id",
    name: "DeleteRestaurant",
    component: DeleteRestaurant,
  },
  {
    path: "/UpDAte/:id",
    name: "UpDAte",
    component: UpDAte,
  },
  {
    path: "/DeleteAll",
    name: "DeleteAll",
    component: DeleteAll,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: signIn,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/updateprofile",
    name: "updateprofile",
    component: updateprofile,
  },
  {
    path: "/AddNewRestourant",
    name: "AddNewRestourant",
    component: AddNewRestourant,
  },
  { path: "/:pathMatch(.*)", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLEL} | ${to.name}`;
  next();
});

export default router;
