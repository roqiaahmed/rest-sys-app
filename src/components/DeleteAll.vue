<template>
  <homePar />
  <div class="container">
    <h1>Delete All Restaurants</h1>
    <hr />
    <span>Are you sure you want to delete All location ?</span>
    <div>
      <button
        type="button"
        class="btn btn-info"
        style="margin-right: 7px"
        @click="Back"
      >
        Back
      </button>
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
import axios from "axios";
import homePar from "./homePar.vue";
export default {
  name: "DeletaAll",
  components: {
    homePar,
  },
  async mounted() {
    let user = localStorage.getItem("user");
    this.userId = JSON.parse(user).id;
    let result = await axios.get(
      `http://localhost:3000/restourant?userId=${this.userId}`
    );
    let resultlen = result.data.length;
    for (let i = 0; i < resultlen; i++) {
      this.restaurantId.push(result.data[i].id);
    }
    if (user && this.restaurantId.length > 0) {
      console.log(this.restaurantId);
    } else {
      this.$router.push("/signIn");
    }
  },
  data() {
    return {
      userId: "",
      message: "",
      restaurantId: [],
    };
  },
  methods: {
    Back() {
      this.$router.push("/");
    },
    async Delete() {
      for (let i = 0; i < this.restaurantId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/restourant/${this.restaurantId[i]}`
        );
        if (result.status == 200) {
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
          this.message = "location is deleted....";
        } else {
          this.message = "there is problem";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
span {
  margin: 0 auto;
  width: 100%;
}
</style>
