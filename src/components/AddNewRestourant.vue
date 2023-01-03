<template>
  <div class="modal-body">
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
      <div class="alert alert-success" v-if="successMessage.length > 0">
        {{ successMessage }}
      </div>
      <div class="alert alert-danger" v-if="dangerMessage.length > 0">
        {{ dangerMessage }}
      </div>
    </form>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click.prevent="add()">
        Add
      </button>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "AddNewRestourant",
  mounted() {
    let user = localStorage.getItem("user");
    if (user) {
      this.userId = JSON.parse(user).id;
    }
  },
  data() {
    return {
      userId: "",
      successMessage: "",
      dangerMessage: "",
    };
  },
  setup() {
    const state = reactive({
      Name: "",
      Phone: "",
      location: "",
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
    async add() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/restourant", {
          restourant: this.state.Name,
          Phone: this.state.Phone,
          location: this.state.location,
          userId: this.userId,
        });
        console.log(result);
        if (result.status == 201) {
          this.successMessage = "Added New location";
          this.dangerMessage = "";
          this.$router.push({ name: "home" });
          setTimeout(() => {
            this.successMessage = "";
            this.dangerMessage = "";
            this.state.Name = "";
            this.state.Phone = "";
            this.state.location = "";
          }, 2000);
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
};
</script>
<style lang="scss">
.modal-body {
  width: 30%;
  margin: 100px auto;
  form {
    width: 50%;
  }
  button {
    margin: 0 auto;
  }
}
</style>
