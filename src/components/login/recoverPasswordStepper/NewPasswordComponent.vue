<template>
  <div>
    <span>Crea tu nueva contraseña y accede a tu cuenta:</span>
    <form class="form-wrapper mt-4 mb-4">
      <PasswordComponent
        class="mb-3"
        :title="'Contraseña'"
        :placeholder="'Escribe aquí tu contraseña'"
        @sendPassword="getPassword($event)"
      />
      <PasswordComponent
        :title="'Repite contraseña'"
        :placeholder="'Repite aquí tu contraseña'"
        @sendPassword="getPassword($event)"
      />
    </form>
    <div class="d-flex justify-end">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="success"
            v-bind="attrs"
            v-on="on"
            text
            @click="goNextStep()"
          >
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </template>
        <span>Guardar y salir</span>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
// components
import PasswordComponent from "./../../shared/generic-fields/PasswordComponent";
// services
import LoginService from "./../../../services/login/services"
export default {
  name: "NewPassword",
  components: {
    PasswordComponent,
  },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    password: null,
    repeatPassword: null,
    blockButton: true,
  }),
  created(){
    console.log('hheheheehuser', this.user);
  },
  methods: {
    // emit events
    goNextStep() {
      if (this.password && this.password.length >= 8 && this.repeatPassword && this.repeatPassword.length >= 8) {
        if (this.password === this.repeatPassword) {
          let payload = {
            password: this.password,
            id: this.user.user.id
          }
          LoginService.updatePassword(payload).then((response) => {
            if(response.data.code === 200) {
              this.$emit("close", true);
              this.$toast.success("La contraseña se ha cambiado correctamente");
            }
          })
          // 
        } else {
          this.$toast.error("Las contraseñas no coinciden");
        }
      } else {
        this.$toast.error("Las contraseñas deben tener 8 carácteres o más");
      }
    },
    getPassword(data) {
      if (data.type === "Contraseña") {
        this.password = data.value ? data.value : null;
      } else {
        this.repeatPassword = data.value ? data.value : null;
      }
    },
  },
};
</script>
