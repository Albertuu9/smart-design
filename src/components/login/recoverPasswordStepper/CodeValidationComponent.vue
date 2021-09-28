<template>
  <div>
    <div class="d-flex flex-column">
      <span
        >{{ $t('code_validation.email_message') }}</span
      >
      <form class="form-wrapper mt-4 mb-4" @submit.prevent>
        <div class="d-flex align-center justify-center">
          <VerificationCodeComponent class="mt-3" :user="user" :fields="6" @sendCode="getCode($event)" />
        </div>
      </form>
    </div>
    <div class="d-flex justify-end pt-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="primary" small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <span
          >{{ $t('code_validation.email_not_received') }}
          <b>agf.smartdesign@gmail.com</b></span
        >
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="grey"
            v-bind="attrs"
            v-on="on"
            text
            @click="goPreviusStep()"
          >
            <v-icon large>mdi-arrow-left-circle</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('generic.back') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :color="'#02bb8ccc'"
            v-bind="attrs"
            v-on="on"
            text
            :disabled="!isValidCode"
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
import { required } from "vuelidate/lib/validators";
// components
import VerificationCodeComponent from "./../../shared/generic-fields/VerificationCodeComponent";
// services
import ServicesRegister from "./../../../services/register/services";
import ServicesLogin from "./../../../services/login/services";
export default {
  name: "CodeValidation",
  mixins: [validationMixin],
  components: {
    VerificationCodeComponent,
  },
  validations: {
    code: { required },
  },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    code: "",
    isValidCode: null,
  }),
  created() {
  },
  methods: {
    // services
    checkCode(code, id) {
      this.isValidCode = null;
      if (code && code.length === 6) {
        let payload = {
          code: code,
          id: id,
        };
        ServicesLogin.checkCodeIsValid(payload).then((response) => {
          if (response.data.code === 200) {
            this.isValidCode = true;
          } else {
            this.isValidCode = false;
          }
        });
      }
    },
    // emit events
    goNextStep() {
      this.$emit("goStep", "+");
    },
    goPreviusStep() {
      this.$emit("goStep", "-");
    },
    getCode(data){
      let userCode = '';
      userCode = data.code.map(item => item.value).join('');
      this.checkCode(userCode, data.id);
    }
  },
};
</script>
<style lang="scss">
.label-remember-pass:hover {
  text-decoration: underline;
}
</style>
