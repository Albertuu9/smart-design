<template>
  <div>
    <div class="d-flex flex-column">
      <span>{{ $t('email_validation.email_text') }}</span>
      <form class="form-wrapper mt-4 mb-4" @submit.prevent>
        <label>{{ $t('email_validation.email_label') }}</label>
        <div class="d-flex align-center ">
          <v-text-field
            v-model="email"
            class="pt-1"
            :error-messages="emailErrors"
            required
            single-line
            outlined
            dense
            :placeholder="$t('email_validation.email_placeholder')"
            :append-icon="
              isMailExists !== null
                ? isMailExists
                  ? 'mdi-email-check'
                  : 'mdi-email-remove'
                : ''
            "
            :filled="!emailIsTouched"
            :color="'#5cb85ccc'"
            @input="
              $v.email.$touch();
              checkMail();
            "
            @focus="emailIsTouched = true"
            @blur="
              $v.email.$touch();
              emailIsTouched = false;
            "
          ></v-text-field>
        </div>
      </form>
    </div>
    <div class="d-flex justify-end">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="!isMailExists"
            icon
            :color="'#5cb85ccc'"
            v-bind="attrs"
            v-on="on"
            text
            @click="goNextStep()"
          >
            <v-icon large>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('generic.next') }}</span>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
// services
import ServicesRegister from "@/services/register/services";
import ServicesLogin from "./../../../services/login/services";
export default {
  name: "MailValidation",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },

  data: () => ({
    email: "",
    emailIsTouched: null,
    isMailExists: null,
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.$t('email_validation.email_invalid'));
      !this.$v.email.required &&
        errors.push(this.$t('email_validation.email_required'));
      return errors;
    },
  },

  methods: {
    checkMail() {
      this.$v.$touch();
      this.isMailExists = null;
      if (this.email && !this.$v.$invalid) {
        let payload = {
          email: this.email,
        };
        ServicesRegister.checkMailExists(payload).then((response) => {
          if (response.data.code === 200) {
            this.isMailExists = true;
            this.$emit("getUser", response.data);
          } else {
            this.isMailExists = false;
          }
        });
      }
    },
    sendVerificationCode() {
      let payload = {
        email: this.email,
      };
      ServicesLogin.sendRecoverPasswordCode(payload);
    },
    goNextStep() {
      this.sendVerificationCode();
      this.$emit("goStep", "+");
    },
  },
};
</script>
