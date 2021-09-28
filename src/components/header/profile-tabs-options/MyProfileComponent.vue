<template>
  <div class="d-flex flex-column content-wrapper">
    <div class="register-wrapper d-flex">
      <SpinnerPlatform v-if="spinner"/>
      <div class="form-wrapper" v-if="!spinner">
        <form class="d-flex flex-column" @submit.prevent>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label class="input-label">{{ $t("register_page.required_name") }}</label>
              <v-text-field
                v-model="name"
                autocomplete="off"
                class="pt-1 pr-2"
                :error-messages="nameErrors"
                required
                single-line
                outlined
                dense
                :color="'#02bb8ccc'"
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
              <label class="input-label">{{ $t("register_page.surname") }}</label>
              <v-text-field
                class="pt-1"
                v-model="surname"
                autocomplete="off"
                :placeholder="$t('register_page.surname_placeholder')"
                single-line
                outlined
                dense
                :color="'#02bb8ccc'"
                :filled="!surnameIsTouched"
                @focus="surnameIsTouched = true"
                @blur="surnameIsTouched = false"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="d-flex flex-column mandatory-wrapper">
              <label class="input-label">{{ $t("register_page.required_country") }}</label>
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
                :color="'#02bb8ccc'"
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
              <label class="input-label">{{ $t("register_page.required_user_type") }}</label>
              <v-select
                class="pt-1"
                return-object
                single-line
                dense
                outlined
                clearable
                item-text="text"
                item-value="id"
                v-model="user"
                :color="'#02bb8ccc'"
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
              <label class="input-label">{{ $t("register_page.required_email") }}</label>
              <v-text-field
                v-model="email"
                class="pt-1"
                autocomplete="off"
                :error-messages="emailErrors"
                required
                single-line
                outlined
                dense
                :placeholder="$t('register_page.email_placeholder')"
                :filled="!emailIsTouched"
                :color="'#02bb8ccc'"
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
            <v-btn
              class="ml-2"
              @click="updateUser()"
              dark
              :color="'#02bb8ccc'"
              small
            >
              {{ $t("generic.save") }}
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
import ServicesRegister from "./../../../services/register/services";
// components
import SpinnerPlatform from "./../../shared/spinner/SpinnerPlatform";

export default {
  mixins: [validationMixin],
  components:{
    SpinnerPlatform
  },
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
    userData() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    updateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.updateUserInfo();
      }
    },
    loadData() {
      this.getCountries();
      this.loadUserTypes();
      this.loadUserData();
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
    loadUserData() {
      this.email = this.userData.email;
      this.name = this.userData.name;
      this.surname = this.userData.surname;
      this.country = this.userData.country.toLowerCase();
      this.user = this.userData.userType;
    },
    // services
    getCountries() {
      this.spinner = true;
      ServicesUtil.getCountries()
        .then((response) => {
          this.spinner = false;
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
    updateUserInfo() {
      let payload = {
        id: this.userData._id,
        name: this.name,
        surname: this.surname,
        userType: this.user.id ? this.user.id : this.userData.userType,
        email: this.email,
      };
      if(this.country.alpha2Code) {
        payload.country = this.country.alpha2Code;
      } else {
        payload.country = this.country;
      }
      ServicesRegister.updateUserInfo(payload).then((response) => {
        if (response.data.code === 200) {
          // fill user data
          let user = {
            avatar: response.data.user[0].avatar,
            country: response.data.user[0].country,
            email: response.data.user[0].email,
            isPremium: response.data.user[0].isPremium,
            name: response.data.user[0].name,
            role: response.data.user[0].role,
            surname: response.data.user[0].surname,
            userType: response.data.user[0].userType,
            _id: response.data.user[0]._id
          }
          this.$store.commit("setUser", user);
          this.$toast.success(this.$t("my_profile_options.general_info.update_success"));
        } else {
          switch(response.data.code) {
            case 401:
              this.$toast.error(this.$t("generic.token_not_valid"));
            break;
            case 409:
              this.$toast.error(this.$t("register_page.error_email_exists"));
            break;
            case 500:
              this.$toast.error(this.$t("my_profile_options.general_info.update_failed"));
            break;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-wrapper {
  margin: 0 auto;
  margin-top: 20px;
  width: 95%;
  height: 380px;
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
.footer {
  position: absolute;
  bottom: -30px;
  right: 20px;
}
</style>
