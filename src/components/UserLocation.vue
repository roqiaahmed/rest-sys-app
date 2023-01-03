<template>
  <div class="container">
    <table class="table table-dark" v-if="restourant.length > 0">
      <thead>
        <span style="color: #848484">
          list of locations ({{ restourant.length }})</span
        >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Addres</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-light" v-for="resto in restourant" :key="resto.id">
          <th scope="row">{{ resto.restourant }}</th>
          <td>{{ resto.Phone }}</td>
          <td>{{ resto.location }}</td>
          <td>{{ resto.id }}</td>
          <td>
            <ul>
              <li>
                <RouterLink :to="'DeleteRestaurant/' + resto.id"
                  ><button
                    type="button"
                    class="btn btn-danger"
                    style="margin-right: 17px"
                  >
                    Delete
                  </button>
                </RouterLink>
              </li>
              <li>
                <button type="button" class="btn btn-info">Update</button>
              </li>
              <li>
                <button type="button" class="btn btn-success">viwe</button>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <span v-else>no restourant yet</span>
  </div>
</template>
<script>
export default {
  name: "UserLocation",
  props: {
    restourant: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
