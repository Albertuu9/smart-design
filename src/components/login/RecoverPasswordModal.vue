<template>
  <div class="d-flex justify-center flex-column align-center">
    <form class="form-wrapper">
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
      <v-icon small class="pr-2">mdi-alert-rhombus</v-icon>
      <small>Vas a recibir un enlace en tu correo para poder recuperar la contraseña</small>
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "RecoverPasswordModal",
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },

  data: () => ({
    email: "",
    emailIsTouched: null,
  }),

  computed: {
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
    }
  },
};
</script>
<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  padding: 20px;
}
</style>
