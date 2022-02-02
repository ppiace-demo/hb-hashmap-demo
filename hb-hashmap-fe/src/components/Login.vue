<template>
  <div class="auth-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div class="card">
            <form>
              <h3>Sign In</h3>

              <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="username" class="form-control form-control-lg" />
              </div>

              <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password"  class="form-control form-control-lg" />
              </div>

              <button type="button" class="btn btn-primary btn-lg btn-block"  @click.prevent="login()">
                Sign In
              </button>

              <b-alert show  variant="danger" v-if="errors.length > 0" class="mt-4">
                  <ul>
                    <li v-for="error in errors" :key="error"> {{ error }} </li> 
                  </ul>
              </b-alert>
 
                <p class="forgot-password text-right">
                    You don't have an account yet,
                    <router-link :to="{name: 'register'}">sign up?</router-link>
                </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import AuthService from "../services/auth.service";

export default {
  data() {
    return {
        errors: [],
        username : '',
        password : ''
    };
  },
  methods: {
      async login(){
          this.errors = [];
          var testUserName = /\W/;
          if(!this.username){
              this.errors.push("Username is required.")
          }
          if(!this.password){
              this.errors.push("Password is required.")
          }
          if(!this.errors.length){
              const res = await AuthService.login(this.username,this.password);
              if(res?.success) {
                  console.log("User logged in.", res)
                  if(AuthService.isAdmin()){
                    this.$router.push('admin-home')
                  } else {
                    this.$router.push('home')
                  }
              } else {
                  this.errors.push(res?.message || res)
              }              
          }
      }
  }
};
</script>