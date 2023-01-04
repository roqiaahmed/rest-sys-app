<template>
  <div class="container">
    <h1>sign up</h1>
    <form @click.prevent>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Your Name"
          style="width: 25%; margin: 15px auto"
          v-model.trim="v$.name.$model"
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
          v-model.trim="v$.email.$model"
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
          v-model="v$.pass.$model"
        />
        <div class="error" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="signupNow()"
        style="width: 20%; margin: 20px auto"
      >
        Submit
      </button>
    </form>
    <a href="#" @click="signin()">sing in</a>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "signupForm",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      pass: "",
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
    if (user) {
      this.$router.push("/");
    }
  },
  methods: {
    async signupNow() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const result = await axios.post(" http://localhost:3000/user", {
          name: this.name,
          email: this.email,
          pass: this.pass,
        });
        localStorage.setItem("user", JSON.stringify(result.data));
        this.$router.push("/");
      } else {
        console.log("no");
      }
    },
    signin() {
      this.$router.push("/signIn");
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  width: 80%;
  margin: 0 auto;
}
button {
  margin: 0 auto;
}
.error {
  width: 25%;
  margin: 0 auto;
  color: #f00;
}
</style>
