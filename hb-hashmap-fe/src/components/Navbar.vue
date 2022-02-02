<template>
    <nav class="navbar navbar-light">
        <span class="navbar-brand mb-0 h1">Hi {{ username }}, </span>
        <form class="form-inline">
             <router-link :to="{ path: '/'}">
                 <button class="btn btn-outline-secondary mr-4" type="button">Home</button>     
             </router-link>
            <button class="btn btn-outline-danger" type="button" @click.prevent="logout()">Logout</button>          
        </form>
    </nav>
</template>

<script>

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default {
  data() {
    return {
        username : ''
    };
  },
  mounted: async function () {
    const usr = await UserService.getMe();
    this.username = usr.username || '';
  },
  methods: {
      async logout(){
          await AuthService.logout();
          this.$router.push('login').catch( error => {
            console.warn('Go to login')
        })                  
      }
  }
};
</script>