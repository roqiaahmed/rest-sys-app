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
      <AddNewRestourant />
    </div>
  </div>
</template>

<script>
import homePar from "../components/homePar.vue";
import AddNewRestourant from "../components/AddNewRestourant";
export default {
  name: "HomeView",
  data() {
    return {
      userName: "",
    };
  },
  components: {
    homePar,
    AddNewRestourant,
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push("/signUP");
    } else {
      this.userName = JSON.parse(user).name;
    }
  },
};
</script>
<style lang="scss">
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
