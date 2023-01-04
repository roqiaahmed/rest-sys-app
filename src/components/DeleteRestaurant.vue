<template>
  <HomePar />
  <div class="container">
    <h1>Delete Restaurant #{{ idNumber }}</h1>
    <form action="">
      <hr />
      <span>Are you sure you want to delete this location ?</span>
      <ul>
        <li>{{ name }}</li>
        <li>{{ address }}</li>
        <li>{{ phone }}</li>
      </ul>
      <hr />
    </form>
    <div>
      <button type="button" class="btn btn-info" @click="Back">Back</button>
      <button type="button" class="btn btn-danger" @click.prevent="Delete">
        Delete
      </button>
    </div>
    <div
      class="alert alert-warning"
      role="alert"
      style="width: 20%; margin: 15px auto"
      v-if="message.length > 0"
    >
      {{ message }}
    </div>
  </div>
</template>
<script>
import HomePar from "./homePar.vue";
import axios from "axios";
export default {
  name: "DeleteRestaurant",
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      idNumber: "",
      userId: "",
      message: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user");
    this.userId = JSON.parse(user).id;
    this.idNumber = this.$route.params.id;
    this.accessLocation();
  },
  methods: {
    Back() {
      this.$router.push("/");
    },
    async accessLocation() {
      let result = await axios.get(
        `http://localhost:3000/restourant?userId=${this.userId}&id=${this.idNumber}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.name = result.data[0].restourant;
        this.address = result.data[0].location;
        this.phone = result.data[0].Phone;
      } else {
        this.$router.push("/");
      }
      console.log(result);
    },
    async Delete() {
      await axios.delete(`http://localhost:3000/restourant/${this.idNumber}`);
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
      this.message = "location is deleted....";
    },
  },
  components: { HomePar },
};
</script>
<style lang="scss" scoped>
form {
  width: 30%;
  margin: 0 auto;
  span {
    margin: 0 auto;
    width: 100%;
  }
  ul {
    li {
      text-align: initial;
      color: #5e6062;
      display: block;
    }
  }
}
</style>
