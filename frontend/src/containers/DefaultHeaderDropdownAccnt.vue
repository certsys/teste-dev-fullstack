<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header" style="margin-right: 30px !important;">
      <span style="margin-right: 30px !important;"><i class="fa fa-user" /> {{me.username}}</span>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Configurações</strong>
      </b-dropdown-header>
      <b-dropdown-item v-on:click="logout"><i class="fa fa-lock"/> Sair</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import service from "./../service";
import Router from "vue-router";
import Vue from "vue";

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      me: {},
      showError: false
    }
  },
  methods: {
    logout() {
      service.logout();
    },
    getMe: function() {
      service.getMe().then(
        response => {
          this.me = response;
        },
        () => {
          this.showError = true;
        }
      );
    }
  },
  created: function(){
    this.getMe();
  }
}
</script>
