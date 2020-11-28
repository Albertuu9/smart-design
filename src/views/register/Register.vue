<template>
  <div class="d-flex">
    <div class="image-wrapper"></div>
    <div class="d-flex flex-column content-wrapper">
      <div
        class="header-register-wrapper d-flex align-center justify-space-between"
      >
        <div class="d-flex flex-row pb-4">
          <span class="main-logo pr-3">SD</span>
          <span class="main-title">SMARTDESIGN</span>
        </div>
        <div>
          <LanguageSelectorComponent class="mt-2" />
        </div>
      </div>
      <div class="register-wrapper d-flex mt-3">
        <form class="form-wrapper d-flex flex-column">
          <div class="d-flex align-center">
            <h4>
              {{ $t('register-page.title') }}
            </h4>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  color="info"
                  class="pl-1 cpointer"
                  >mdi-information</v-icon
                >
              </template>
              <span>Haz click para ver las ventajas de registrarse</span>
            </v-tooltip>
          </div>
          <div class="mt-5 d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Nombre*</label>
              <v-text-field
                v-model="name"
                class="pt-1 pr-2"
                :error-messages="nameErrors"
                required
                single-line
                outlined
                dense
                placeholder="Introduce tu nombre"
                color="success"
                :filled="!nameIsTouched"
                @input="$v.name.$touch()"
                @focus="nameIsTouched = true"
                @blur="
                  $v.name.$touch();
                  nameIsTouched = false;
                "
              ></v-text-field>
            </div>
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Apellidos</label>
              <v-text-field
                class="pt-1"
                v-model="surname"
                placeholder="Introduce tus apellidos"
                single-line
                outlined
                dense
                :filled="!surnameIsTouched"
                @focus="surnameIsTouched = true"
                @blur="surnameIsTouched = false"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>País*</label>
              <v-autocomplete
                class="pt-1 pr-2"
                return-object
                single-line
                dense
                outlined
                clearable
                placeholder="Selecciona tu país"
                item-text="name"
                v-model="country"
                :error-messages="countryErrors"
                :items="countries"
                :filled="!countryIsTouched"
                :filter="customFilter"
                @input="$v.country.$touch()"
                @focus="countryIsTouched = true"
                @blur="
                  $v.country.$touch();
                  countryIsTouched = false;
                "
              >
                <template class="countries-wrapper" v-slot:item="{ item }">
                  <img width="40" class="pr-2" :src="item.flag" />
                  <span>{{ item.name }}</span>
                </template>
              </v-autocomplete>
            </div>
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Tipo de usuario*</label>
              <v-select
                class="pt-1"
                return-object
                single-line
                dense
                outlined
                clearable
                placeholder="Selecciona tipo de usuario"
                item-text="text"
                v-model="user"
                :error-messages="userTypeErrors"
                :items="userTypes"
                :filled="!userTypeIsTouched"
                @input="$v.user.$touch()"
                @focus="userTypeIsTouched = true"
                @blur="
                  $v.user.$touch();
                  userTypeIsTouched = false;
                "
              >
              </v-select>
            </div>
          </div>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Correo electrónico*</label>
              <v-text-field
                v-model="email"
                class="pt-1 pr-2"
                :error-messages="emailErrors"
                required
                single-line
                outlined
                dense
                placeholder="Introduce tu correo electrónico"
                :filled="!emailIsTouched"
                color="success"
                @input="$v.email.$touch()"
                @focus="emailIsTouched = true"
                @blur="
                  $v.email.$touch();
                  emailIsTouched = false;
                "
              ></v-text-field>
            </div>
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Contraseña*</label>
              <v-text-field
                class="pt-1"
                v-model="password"
                :error-messages="passwordErrors"
                placeholder="Introduce tu contraseña"
                required
                single-line
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :filled="!passIsTouched"
                @click:append="showPassword = !showPassword"
                @input="$v.password.$touch()"
                @focus="passIsTouched = true"
                @blur="
                  $v.password.$touch();
                  passIsTouched = false;
                "
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>Avatar</label>
              <div class="d-flex align-center justify-space-between">
                <v-radio-group
                  v-model="haveAvatar"
                  color="success"
                  mandatory
                  row
                >
                  <v-radio
                    color="success"
                    label="Sin avatar"
                    :value="1"
                  ></v-radio>
                  <v-radio
                    color="success"
                    label="Con avatar"
                    :value="2"
                  ></v-radio>
                </v-radio-group>
                <v-btn v-if="haveAvatar === 2" color="success" small>
                  <v-icon small class="pr-2">mdi-drama-masks</v-icon>
                  <span class="text-capitalize">Seleccionar avatar</span>
                </v-btn>
              </div>
            </div>
          </div>
          <v-btn
            large
            dense
            block
            class="mr-4 mt-3 mb-4 text-capitalize"
            color="success"
            @click="submit"
          >
            Regístrate
          </v-btn>
          <v-btn
            large
            dense
            block
            dark
            class="mr-4 mt-3 mb-4 text-capitalize"
            :color="'#cccccc'"
          >
            Acceder como invitado
          </v-btn>
          <div class="d-flex justify-center">
            <small>O regístrate con</small>
          </div>
          <v-btn
            large
            dense
            block
            class="mr-4 mt-4 mb-5 text-capitalize"
            color="white"
          >
            <img src="./../../assets/img/btn-google-sign-in.svg" />
            <span>Google</span>
          </v-btn>
          <div class="d-flex footer-text align-center justify-center">
            <small
              >¿Ya tienes una cuenta?
              <b class="cpointer text" @click="$router.push('/login')"
                >Acceder</b
              ></small
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength, email } from "vuelidate/lib/validators";
import LanguageSelectorComponent from "./../../components/shared/language-selector/LanguageSelectorComponent";
import ServicesRegister from "./../../services/register/services";
export default {
  mixins: [validationMixin],
  components: {
    LanguageSelectorComponent,
  },
  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    country: { required },
    user: { required },
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    surname: "",
    country: "",
    user: "",
    countries: [],
    haveAvatar: 1,
    userTypes: [
      {
        id: 1,
        text: "Particular",
      },
      {
        id: 2,
        text: "Empresa",
      },
    ],
    emailIsTouched: null,
    countryIsTouched: null,
    userTypeIsTouched: null,
    passIsTouched: null,
    nameIsTouched: null,
    surnameIsTouched: null,
    showPassword: false,
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("El nombre es requerido.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("La longitud mínima es de 8 caracteres");
      !this.$v.password.required && errors.push("La contraseña es requerida.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.required && errors.push("El país es requerido.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Debe ser un correo válido");
      !this.$v.email.required &&
        errors.push("El correo electrónico es requerido");
      return errors;
    },
    userTypeErrors() {
      const errors = [];
      if (!this.$v.user.$dirty) return errors;
      !this.$v.user.required && errors.push("Selecciona un tipo de usuario.");
      return errors;
    },
  },
  created() {
    this.getCountries();
  },
  methods: {
    submit() {
      console.log("sssss", this.surname);
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.name = "";
      this.email = "";
      this.country = "";
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    // services
    getCountries() {
      ServicesRegister.getCountries()
        .then((response) => {
          this.countries = response.data;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.register-wrapper {
  height: calc(100vh - 110px);
}
.form-wrapper {
  margin: 0 auto;
  margin-top: 20px;
  width: 95%;
}
.header-register-wrapper {
  margin: 0 auto;
  height: 90px;
  width: 95%;
}
.mandatory-wrapper {
  width: 100%;
}
.image-wrapper {
  background-image: url("../../assets/img/fondo1.jpg");
  background-size: cover;
  background-position: center;
  width: 60%;
  height: 100vh;

  @media only screen and (max-width: 1300px) {
    width: 40%;
  }
}
.content-wrapper {
  width: 40%;
  @media only screen and (max-width: 1300px) {
    width: 60%;
  }
}
.v-select .countries-wrapper {
  width: 460px;
}
.v-alert small {
  color: white !important;
}
.footer-text {
  height: 10%;
}
</style>