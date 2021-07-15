<template>
  <div class="animated fadeIn">
    <div class="app flex-row align-items-center">
      <div class="container">
        <b-row class="justify-content-center">
          <b-col md="8">
            <b-card-group>
              <b-card no-body class="p-4">
                <b-card-body>
                  <b-form v-on:keyup.enter="login">
                    <h1>Login</h1>
                    <b-input-group class="mb-3">
                      <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="text" class="form-control" v-model="email" placeholder="Email" />
                    </b-input-group>
                    <b-input-group class="mb-4">
                      <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="password" class="form-control" v-model="key" placeholder="Senha" />
                    </b-input-group>
                    <b-row>
                      <b-col cols="6">
                        <b-alert v-if="errorMessage" show variant="danger">{{errorMessage}}</b-alert>
                        <b-button variant="primary" class="px-4" @click="login">Login</b-button>
                      </b-col>
                      <b-col cols="6" class="text-right">
                        <b-button variant="link" class="px-0" @click="register">Cadastrar</b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import service from "./../../service";
import Router from "vue-router";

export default {
  name: "Login",
  data: function() {
    return {
      email: undefined,
      key: undefined,
      errorMessage: undefined
    };
  },
  methods: {
    login(){
      if(this.email && this.key){
        this.errorMessage = undefined;
        service
        .login({
          signinData: {
            email: this.email,
            key: this.key
          }
        })
        .then(
          result => {
            if (
              result &&
              result.auth &&
              result.token &&
              result.user
            ) {
              localStorage.userId = result.user.userId;
              localStorage.userEmail = result.user.email;
              localStorage.token = result.token;
              this.$router.push("/dashboard");
            }
          },
          () => {
            this.errorMessage = "Tente novamente!";
          }
        );
      } else {
        this.errorMessage = "Preencha os campos!";
      }
    },
    register(){
      this.$router.push("/pages/Register");
    }
  },
  created: function() {
    if (
      localStorage.token &&
      localStorage.userId &&
      localStorage.userEmail
    ) {
      this.$router.push("/dashboard");
    } else {
    }
  }
};
</script>

<style>
body{
  background-color: #ffffff;
  background-image: url('../../images/bg-login.svg');
  background-attachment: fixed;
  background-size: cover;
}
</style>
