<template>
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
        />
        <div class="error" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Your email"
          style="width: 25%; margin: 15px auto"
          v-model="email"
        />
        <div class="error" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Your Password"
          style="width: 25%; margin: 15px auto"
          v-model="pass"
        />
        <div class="error" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="change()"
        style="width: 20%; margin: 20px auto"
      >
        change
      </button>
    </form>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "updateProfile",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      pass: "",
      email: "",
      id: "",
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    pass: {
      required,
      minLength: minLength(6),
    },
  },
  mounted() {
    let user = localStorage.getItem("user");
    this.name = JSON.parse(user).name;
    this.pass = JSON.parse(user).pass;
    this.email = JSON.parse(user).email;
    this.id = JSON.parse(user).id;
    if (!user) {
      this.$router.push("/signUP");
    }
  },
  methods: {
    async change() {
      let result = await axios.put(`http://localhost:3000/user/${this.id}`, {
        name: this.name,
        email: this.email,
        pass: this.pass,
      });
      if (result.status == 200) {
        localStorage.setItem("user", JSON.stringify(result.data));
        this.$router.push("/");
      }
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("change");
      }
    },
  },
};
</script>
<style>
.error {
  width: 25%;
  margin: 0 auto;
  color: #f00;
}
</style>
