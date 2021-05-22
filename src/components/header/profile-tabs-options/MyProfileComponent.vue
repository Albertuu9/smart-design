<template>
  <div class="d-flex flex-column content-wrapper">
    <div class="register-wrapper d-flex">
      <div class="form-wrapper">
        <form class="d-flex flex-column" @submit.prevent>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>{{ $t("register_page.required_name") }}</label>
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
              <label>{{ $t("register_page.surname") }}</label>
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
              <label>{{ $t("register_page.required_country") }}</label>
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
              <label>{{ $t("register_page.required_user_type") }}</label>
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
                  <span>{{ $t("inData." + item.text) }}</span>
                </template>
              </v-select>
            </div>
          </div>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label>{{ $t("register_page.required_email") }}</label>
              <v-text-field
                v-model="email"
                class="pt-1"
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
          </div>
          <div class="footer">
            <v-btn class="ml-2" dark :color="'#5cb85ccc'" small>
              {{ $t("generic.save&exit") }}
            </v-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
// services
import ServicesUtil from "./../../../services/shared/services";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    country: { required },
    user: { required },
  },

  data: () => ({
    name: "",
    email: "",
    surname: "",
    country: "",
    user: "",
    countries: [],
    text: "",
    userTypes: [],
    emailIsTouched: null,
    countryIsTouched: null,
    userTypeIsTouched: null,
    nameIsTouched: null,
    surnameIsTouched: null,
    spinner: false,
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required &&
        errors.push(this.$t("register_page.error_name"));
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.required &&
        errors.push(this.$t("register_page.error_country"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      let promises = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.$t("register_page.error_email"));
      !this.$v.email.required &&
        errors.push(this.$t("register_page.error_email_invalid"));

      return errors;
    },
    userTypeErrors() {
      const errors = [];
      if (!this.$v.user.$dirty) return errors;
      !this.$v.user.required &&
        errors.push(this.$t("register_page.error_user_type"));
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
            this.$toast.error(this.$t("register_page.error_email_exists"));
          } else {
            this.saveNewUser();
          }
        });
      }
    },
    loadData() {
      this.getCountries();
      this.loadUserTypes();
    },
    loadUserTypes() {
      this.userTypes = [
        {
          id: 1,
          text: "particular",
        },
        {
          id: 2,
          text: "business",
        },
      ];
    },
    countriesFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    // services
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
      //   return ServicesRegister.checkMailExists(payload);
    },
    saveNewUser() {
      let payload = {
        name: this.name,
        surname: this.surname,
        country: this.country,
        userType: this.user.text,
        email: this.email,
        password: this.password,
        avatar: this.avatar,
      };
      //   ServicesRegister.saveNewUser(payload).then((response) => {
      //     if (response.data.code === 200) {
      //       this.spinner = false;
      //       this.$toast.success(this.$t('register_page.success_sign_up'));
      //       this.saveLoginData(response);
      //     } else {
      //       this.spinner = false;
      //       this.$toast.error(
      //         this.$t('register_page.error_sign_up')
      //       );
      //     }
      //   });
    },
  },
};
</script>
<style lang="scss" scoped>
.register-wrapper {
  height: 550px;
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
.content-wrapper {
  width: 100%;
}
.v-select .countries-wrapper {
  width: 460px;
}
.v-alert small {
  color: white !important;
}
.footer{
    position: absolute;
    bottom: 15px;
    right: 20px;
}
</style>
