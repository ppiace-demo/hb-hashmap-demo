<template>
  <div class="auth-page">
    <div class="container">
      <Navbar />
      <div class="row mt-5">
        <div class="card" style="width:100%;">
          <div class="card-header">
            <h2> Manage users </h2>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Admin</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id"> 
                <th scope="row">{{ user.id}}</th>
                <td>{{ user.username}}</td>
                <td>{{ user.is_admin ? 'Y' : 'N'}}</td>
                <td class="action">
                  <b-icon class="mr-3" icon="trash" @click.prevent="deleteUser(user.id)"></b-icon>
                  <router-link :to="{ name: 'admin-hashmap', params: { userId : user.id } }"><b-icon icon="card-list"></b-icon></router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
        users: [],
    };
  },
  mounted: async function () {
    this.users = await UserService.getAllUsers();
  },
  methods: {
    async deleteUser(userId){
      await UserService.delete(userId);
      this.users = await UserService.getAllUsers();
    }
      
  }
};
</script>
<style scoped>
.action{
  cursor: pointer;
}
</style>