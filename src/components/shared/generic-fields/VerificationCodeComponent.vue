<template>
  <div class="d-flex align-center justify-center">
    <input
      class="code-wrapper mx-2"
      maxlength="1"
      v-for="(input, index) in inputs"
      :ref="input.id"
      :key="index"
      type="text"
      v-model="input.value"
      @input="getValue(input.value, index)"
    />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          :color="'#02bb8ccc'"
          class="ml-3"
          @click="sendVerificationCode"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('shared.send_another_code') }}</span>
    </v-tooltip>
  </div>
</template>
<script>
// services
import ServicesLogin from "./../../../services/login/services";
export default {
  name: "VerificationCodeComponent",
  props: {
    fields: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputs: [],
      code: [],
    };
  },
  created() {
    this.generateFields();
  },
  methods: {
    generateFields() {
      for (let i = 0; i < this.fields; i++) {
        this.inputs.push({ value: null, position: i, id: 'field'+i });
      }
    },
    getValue(value, index) {
      if (this.code && this.code.length <= 0) {
        for (let i = 0; i < this.fields; i++) {
          this.code.push({ value: null, position: i, id: 'field'+i });
        }
      }

      this.code.forEach((item, i) => {
        if (value) {
          this.code[index] = { value: value, position: index };
        } else {
          this.code[index] = { value: null, position: index };
        }
      });
      // check code structure is valid
      this.checkCode(this.code);
    },
    checkCode(code) {
      if (code.length >= this.fields) {
        let payload = {
          code: code,
          id: this.user.user.id,
        };
        this.$emit("sendCode", payload);
      }
    },
    // services
    sendVerificationCode() {
      let payload = {
        email: this.user.user.email,
      };
      ServicesLogin.sendRecoverPasswordCode(payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.code-wrapper {
  border: 1px solid green;
  border-radius: 5px;
  padding: 10px;
  width: 50px;
  font-family: 30px;
  text-align: center;
  font-size: 18px;
}
</style>
