<template>
  <div class="auth-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div class="card">
            <form>
                <h3>Sign Up</h3>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" v-model="username"  class="form-control form-control-lg" />
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" v-model="password" class="form-control form-control-lg" />
                </div>

                <div class="form-group">
                    <label> Confirm Password</label>
                    <input type="password" v-model="confirmPassword" class="form-control form-control-lg" />
                </div>

                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="isAdmin" v-model="isAdmin">
                    <label class="form-check-label" for="isAdmin">I want to be an Admin!</label>
                </div>

              <button type="button" class="btn btn-primary btn-lg btn-block mt-4" @click.prevent="register()">
                Sign Up
              </button>
              <b-alert show  variant="danger" v-if="errors.length > 0" class="mt-4">
                  <ul>
                    <li v-for="error in errors" :key="error"> {{ error }} </li> 
                  </ul>
              </b-alert>

              <p class="forgot-password text-right" >
                Already registered
                <router-link :to="{ name: 'login' }">sign in?</router-link>
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
        username : null,
        password : null,
        confirmPassword: null,
        isAdmin: false
    };
  },
  methods: {
      async register(){
          this.errors = [];
          var testUserName = /\W/;
          if(!this.username){
              this.errors.push("Username is required.")
          } else {
              if(testUserName.test(this.username)) {
                this.errors.push("Username is not valid. Use only numbers and alphabets.")
              }
          }
          if(!this.password){
              this.errors.push("Password is required.")
          } else {
              if(this.password.length < 8) {
                  this.errors.push("Password must be at least 8 characters")
              }
          }
          if(!this.confirmPassword && this.confirmPassword != this.password){
              this.errors.push("Password must match.")
          }
          if(!this.errors.length){
              const res = await AuthService.register(this.username,this.password,this.isAdmin);
              if(res?.success) {
                  console.log("User registered and logged in.", res);
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