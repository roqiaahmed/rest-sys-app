<template>
  <homePar />
  <div class="container">
    <form @click.prevent>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Restourant Name"
          style="width: 100%; margin: 15px auto"
          v-model="state.Name"
        />
        {{ hh }}
        <div class="error" v-if="v$.Name.$error" style="width: 100%">
          {{ v$.Name.$errors[0].$message }}
        </div>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Phone"
          style="width: 100%; margin: 15px auto"
          v-model="state.Phone"
        />
        <div class="error" v-if="v$.Phone.$error" style="width: 100%">
          {{ v$.Phone.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="location"
          style="width: 100%; margin: 15px auto"
          v-model="state.location"
        />
        <div class="error" v-if="v$.location.$error" style="width: 100%">
          {{ v$.location.$errors[0].$message }}
        </div>
      </div>
      <!-- <div class="alert alert-success" v-if="successMessage.length > 0">
        {{ successMessage }}
      </div>
      <div class="alert alert-danger" v-if="dangerMessage.length > 0">
        {{ dangerMessage }}
      </div> -->
    </form>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click.prevent="Update()">
        Update
      </button>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "axios";
import homePar from "./homePar.vue";
export default {
  name: "UpdateRestourant",
  mounted() {
    let user = localStorage.getItem("user");
    this.idNumber = this.$route.params.id;
    this.userId = JSON.parse(user).id;
    this.accessLocation();
  },
  data() {
    return {
      idNumber: "",
      userId: "",
      message: "",
    };
  },
  setup() {
    const state = reactive({
      Name: "lol",
      Phone: "lll",
      location: "kkk",
    });
    const rules = computed(() => {
      return {
        Name: { required, minLength: minLength(6) },
        Phone: { required, minLength: minLength(6) },
        location: { required, minLength: minLength(6) },
      };
    });
    const v$ = useVuelidate(rules, state);
    return { state, v$ };
  },
  methods: {
    async accessLocation() {
      let result = await axios.get(
        `http://localhost:3000/restourant?userId=${this.userId}&id=${this.idNumber}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.state.Name = result.data[0].restourant;
        this.state.location = result.data[0].location;
        this.state.Phone = result.data[0].Phone;
      } else {
        this.$router.push("/");
      }
      console.log(result);
    },
    async Update() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/restourant/${this.idNumber}`,
          {
            restourant: this.state.Name,
            Phone: this.state.Phone,
            location: this.state.location,
            userId: this.userId,
          }
        );
        this.$router.push("/");
        console.log(result);
        if (result.status == 201) {
          this.successMessage = "Added New location";
          this.dangerMessage = "";
          this.$router.push({ name: "home" });
        } else {
          this.dangerMessage = "something went wrong, try again !";
          this.successMessage = "";
        }
      } else {
        this.dangerMessage = "you must fill all fildes";
        this.successMessage = "";
      }
    },
  },
  components: { homePar },
};
</script>
<style lang="scss" scoped>
form {
  width: 50%;
  margin: 0 auto;
}
button {
  margin: 0 auto;
}
</style>
