<!-- eslint-disable vue/no-parsing-error -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">resto</a>
      </div>
      <ul>
        <router-link :to="{ name: 'home', params: { pagetitle: 'home page' } }"
          ><li>home</li></router-link
        >
        <li @click="logOut">log out</li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: "HomePar",
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push("/signUP");
    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>
<style lang="scss">
ul {
  list-style: none;

  li {
    cursor: pointer;
    color: aliceblue;
    display: inline-block;
    margin-top: 19px;
    padding-right: 20px;
  }
}
</style>
