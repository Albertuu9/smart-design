<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step color="success" :complete="currentStep > 1" step="1">
        Validar correo
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="success" :complete="currentStep > 2" step="2">
        Validar código
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="success" step="3">
        Crear nueva contraseña
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <MailValidationComponent @goStep="moveBySteps" @getUser="sendVerification"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <CodeValidationComponent v-if="currentStep >= 2" :user="user" @goStep="moveBySteps"/>
      </v-stepper-content>

      <v-stepper-content step="3">
        <NewPasswordComponent v-if="currentStep >= 3" :user="user" @close="closeModal"/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
// components
import MailValidationComponent from './recoverPasswordStepper/MailValidationComponent';
import CodeValidationComponent from './recoverPasswordStepper/CodeValidationComponent';
import NewPasswordComponent from './recoverPasswordStepper/NewPasswordComponent';

export default {
  name: "RecoverPasswordModal",
  components:{
    MailValidationComponent,
    CodeValidationComponent,
    NewPasswordComponent
  },
  data: () => ({
    currentStep: 1,
    userId: null
  }),

  methods: {
    // emit events
    moveBySteps(sign){
      if(sign === '+'){
        this.currentStep++;
      } else {
        this.currentStep--;
      }
    },
    sendVerification(data){
      this.user = data;
    },
    closeModal(event){
      if(event){
        this.$emit('emitData');
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
}
.v-stepper{
  box-shadow: none;
  border-radius: 0px;
}
.v-stepper__header{
  box-shadow: none;
  background-color: #efefef;
  border-radius: 0px;
}
</style>
