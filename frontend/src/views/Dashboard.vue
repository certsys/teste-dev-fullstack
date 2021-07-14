<template>
  <div class="animated fadeIn">
    <b-modal
      v-if="modalAddPropertyShow"
      v-model="modalAddPropertyShow"
      @close="resetForm()"
      @hide="resetForm();"
      title="Cadastrar Imóvel"
      hide-footer
      size="md"
    >
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="row">
            <div class="col-lg-6">
              <validation-provider
                name="Título"
                rules="required|alpha|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Title-Group" label="Título" label-for="TitleInput">
                  <b-form-input
                    id="TitleInput"
                    name="TitleInput"
                    type="text"
                    maxlength="20"
                    v-model="form.name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="TitleInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="TitleInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Descrição"
                rules="required|alpha_spaces|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Description-Group" label="Descrição" label-for="DescriptionInput">
                  <b-form-input
                    id="DescriptionInput"
                    name="DescriptionInput"
                    type="text"
                    maxlength="20"
                    v-model="form.description"
                    :state="getValidationState(validationContext)"
                    aria-describedby="DescriptionInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="DescriptionInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Valor" rules="required" v-slot="validationContext">
                <b-form-group id="Price-Group" label="Valor" label-for="PriceInput">
                  <b-form-input
                    id="PriceInput"
                    name="PriceInput"
                    type="number"
                    min="0"
                    v-model="form.price"
                    :state="getValidationState(validationContext)"
                    aria-describedby="PriceInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="PriceInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Área" rules="required" v-slot="validationContext">
                <b-form-group id="Area-Group" label="Área" label-for="AreaInput">
                  <b-form-input
                    id="AreaInput"
                    name="AreaInput"
                    type="number"
                    min="0"
                    v-model="form.area"
                    :state="getValidationState(validationContext)"
                    aria-describedby="AreaInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="AreaInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Bairro"
                rules="required|alpha|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Neighborhood-Group" label="Bairro" label-for="NeighborhoodInput">
                  <b-form-input
                    id="NeighborhoodInput"
                    name="NeighborhoodInput"
                    type="text"
                    maxlength="20"
                    v-model="form.neighborhood"
                    :disabled="autoFillAddress"
                    :state="getValidationState(validationContext)"
                    aria-describedby="NeighborhoodInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="NeighborhoodInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="UF"
                rules="required|alpha:2"
                v-slot="validationContext"
              >
                <b-form-group id="Uf-Group" label="UF" label-for="UfInput">
                  <b-form-input
                    id="UfInput"
                    name="UfInput"
                    type="text"
                    maxlength="2"
                    v-model="form.uf"
                    :disabled="autoFillAddress"
                    :state="getValidationState(validationContext)"
                    aria-describedby="UfInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="UfInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>
            <div class="col-lg-6">
              <validation-provider
                name="CEP"
                rules="required:9"
                v-slot="validationContext"
              >
                <b-form-group id="Cep-Group" label="CEP" label-for="CepInput">
                  <b-form-input
                    id="CepInput"
                    name="CepInput"
                    type="text"
                    maxlength="9"
                    v-mask="'#####-###'"  
                    v-model="form.cep"
                    :state="getValidationState(validationContext)"
                    aria-describedby="CepInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="CepInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Endereço"
                rules="required|min:3|max:30"
                v-slot="validationContext"
              >
                <b-form-group id="Address-Group" label="Endereço" label-for="AreaInput">
                  <b-form-input
                    id="AddressInput"
                    name="AddressInput"
                    type="text"
                    maxlength="30"
                    v-model="form.address"
                    :disabled="autoFillAddress"
                    :state="getValidationState(validationContext)"
                    aria-describedby="AddressInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="AddressInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Número"
                rules="required"
                v-slot="validationContext"
              >
                <b-form-group id="Number-Group" label="Número" label-for="NumberInput">
                  <b-form-input
                    id="NumberInput"
                    name="NumberInput"
                    type="number"
                    min="1"
                    v-model="form.number"
                    :state="getValidationState(validationContext)"
                    aria-describedby="NumberInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="NumberInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Complemento"
                rules="max:15"
                v-slot="validationContext"
              >
                <b-form-group id="additionalAddress-Group" label="Complemento" label-for="additionalAddressInput">
                  <b-form-input
                    id="additionalAddressInput"
                    name="additionalAddressInput"
                    type="text"
                    v-model="form.additionalAddress"
                    :state="getValidationState(validationContext)"
                    aria-describedby="additionalAddressInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="additionalAddressInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Cidade"
                rules="required|alpha|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="City-Group" label="Cidade" label-for="CityInput">
                  <b-form-input
                    id="CityInput"
                    name="CityInput"
                    type="text"
                    maxlength="20"
                    v-model="form.city"
                    :disabled="autoFillAddress"
                    :state="getValidationState(validationContext)"
                    aria-describedby="CityInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="CityInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>
            <div class="col-lg-12 text-right">
              <b-button @click="resetForm()">Limpar</b-button>
              <b-button class="ml-2" type="submit" variant="primary">Salvar</b-button>
            </div>
          </div>
        </form>
      </validation-observer>
    </b-modal>
    <div class="row">
      <div class="col-lg-12 text-right">
        <button class="btn btn-primary" type="button" @click="modalAddPropertyShow=true;">
          <i class="fa fa-plus"></i> &nbsp;&nbsp;Adicionar Imóvel
        </button>
        <br />
        <br />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Imóveis</div>
          <div class="card-body">
            <table class="table table-responsive-sm table-bordered">
              <thead>
                <tr class="text-center">
                  <th>Data</th>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Endereço / Nº / Compl.</th>
                  <th>Bairro</th>
                  <th>CEP</th>
                  <th>Cidade</th>
                  <th>UF</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="property in properties" v-bind:key="property._id">
                  <td>{{property.publicationDate | moment("DD/MM/YYYY HH:mm")}}</td>
                  <td>{{property.title}}</td>
                  <td>{{property.description}}</td>
                  <td>R${{property.price}}</td>
                  <td>{{property.address}} - {{property.number}} - {{property.additionalAddress}}</td>
                  <td>{{property.neighborhood}}</td>
                  <td>{{variantCep(property.cep)}}</td>
                  <td>{{property.city}}</td>
                  <td>{{property.uf}}</td>
                </tr>
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
import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

export default {
  name: "dashboard",
  data: function() {
    return {
      properties: [],
      currentPage: 1,
      startDate: null,
      endDate: null,
      modalAddPropertyShow: false,
      autoFillAddress: false,
      showError: false,
      form: {
        title: null,
        description: null,
        price: null,
        area: null,
        address: null,
        number: null,
        additionalAddress: null,
        neighborhood: null,
        city: null,
        uf: null
      }
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    variantCep(value) {
      let $variant;
      if (value.length == 8) {
        $variant = value.slice(0, 5) + "-" + value.slice(-3);
      } else if (value.length == 9) {
        $variant = value;
      }
      return $variant;
    },
    resetForm() {
      this.form = {
        title: null,
        description: null,
        price: null,
        area: null,
        address: null,
        number: null,
        additionalAddress: null,
        neighborhood: null,
        city: null,
        uf: null
      }
      this.autoFillAddress = false;
    },
    onSubmit() {
      if (
        this.form.title &&
        this.form.description &&
        this.form.price &&
        this.form.area &&
        this.form.address &&
        this.form.number &&
        this.form.neighborhood &&
        this.form.city &&
        this.form.uf
      ){
        this.registerProperty();
      }
    },
    registerProperty() {
      
    },
    getProperties() {
      let filter = {};
      filter.currentPage = this.currentPage;
      filter.startDate = this.startDate;
      filter.endDate = this.endDate;
      service.getProperties(filter).then(
        response => {
          this.properties = response.properties;
        },
        () => {
          this.showError = true;
        }
      );
    }
  },
  computed: {
    cep() {
      return this.form.cep;
    }
  },
  watch :{
    cep(val){
      if(val && val.length==9){
        service
        .searchCep(val)
        .then(result => {
          if (!result.erro){
            this.autoFillAddress = true;
            this.form.address = result.logradouro;
            this.form.neighborhood = result.bairro;
            this.form.city = result.localidade;
            this.form.uf = result.uf;
          } else {
            Vue.toasted.error("CEP não encontrado!", {
              icon: {
                name: "exclamation"
              },
              duration: "5000",
              position: "bottom-right"
            }); 
          }
        })
        .catch(error => {
          this.showError = true;
        });
      } else {
        if(this.autoFillAddress){
          this.form.address = null;
          this.form.neighborhood = null;
          this.form.city = null;
          this.form.uf = null;
          this.autoFillAddress = false;
        }
      }
    }
  },
  created: function() {
    this.getProperties();
  }
};
</script>

<style>
body {
  background-color: #ffffff;
  background-image: url("../images/bg-login.svg");
  background-attachment: fixed;
  background-size: cover;
}
</style>
