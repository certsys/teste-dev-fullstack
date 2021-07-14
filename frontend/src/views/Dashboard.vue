<template>
  <div class="animated fadeIn">
     <!-- MODAL DELETE PROPERTY -->
    <b-modal
      v-if="modalDeletePropertyShow"
      v-model="modalDeletePropertyShow"
      title="Deletar Imóvel"
      hide-footer
      size="md"
    >
      <div class="row">
        <div class="col-lg-12">
          <span>
            <b>{{propertyToDelete.title}}</b>
          </span>
          <br />
          <span>Você tem certeza que deseja deletar este imóvel?</span>
          <br />
          <br />
          <div class="row">
            <div class="col-lg-12 text-right">
              <b-button @click="modalDeletePropertyShow=false; propertyToDelete=undefined;">Cancelar</b-button>
              <b-button @click="deleteProperty" class="ml-2" type="submit" variant="primary">Deletar</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- MODAL EDIT PROPERTY -->
    <b-modal
      v-if="modalEditPropertyShow"
      v-model="modalEditPropertyShow"
      title="Editar Imóvel"
      hide-footer
      size="md"
    >
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onEdit)">
          <div class="row">
            <div class="col-lg-6">
              <validation-provider
                name="Título"
                rules="required|alpha_spaces|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Title-Group" label="Título" label-for="TitleInput">
                  <b-form-input
                    id="TitleInput"
                    name="TitleInput"
                    type="text"
                    maxlength="20"
                    v-model="editForm.title"
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
                    v-model="editForm.description"
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
                    v-model="editForm.price"
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
                    v-model="editForm.area"
                    :state="getValidationState(validationContext)"
                    aria-describedby="AreaInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="AreaInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Bairro"
                rules="required|alpha_spaces|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Neighborhood-Group" label="Bairro" label-for="NeighborhoodInput">
                  <b-form-input
                    id="NeighborhoodInput"
                    name="NeighborhoodInput"
                    type="text"
                    maxlength="20"
                    v-model="editForm.neighborhood"
                    :disabled="autoFillAddressEdit"
                    :state="getValidationState(validationContext)"
                    aria-describedby="NeighborhoodInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="NeighborhoodInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="UF" rules="required|alpha:2" v-slot="validationContext">
                <b-form-group id="Uf-Group" label="UF" label-for="UfInput">
                  <b-form-input
                    id="UfInput"
                    name="UfInput"
                    type="text"
                    maxlength="2"
                    v-model="editForm.uf"
                    :disabled="autoFillAddressEdit"
                    :state="getValidationState(validationContext)"
                    aria-describedby="UfInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="UfInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>
            <div class="col-lg-6">
              <validation-provider name="CEP" rules="required:9" v-slot="validationContext">
                <b-form-group id="Cep-Group" label="CEP" label-for="CepInput">
                  <b-form-input
                    id="CepInput"
                    name="CepInput"
                    type="text"
                    maxlength="9"
                    v-mask="'#####-###'"
                    v-model="editForm.cep"
                    :state="getValidationState(validationContext)"
                    aria-describedby="CepInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="CepInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Endereço"
                rules="required|min:3|max:50"
                v-slot="validationContext"
              >
                <b-form-group id="Address-Group" label="Endereço" label-for="AreaInput">
                  <b-form-input
                    id="AddressInput"
                    name="AddressInput"
                    type="text"
                    maxlength="30"
                    v-model="editForm.address"
                    :disabled="autoFillAddressEdit"
                    :state="getValidationState(validationContext)"
                    aria-describedby="AddressInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="AddressInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Número" rules="required" v-slot="validationContext">
                <b-form-group id="Number-Group" label="Número" label-for="NumberInput">
                  <b-form-input
                    id="NumberInput"
                    name="NumberInput"
                    type="number"
                    min="1"
                    v-model="editForm.number"
                    :state="getValidationState(validationContext)"
                    aria-describedby="NumberInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback
                    id="NumberInput-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Complemento" rules="max:15" v-slot="validationContext">
                <b-form-group
                  id="additionalAddress-Group"
                  label="Complemento"
                  label-for="additionalAddressInput"
                >
                  <b-form-input
                    id="additionalAddressInput"
                    name="additionalAddressInput"
                    type="text"
                    v-model="editForm.additionalAddress"
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
                rules="required|alpha_spaces|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="City-Group" label="Cidade" label-for="CityInput">
                  <b-form-input
                    id="CityInput"
                    name="CityInput"
                    type="text"
                    maxlength="20"
                    v-model="editForm.city"
                    :disabled="autoFillAddressEdit"
                    :state="getValidationState(validationContext)"
                    aria-describedby="CityInput-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="CityInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>
            <div class="col-lg-12 text-right">
              <b-button @click="modalEditPropertyShow=false; resetEditForm()">Cancelar</b-button>
              <b-button class="ml-2" type="submit" variant="primary">Salvar</b-button>
            </div>
          </div>
        </form>
      </validation-observer>
    </b-modal>
    <!-- MODAL PROPERTY INFO -->
    <b-modal
      v-if="modalInfoShow"
      v-model="modalInfoShow"
      @close="modalInfoShow = false"
      @hide="modalInfoShow = false"
      title="Detalhes do Imóvel"
      hide-footer
      size="md"
    >
      <div class="row">
        <div class="col-lg-12">
          <span>
            <b>Proprietário:</b>
            {{currentProperty.user.username}}
          </span>
          <br />
          <span>
            <b>Imóvel:</b>
            {{currentProperty.title}}
          </span>
          <br />
          <span>
            <b>Valor:</b>
            R${{formatPrice(currentProperty.price)}}
          </span>
          <br />
          <span>
            <b>Área:</b>
            {{currentProperty.area}} m²
          </span>
          <br />
          <span>
            <b>CEP:</b>
            {{currentProperty.cep}}
          </span>
          <br />
          <span>
            <b>Endereço:</b>
            {{currentProperty.address}} - {{currentProperty.number}} - {{currentProperty.additionalAddress}}
          </span>
          <br />
          <span>
            <b>Bairro:</b>
            {{currentProperty.neighborhood}}
          </span>
          <br />
          <span>
            <b>Cidade:</b>
            {{currentProperty.city}}
          </span>
          <br />
          <span>
            <b>UF:</b>
            {{currentProperty.uf}}
          </span>
          <br />
          <span>
            <b>Descrição:</b>
            {{currentProperty.description}}
          </span>
          <br />
          <div class="row">
            <div class="col-lg-12 text-right">
              <b-button
                @click="modalInfoShow=false; currentProperty=undefined"
              >Fechar</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- MODAL ADD PROPERTY -->
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
                rules="required|alpha_spaces|max:20|min:3"
                v-slot="validationContext"
              >
                <b-form-group id="Title-Group" label="Título" label-for="TitleInput">
                  <b-form-input
                    id="TitleInput"
                    name="TitleInput"
                    type="text"
                    maxlength="20"
                    v-model="form.title"
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
                rules="required|alpha_spaces|max:20|min:3"
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
              <validation-provider name="UF" rules="required|alpha:2" v-slot="validationContext">
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

                  <b-form-invalid-feedback id="UfInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>
            <div class="col-lg-6">
              <validation-provider name="CEP" rules="required:9" v-slot="validationContext">
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
                rules="required|min:3|max:50"
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
              <validation-provider name="Número" rules="required" v-slot="validationContext">
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
              <validation-provider name="Complemento" rules="max:15" v-slot="validationContext">
                <b-form-group
                  id="additionalAddress-Group"
                  label="Complemento"
                  label-for="additionalAddressInput"
                >
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
                rules="required|alpha_spaces|max:20|min:3"
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

                  <b-form-invalid-feedback id="CityInput-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
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
              <thead class="text-center">
                <tr>
                  <th>Data</th>
                  <th>Título</th>
                  <th>Valor</th>
                  <th>Endereço / Nº / Compl.</th>
                  <th>Cidade</th>
                  <th>Gerenciar</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="property in properties" v-bind:key="property._id">
                  <td>{{property.publicationDate | moment("DD/MM/YYYY HH:mm")}}</td>
                  <td>{{property.title}}</td>
                  <td>R${{formatPrice(property.price)}}</td>
                  <td>{{property.address}} - {{property.number}} - {{property.additionalAddress}}</td>
                  <td>{{property.city}}</td>
                  <td width="150" class="text-center">
                    <button
                      :disabled="me.userId != property.user.userId"
                      class="btn btn-primary"
                      type="button"
                      @click="modalEditPropertyShow = true; editInfo(property);"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button
                      :disabled="me.userId != property.user.userId"
                      class="btn btn-danger ml-2"
                      type="button"
                      @click="modalDeletePropertyShow=true; propertyToDelete=property;"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="modalInfoShow = true; currentProperty = property;"
                    >
                      <i class="fa fa-info-circle"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <b-pagination
              :total-rows="totalItems"
              :per-page="10"
              v-model="currentPage"
              v-on:input="getProperties"
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
import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import isEqual from 'lodash.isequal';

export default {
  name: "dashboard",
  data: function() {
    return {
      properties: [],
      me: {},
      currentProperty: undefined,
      currentPage: 1,
      totalItems: 1,
      startDate: null,
      endDate: null,
      modalAddPropertyShow: false,
      modalInfoShow: false,
      modalEditPropertyShow: false,
      modalDeletePropertyShow: false,
      autoFillAddress: true,
      autoFillAddressEdit: false,
      propertyToEdit: undefined,
      propertyToDelete: undefined,
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
      },
      editForm: undefined,
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
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      };
      this.autoFillAddress = false;
    },
    editInfo(property) {
      this.propertyToEdit = JSON.parse(JSON.stringify(property));
      this.editForm = JSON.parse(JSON.stringify(property));
    },
    resetEditForm() {
      this.editForm = undefined;
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
      ) {
        this.registerProperty();
      }
    },
    registerProperty() {
      console.log("register");
      service
        .registerProperty({
          propertyData: {
            title: this.form.title,
            description: this.form.description,
            price: parseInt(this.form.price),
            area: parseInt(this.form.area),
            address: this.form.address,
            number: this.form.number,
            additionalAddress: this.form.additionalAddress,
            neighborhood: this.form.neighborhood,
            cep: this.form.cep,
            city: this.form.city,
            uf: this.form.uf
          }
        })
        .then(result => {
          this.modalAddPropertyShow = false;
          Vue.toasted.success(result.message, {
            icon: {
              name: "check-circle"
            },
            duration: "5000",
            position: "bottom-right"
          });
          this.resetForm();
          this.getProperties();
        })
        .catch(error => {
          if (error && error.message) {
            Vue.toasted.error(error.message, {
              icon: {
                name: "exclamation"
              },
              duration: "5000",
              position: "bottom-right"
            });
          }
        });
    },
    getProperties() {
      let filter = {};
      filter.currentPage = this.currentPage;
      filter.startDate = this.startDate;
      filter.endDate = this.endDate;
      service.getProperties(filter).then(
        response => {
          this.properties = response.properties.properties;
          this.totalItems = response.properties.totalItems;
        },
        () => {
          this.showError = true;
        }
      );
    },
    getMe() {
      service.getMe().then(
        response => {
          this.me = response;
        }
      );
    },
    onEdit() {
      if(isEqual(this.propertyToEdit, this.editForm)
      ) {
        Vue.toasted.show("Nenhuma informação alterada!", {
          icon: {
            name: "exclamation",
          },
          className: "warning",
          duration: "5000",
          position: "bottom-right",
        });
      } else {
        this.editProperty();
      }
    },
    editProperty(){
      service
        .editProperty({
          updateData: this.editForm
        })
        .then((result) => {
          this.modalEditPropertyShow = false;
          Vue.toasted.success(result.message, {
            icon: {
              name: "check-circle",
            },
            duration: "5000",
            position: "bottom-right",
          });
          this.resetEditForm();
          this.getProperties();
        })
        .catch((error) => {
          if (error && error.message) {
            Vue.toasted.error(error.message, {
              icon: {
                name: "exclamation",
              },
              duration: "5000",
              position: "bottom-right",
            });
          }
        });
    },
    deleteProperty() {
      service
        .deleteProperty(this.propertyToDelete._id)
        .then((result) => {
          this.modalDeletePropertyShow = false;
          Vue.toasted.success(result.message, {
            icon: {
              name: "check-circle",
            },
            duration: "5000",
            position: "bottom-right",
          });
          this.getProperties();
        })
        .catch((error) => {
          if (error && error.message) {
            Vue.toasted.error(error.message, {
              icon: {
                name: "exclamation",
              },
              duration: "5000",
              position: "bottom-right",
            });
          }
        });
    }
  },
  computed: {
    cep() {
      return this.form.cep;
    },
    editCep() {
      if(this.editForm){
        return this.editForm.cep;
      } else {
        return "";
      }
    }
  },
  watch: {
    cep(val) {
      if (val && val.length == 9) {
        service
          .searchCep(val)
          .then(result => {
            if (!result.erro) {
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
        if (this.autoFillAddress) {
          this.form.address = null;
          this.form.neighborhood = null;
          this.form.city = null;
          this.form.uf = null;
          this.autoFillAddress = false;
        }
      }
    },
    editCep(val) {
      if (val && val.length == 9) {
        service
          .searchCep(val)
          .then(result => {
            if (!result.erro) {
              this.autoFillAddressEdit = true;
              this.editForm.address = result.logradouro;
              this.editForm.neighborhood = result.bairro;
              this.editForm.city = result.localidade;
              this.editForm.uf = result.uf;
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
        if (this.autoFillAddressEdit) {
          this.editForm.address = null;
          this.editForm.neighborhood = null;
          this.editForm.city = null;
          this.editForm.uf = null;
          this.autoFillAddressEdit = false;
        }
      }
    }
  },
  created: function() {
    this.getProperties();
    this.getMe();
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

.warning {
  background-color: #f9b115 !important;
}
</style>
