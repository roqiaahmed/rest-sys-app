<template>
  <div class="add">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add New Restourant
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add New Restourant
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
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
                <div
                  class="error"
                  v-if="v$.location.$error"
                  style="width: 100%"
                >
                  {{ v$.location.$errors[0].$message }}
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="add">
              Add
            </button>
          </div>
        </div>
      </div>
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
    const add = () => {
      v$.value.$touch();
      if (!v$.value.$error) {
        let result = axios.post("http://localhost:3000/restourant", {
          restourant: state.Name,
          Phone: state.Phone,
          location: state.location,
          userId: 8,
        });
        console.log(result);

        console.log("pass");
      } else {
        console.log("error");
      }
    };
    // const signupnow = async () => {
    //   v$.value.$touch();
    //   let result = await axios.get(
    //     `http://localhost:3000/user?email=${state.email}&pass=${state.Pass}`
    //   );
    //   if (result.status == 200 && result.data.length > 0) {
    //     let currentUser = result.data[0];
    //     localStorage.setItem("user", JSON.stringify(currentUser));
    //     router.push({ name: "home" });
    //   }
    // };

    return { state, v$, add };
  },
};
</script>
<style lang="scss">
.add {
  float: left;
}
</style>
