<template>
  <div class="animated fadeIn">
    <div class="app flex-row align-items-center">
      <div class="container">
        <b-row class="justify-content-center">
          <b-col md="6" sm="8">
            <b-card no-body class="mx-4">
              <b-card-body class="p-4">
                <b-form>
                  <h1>Cadastro</h1>
                  <p class="text-muted">Criar novo usuário</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="username" placeholder="Usuário" />
                  </b-input-group>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="email" placeholder="E-mail" />
                  </b-input-group>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" v-model="password" placeholder="Senha"/>
                  </b-input-group>

                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" v-model="passwordConfirmation" placeholder="Repetir Senha" />
                  </b-input-group>
                  <b-alert v-if="errorMessage" show variant="danger">{{errorMessage}}</b-alert>
                  <b-button variant="success" v-on:click="register()" block>Criar conta</b-button>
                </b-form>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import service from "./../../service";
import Router from "vue-router";
import Vue from "vue";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: undefined,
    };
  },
  methods: {
    register: function() {
      if (this.password == this.passwordConfirmation) {
          service
            .register({
              signupData: {
                  email: this.email,
                  password: this.password,
                  username: this.username
                }
              }
            )
            .then(result => {
              service
              .login({
                signinData: {
                  email: this.email,
                  key: this.password
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
                  this.errorMessage = "Tente fazer login novamente!";
                }
              );
            })
            .catch(error => {
              if (error && error.message) {
                this.errorMessage = error.message;
              } else {
                this.errorMessage = "Confira os dados e tente novamente.";
              }
            });
      } else {
        this.errorMessage = "Confira os dados e tente novamente.";
      }
    }
  }
};
</script>
