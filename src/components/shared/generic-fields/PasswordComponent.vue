<template>
  <div>
    <label class="password-label">{{ title }}</label>
    <v-text-field
      class="mt-1"
      hide-details
      v-model="password"
      :placeholder="placeholder"
      single-line
      outlined
      dense
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :filled="!passIsTouched"
      @click:append="showPassword = !showPassword"
      @focus="passIsTouched = true"
      @blur="passIsTouched = false"
    ></v-text-field>
    <transition name="fade">
      <div v-if="password" class="d-flex align-center">
        <v-icon :class="passwordValidation.class" small class="pt-1">{{
          passwordValidation.icon
        }}</v-icon>
        <small :class="passwordValidation.class" class="ml-1 pt-1"
          >{{ $t('shared.password_security') }} {{ passwordValidation.security }}</small
        >
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "PasswordComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      password: "",
      showPassword: false,
      passwordValidation: {
        security: null,
        icon: null,
        class: null,
      },
      passIsTouched: null,
    };
  },
  watch: {
    password: {
      handler(value) {
        if (this.lightValidation(value)) {
          this.passwordValidation.security = this.$t('shared.low');
          this.passwordValidation.icon = "mdi-lock-remove";
          this.passwordValidation.class = "low-security";
        }
        if (this.mediumValidation(value)) {
          this.passwordValidation.security = this.$t('shared.medium');
          this.passwordValidation.icon = "mdi-lock-minus";
          this.passwordValidation.class = "medium-security";
        }
        if (this.strengthValidation(value)) {
          this.passwordValidation.security = this.$t('shared.high');
          this.passwordValidation.icon = "mdi-lock-check";
          this.passwordValidation.class = "high-security";
        }
        let payload = {
          type: this.title,
          value: value,
        };
        this.$emit("sendPassword", payload);
      },
    },
    deep: true,
  },
  methods: {
    lightValidation(value) {
      if (value && value.length < 8) {
        return true;
      }
      return false;
    },
    mediumValidation(value) {
      let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
      if (value && regex.test(value) && value.length >= 8) {
        return true;
      }
      return false;
    },
    strengthValidation(value) {
      let regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?¿"=)()_:;.,€{}+\-/])/;
      if (value && regex.test(value) && value.length >= 8) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.password-label {
  font-size: 15px;
  color: #777777 !important;
}
.low-security {
  color: red;
}
.medium-security {
  color: orange;
}
.high-security {
  color: green;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
