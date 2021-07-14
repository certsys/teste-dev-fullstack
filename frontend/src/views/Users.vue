<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Usuários</div>
          <div class="card-body">
            <table class="table table-responsive-sm table-bordered">
              <thead class="text-center">
                <tr>
                  <th>Usuário</th>
                  <th>Email</th>
                  <th>Membro desde</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="user in users" v-bind:key="user._id">
                  <td>{{user.username}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.createdAt._now | moment("DD/MM/YYYY HH:mm")}}</td>
                </tr>
              </tbody>
            </table>
            <b-pagination
              :total-rows="totalItems"
              :per-page="10"
              v-model="currentPage"
              v-on:input="getUsers"
              align="center"
              prev-text="Anterior"
              next-text="Próxima"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "./../service";
import Router from "vue-router";

export default {
  name: "users",
  data: function () {
    return {
      users: [],
      currentPage: 1,
      totalItems: 1,
      showError: false
    };
  },
  methods: {
    getUsers() {
      let filter = {};
      filter.currentPage = this.currentPage;
      service.getUsers(filter).then(
        response => {
          this.users = response.users.users;
          this.totalItems = response.users.totalItems;
        },
        () => {
          this.showError = true;
        }
      );
    },
  },
  created: function () {
    this.getUsers();
  },
};
</script>

<style>
body{
  background-color: #ffffff;
  background-image: url('../images/bg-login.svg');
  background-attachment: fixed;
  background-size: cover;
}
</style>
