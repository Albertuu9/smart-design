<template>
  <div class="d-flex first-wrapper">
    <ModalComponent
      v-if="avatarModalObject.open"
      v-model="avatarModalObject.open"
      :width="avatarModalObject.width"
      :height="avatarModalObject.height"
      :title="$t('inData.select_avatar')"
      :icon="avatarModalObject.icon"
      :type="avatarModalObject.type"
      @emitData="getAvatarSelected"
    />
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
      <div class="register-wrapper d-flex">
        <div class="form-wrapper">
          <form class="d-flex flex-column" @submit.prevent>
            <div class="d-flex flex-row align-center justify-space-between">
              <div class="d-flex flex-column mandatory-wrapper">
                <label>{{ $t('register_page.required_name') }}</label>
                <v-text-field
                  v-model="name"
                  class="pt-1 pr-2"
                  :error-messages="nameErrors"
                  required
                  single-line
                  outlined
                  dense
                  :color="'#5cb85ccc'"
                  :placeholder="$t('register_page.name_placeholder')"
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
                <label>{{ $t('register_page.surname') }}</label>
                <v-text-field
                  class="pt-1"
                  v-model="surname"
                  :placeholder="$t('register_page.surname_placeholder')"
                  single-line
                  outlined
                  dense
                  :color="'#5cb85ccc'"
                  :filled="!surnameIsTouched"
                  @focus="surnameIsTouched = true"
                  @blur="surnameIsTouched = false"
                ></v-text-field>
              </div>
            </div>
            <div class="d-flex flex-row align-center justify-space-between">
              <div class="d-flex flex-column mandatory-wrapper">
                <label>{{ $t('register_page.required_country') }}</label>
                <v-autocomplete
                  class="pt-1 pr-2"
                  return-object
                  single-line
                  dense
                  outlined
                  clearable
                  item-text="name"
                  item-value="alpha2Code"
                  v-model="country"
                  :color="'#5cb85ccc'"
                  :placeholder="$t('register_page.country_placeholder')"
                  :error-messages="countryErrors"
                  :items="countries"
                  :filled="!countryIsTouched"
                  :filter="countriesFilter"
                  @input="$v.country.$touch()"
                  @focus="countryIsTouched = true"
                  @blur="
                    $v.country.$touch();
                    countryIsTouched = false;
                  "
                >
                  <template class="countries-wrapper" v-slot:item="{ item }">
                    <img width="30" class="pr-2" :src="item.flag" />
                    <span>{{ item.name }}</span>
                  </template>
                </v-autocomplete>
              </div>
              <div class="d-flex flex-column mandatory-wrapper">
                <label>{{ $t('register_page.required_user_type') }}</label>
                <v-select
                  class="pt-1"
                  return-object
                  single-line
                  dense
                  outlined
                  clearable
                  item-text="text"
                  v-model="user"
                  :color="'#5cb85ccc'"
                  :placeholder="$t('register_page.user_type_placeholder')"
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
                <template v-slot:item="{ item }">
                  <span>{{ $t('inData.' + item.text) }}</span>
                </template>
                </v-select>
              </div>
            </div>
            <div class="d-flex flex-row align-center justify-space-between">
              <div class="d-flex flex-column mandatory-wrapper">
                <label>{{ $t('register_page.required_email') }}</label>
                <v-text-field
                  v-model="email"
                  class="pt-1 pr-2"
                  :error-messages="emailErrors"
                  required
                  single-line
                  outlined
                  dense
                  :placeholder="$t('register_page.email_placeholder')"
                  :filled="!emailIsTouched"
                  :color="'#5cb85ccc'"
                  @input="$v.email.$touch()"
                  @focus="emailIsTouched = true"
                  @blur="
                    $v.email.$touch();
                    emailIsTouched = false;
                  "
                ></v-text-field>
              </div>
              <div class="d-flex flex-column mandatory-wrapper">
                <label>{{ $t('register_page.required_password') }}</label>
                <v-text-field
                  class="pt-1"
                  v-model="password"
                  :error-messages="passwordErrors"
                  required
                  single-line
                  outlined
                  dense
                  :color="'#5cb85ccc'"
                  :placeholder="$t('register_page.password_placeholder')"
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
                <label>{{ $t('register_page.avatar') }}</label>
                <div class="d-flex align-center justify-space-between">
                  <v-radio-group
                    v-model="haveAvatar"
                    :color="'#5cb85ccc'"
                    mandatory
                    row
                  >
                    <v-radio
                      :color="'#5cb85ccc'"
                      :label="$t('register_page.with_avatar')"
                      :value="1"
                    ></v-radio>
                    <v-radio
                      :color="'#5cb85ccc'"
                      :label="$t('register_page.without_avatar')"
                      :value="2"
                    ></v-radio>
                  </v-radio-group>
                  <v-btn
                    @click="avatarModalObject.open = true"
                    dark
                    v-if="haveAvatar === 2"
                    :color="'#5cb85ccc'"
                    small
                  >
                    <v-icon small class="pr-2">mdi-drama-masks</v-icon>
                    <span v-if="!avatar" class="text-capitalize"
                      >{{ $t('register_page.select_avatar') }}</span
                    >
                    <span v-else class="text-capitalize">{{ $t('register_page.change_avatar') }}</span>
                  </v-btn>
                </div>
              </div>
            </div>
            <p v-if="text">{{ text }}</p>
            <v-btn
              large
              dense
              block
              dark
              class="mr-4 mt-3 mb-4 text-capitalize register-btn"
              :color="'#5cb85ccc'"
              :disabled="spinner"
              @click="saveUser()"
            >
              <span v-if="!spinner">{{ $t('register_page.sign_up_btn') }}</span>
              <span v-else class="d-flex align-center">
                <v-icon small class="pr-2">mdi mdi-loading mdi-spin</v-icon>
                <span>{{ $t('register_page.sign_up_btn_blocked') }}</span>
              </span>
            </v-btn>
            <v-btn
              large
              dense
              block
              dark
              class="mr-4 mt-3 mb-4 text-capitalize register-btn"
              :color="'#aaaaaa'"
              @click="loginGuest()"
            >
              {{ $t('register_page.guest_btn') }}
            </v-btn>
            <div class="d-flex justify-center">
              <small>{{ $t('register_page.separator_register_text') }}</small>
            </div>
          </form>
          <div class="rss-btn cpointer" @click="externalLogin('google')">
            <img width="22" src="./../../assets/icons/google.svg" />
            <span class="pl-2">Google</span>
          </div>
          <!-- <div class="rss-btn cpointer" @click="externalLogin('github')">
            <img width="20" src="./../../assets/img/github.png" />
            <span class="pl-2">Github</span>
          </div> -->
          <div class="d-flex footer-text align-center justify-center wrapper-register-text">
            <small
              >{{ $t('register_page.already_account') }}
              <b class="cpointer text" @click="$router.push('/login')"
                >{{ $t('register_page.access') }}</b
              ></small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
// components
import LanguageSelectorComponent from "./../../components/shared/language-selector/LanguageSelectorComponent";
import ModalComponent from "./../../components/shared/modal/ModalComponent";
import GoogleLogin from "vue-google-login";
// services
import ServicesRegister from "./../../services/register/services";
import ServicesShared from "./../../services/shared/services";
import ServicesUtil from "./../../services/shared/services";

export default {
  mixins: [validationMixin],
  components: {
    LanguageSelectorComponent,
    ModalComponent,
    GoogleLogin,
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
    text: "",
    avatar: "",
    avatarModalObject: {
      open: false,
      width: 900,
      height: 900,
      title: "",
      icon: "mdi-drama-masks",
      type: "avatar",
    },
    params: {
      client_id: process.env.VUE_APP_CLIENT_ID,
    },
    haveAvatar: 1,
    userTypes: [],
    emailIsTouched: null,
    countryIsTouched: null,
    userTypeIsTouched: null,
    passIsTouched: null,
    nameIsTouched: null,
    surnameIsTouched: null,
    showPassword: false,
    spinner: false,
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.$t('register_page.error_name'));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push(this.$t('register_page.error_password_length'));
      !this.$v.password.required && errors.push(this.$t('register_page.error_password'));
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.required && errors.push(this.$t('register_page.error_country'));
      return errors;
    },
    emailErrors() {
      const errors = [];
      let promises = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.$t('register_page.error_email'));
      !this.$v.email.required &&
        errors.push(this.$t('register_page.error_email_invalid'));

      return errors;
    },
    userTypeErrors() {
      const errors = [];
      if (!this.$v.user.$dirty) return errors;
      !this.$v.user.required && errors.push(this.$t('register_page.error_user_type'));
      return errors;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    saveUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.spinner = true;
        this.checkMailExists(this.email).then((response) => {
          if (response.data.code === 200) {
            this.$toast.error(
              this.$t('register_page.error_email_exists')
            );
          } else {
            this.saveNewUser();
          }
        });
      }
    },
    loadData() {
      this.getCountries();
      this.getUserIp();
      this.loadUserTypes();
    },
    loadUserTypes(){
      this.userTypes = [
        {
          id: 1,
          text: 'particular'
        },
        {
          id: 2,
          text: 'business'
        }
      ]
    },
    getUserIp() {
      axios.get('http://localhost:8080/?format=json').then((response) => {
        console.log('ressss',response);
      });
      // ServicesRegister.getClientIp().then((response) => {
      //   let ip = response.data.ip;
      //   this.getUserCountryByIp(ip);
      // });
    },
    getUserCountryByIp(ip) {
      let payload = {
        ip: ip,
      };
      ServicesRegister.getUserCountryByIp(payload).then((response) => {
        this.country = response.data.data.country;
      });
    },
    countriesFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    // emit events
    getAvatarSelected(avatar) {
      this.avatar = avatar;
    },
    // services
    externalLogin(param) {
      switch (param) {
        case "github":
          // dev
          window.location.href = "http://localhost:3000/auth/github";
          // prod
          // window.location.href = "https://api.app-smartdesign.com/auth/github";
          break;
        case "google":
          // dev
          window.location.href = "http://localhost:3000/auth/google";
          // prod
          // window.location.href = "https://api.app-smartdesign.com/auth/google";
          break;
      }
    },
    getCountries() {
      ServicesUtil.getCountries()
        .then((response) => {
          this.countries = response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    checkMailExists(email) {
      let payload = {
        email: email,
      };
      return ServicesRegister.checkMailExists(payload);
    },
    saveNewUser() {
      let payload = {
        name: this.name,
        surname: this.surname,
        country: this.country.alpha2Code,
        userType: this.user.text,
        email: this.email,
        password: this.password,
        avatar: this.avatar,
      };
      ServicesRegister.saveNewUser(payload).then((response) => {
        if (response.data.code === 200) {
          this.spinner = false;
          this.$toast.success(this.$t('register_page.success_sign_up'));
          this.saveLoginData(response);
        } else {
          this.spinner = false;
          this.$toast.error(
            this.$t('register_page.error_sign_up')
          );
        }
      });
    },
    loginGuest() {
      ServicesRegister.loginGuest().then((response) => {
        this.saveLoginData(response);
      });
    },
    saveLoginData(response) {
      // save user credentials on localStorage and vuex
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      this.$store.commit("setUser", response.data.user);
      this.$store.commit("setToken", response.data.token);
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="scss" scoped>
.register-wrapper {
  height: calc(100vh - 110px);
  overflow: auto;
}
.first-wrapper{
  overflow-y: hidden;
}
.form-wrapper {
  margin: 0 auto;
  margin-top: 20px;
  width: 85%;
}
.header-register-wrapper {
  margin: 0 auto;
  height: 90px;
  width: 95%;
}
.mandatory-wrapper {
  width: 100%;
}
.register-btn {
  max-height: 44px;
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
  overflow-y: hidden;
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
.google-btn {
  background-color: white;
  width: 100%;
  border: 0.5px solid #dedede;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 6px;
}
.wrapper-register-text > small > b:hover {
  text-decoration: underline;
}
</style>
