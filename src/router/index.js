import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signUP from "../views/signup.vue";
import signIn from "../views/signin.vue";
import profile from "../views/profile/userProfile.vue";
import updateprofile from "../views/profile/updateProfile.vue";
import NotFound from "../components/NotFound";
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
