<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Imóveis</div>
          <div class="card-body">
            <table class="table table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
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
  name: "dashboard",
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
