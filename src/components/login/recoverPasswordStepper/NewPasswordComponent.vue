<template>
  <div>
    <span>{{ $t('new_password.create_password') }}</span>
    <form class="form-wrapper mt-4 mb-4">
      <PasswordComponent
        class="mb-3"
        :title="$t('new_password.title_password')"
        :placeholder="$t('new_password.type_password_placeholder')"
        @sendPassword="getPassword($event)"
      />
      <PasswordComponent
        :title="$t('new_password.repeat_password')"
        :placeholder="$t('new_password.repeat_password_placeholder')"
        @sendPassword="getPassword($event)"
      />
    </form>
    <div class="d-flex justify-end">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :color="'#5cb85ccc'"
            v-bind="attrs"
            v-on="on"
            text
            @click="goNextStep()"
          >
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('generic.save&exit') }}</span>
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
              this.$toast.success(this.$t('new_password.password_save_success'));
            }
          })
          // 
        } else {
          this.$toast.error(this.$t('new_password.password_not_match'));
        }
      } else {
        this.$toast.error(this.$t('new_password.password_error_length'));
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
