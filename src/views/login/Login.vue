<template>
  <div>
    <ModalComponent
      v-if="recoverPasswordObject.open"
      v-model="recoverPasswordObject.open"
      :width="recoverPasswordObject.width"
      :height="recoverPasswordObject.height"
      :title="recoverPasswordObject.title"
      :icon="recoverPasswordObject.icon"
      :type="recoverPasswordObject.type"
    />
    <div class="header-login-wrapper">
      <div class="float-right pr-5">
        <LanguageSelectorComponent />
      </div>
    </div>
    <div class="login-wrapper d-flex flex-column justify-center align-center">
      <div class="form-wrapper">
        <form @submit.prevent>
          <div class="d-flex flex-row pb-4">
            <span class="main-logo pr-3">SD</span>
            <span class="main-title">SMARTDESIGN</span>
          </div>
          <label>Correo electrónico</label>
          <v-text-field
            v-model="email"
            class="pt-1"
            :error-messages="emailErrors"
            required
            single-line
            outlined
            append-icon="mdi-email"
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
          <label>Contraseña</label>
          <small
            @click="recoverPasswordObject.open = true"
            class="float-right label-remember-pass cpointer"
            >¿Has olvidado tu contraseña?</small
          >
          <v-text-field
            v-model="password"
            class="pt-1"
            :error-messages="passwordErrors"
            placeholder="Introduce tu contraseña"
            required
            type="password"
            single-line
            outlined
            dense
            append-icon="mdi-lock"
            :filled="!passIsTouched"
            @input="$v.password.$touch()"
            @focus="passIsTouched = true"
            @blur="
              $v.password.$touch();
              passIsTouched = false;
            "
          ></v-text-field>

          <v-btn
            large
            dense
            block
            class="mr-4 mt-3 mb-4 text-capitalize"
            color="success"
            @click="submit"
          >
            Iniciar sesión
          </v-btn>
          <div class="d-flex justify-center">
            <small>O inicia sesión con</small>
          </div>
        </form>
        <div class="rss-btn cpointer" @click="externalLogin('google')">
          <img width="25" src="./../../assets/img/google.png" />
          <span class="pl-2">Google</span>
        </div>
        <!-- <div class="rss-btn cpointer" @click="externalLogin('github')">
          <img width="20" src="./../../assets/img/github.png" />
          <span class="pl-2">Github</span>
        </div> -->
        <div class="d-flex justify-center align-end wrapper-register-text">
          <small
            >¿Todavía no estás registrado?
            <b class="cpointer text" @click="$router.push('/register')"
              >¡hazlo aquí!</b
            ></small
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
// components
import LanguageSelectorComponent from "./../../components/shared/language-selector/LanguageSelectorComponent";
import ModalComponent from "./../../components/shared/modal/ModalComponent";
import GoogleLogin from "vue-google-login";
// services
import ServicesLogin from "./../../services/login/services";
export default {
  mixins: [validationMixin],
  components: {
    LanguageSelectorComponent,
    ModalComponent,
    GoogleLogin,
  },
  validations: {
    email: { required, email },
    password: { required },
  },

  data: () => ({
    email: "",
    password: "",
    recoverPasswordObject: {
      open: false,
      width: 600,
      height: 900,
      title: "Recuperar contraseña",
      icon: "mdi-lock-question",
      type: "password",
    },
    params: {
      client_id: process.env.VUE_APP_CLIENT_ID,
    },
    emailIsTouched: null,
    passIsTouched: null,
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("La contraseña es requerida.");
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
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
    // services
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      ServicesLogin.login(payload).then((response) => {
        if (response.data.code === 200) {
          this.saveLoginData(response);
        } else {
          this.$toast.error("El usuario o la contraseña son incorrectos");
        }
      });
    },
    externalLogin(param) {
      switch(param){
        case 'github': 
          // dev
          window.location.href = "http://localhost:3000/auth/github";
          // prod
          // document.location.href = "https://api.app-smartdesign.com/auth/github";
        break;
        case 'google': 
          // dev
          window.location.href = "http://localhost:3000/auth/google";
          // prod
          // window.location.href = "https://api.app-smartdesign.com/auth/google";
        break;
      }
    },
    saveLoginData(response) {
      // save user credentials on localStorage and vuex
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      this.$store.commit("setUser", response.data.user);
      this.$store.commit("setToken", response.data.token);
      this.$router.push("/home");
    }
  },
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  height: calc(100vh - 100px);
}
.form-wrapper {
  width: 40%;
  max-width: 450px;
  padding: 20px;
  height: 500px;
}
.label-remember-pass:hover {
  text-decoration: underline;
}
.header-login-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  height: 90px;
  width: 95%;
}
.wrapper-register-text {
  height: 100px;
}
.wrapper-register-text > small > b:hover {
  text-decoration: underline;
}

</style>
