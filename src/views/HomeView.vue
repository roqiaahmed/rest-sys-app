<template>
  <homePar />
  <div class="container">
    <div class="user">
      <h3>{{ userName }}</h3>
      <router-link
        :to="{ name: 'profile', params: { pagetitle: 'home page' } }"
      >
        <button type="button" class="btn btn-outline-dark">profile</button>
      </router-link>
      <router-link :to="{ name: 'AddNewRestourant' }">
        <span>
          <button type="button" class="btn btn-outline-dark">
            AddNewRestourant
          </button>
        </span>
      </router-link>
      <UserLocation :restourant="allResto" />
    </div>
  </div>
</template>

<script>
import homePar from "../components/homePar.vue";
import UserLocation from "../components/UserLocation";
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      userName: "",
      userId: "",
      allResto: [],
    };
  },
  components: {
    homePar,
    UserLocation,
  },
  async mounted() {
    let user = localStorage.getItem("user");
    // console.log(user);
    if (!user) {
      this.$router.push("/signUP");
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    let restourant = await axios.get(
      `http://localhost:3000/restourant?userId=${this.userId}`
    );
    this.allResto = restourant.data;
  },
};
</script>
<style lang="scss">
span {
  float: left;
}
.user {
  margin-top: 20px;
  h3 {
    float: right;
    color: #0e8bf9;
  }
  button {
    float: right;
    margin-right: 10px;
  }
}
</style>
