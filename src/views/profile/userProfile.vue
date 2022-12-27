<template>
  <homePar />
  <div class="container">
    <h1>Profile</h1>
    <form>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Your Name"
          style="width: 25%; margin: 15px auto"
          v-model="name"
          disabled
        />
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Your email"
          style="width: 25%; margin: 15px auto"
          v-model="email"
          disabled
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Your Password"
          style="width: 25%; margin: 15px auto"
          v-model="pass"
          disabled
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="UpDate()"
        style="width: 20%; margin: 20px auto"
      >
        UpDate
      </button>
    </form>
  </div>
</template>
<script>
import homePar from "/src/components/homePar.vue";
export default {
  name: "userProfile",
  data() {
    return {
      name: "",
      pass: "",
      email: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    this.name = JSON.parse(user).name;
    this.pass = JSON.parse(user).pass;
    this.email = JSON.parse(user).email;
    if (!user) {
      this.$router.push("/signUP");
    }
  },
  methods: {
    UpDate() {
      this.$router.push("/updateprofile");
    },
  },
  components: {
    homePar,
  },
};
</script>
