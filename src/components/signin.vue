<!-- eslint-disable no-undef -->
<template>
  <div class="container">
    <h1>sign in</h1>
    <form @click.prevent>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Your email"
          style="width: 25%; margin: 20px auto"
          v-model="state.email"
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
          style="width: 25%; margin: 20px auto"
          v-model="state.Pass"
        />
        <div class="error" v-if="v$.Pass.$error">
          {{ v$.Pass.$errors[0].$message }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="signupnow()"
        style="width: 20%; margin: 20px auto"
      >
        Submit
      </button>
    </form>
    <a href="#" @click="signUp()">sing up</a>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import router from "@/router";
import axios from "axios";
export default {
  name: "signinForm",
  mounted() {
    let user = localStorage.getItem("user");
    // console.log("signin", user);
    if (user) {
      this.$router.push("/");
    }
  },
  setup() {
    const state = reactive({
      email: "",
      Pass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        Pass: { required, minLength: minLength(6) },
      };
    });

    const v$ = useVuelidate(rules, state);
    const signupnow = async () => {
      v$.value.$touch();
      let result = await axios.get(
        `http://localhost:3000/user?email=${state.email}&pass=${state.Pass}`
      );
      if (result.status == 200 && result.data.length > 0) {
        let currentUser = result.data[0];
        localStorage.setItem("user", JSON.stringify(currentUser));
        router.push({ name: "home" });
      }
    };
    const signUp = () => {
      router.push("/signUP");
    };

    return { state, v$, signupnow, signUp };
  },
};
</script>
<style lang="scss">
.error {
  color: #f00;
}
</style>
