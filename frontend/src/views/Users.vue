<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Usuários</div>
          <div class="card-body">
            <table class="table table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Email</th>
                  <th>Gerenciar</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Anterior</a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Próxima</a>
              </li>
            </ul>
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
      properties: []
    };
  },
  methods: {
    
  },
  created: function () {
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
