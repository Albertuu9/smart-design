<template>
  <div class="form-wrapper">
    <form class="mb-4">
      <div class="d-flex flex-column">
        <PasswordComponent
          class="mb-3"
          :title="$t('new_password.title_password')"
          :placeholder="$t('new_password.type_password_placeholder')"
          :resetPassword="resetPassword"
          @sendPassword="getPassword($event)"
        />
        <PasswordComponent
          :title="$t('new_password.repeat_password')"
          :placeholder="$t('new_password.repeat_password_placeholder')"
          :resetPassword="resetPassword"
          @sendPassword="getPassword($event)"
        />
      </div>
      <div class="footer">
        <v-btn
          class="ml-2"
          @click="updateUserPassword()"
          dark
          :color="'#5cb85ccc'"
          small
        >
          {{ $t("generic.save") }}
        </v-btn>
      </div>
    </form>
  </div>
</template>
<script>
// components
import PasswordComponent from "./../../shared/generic-fields/PasswordComponent";
// services
import LoginService from "./../../../services/login/services";
export default {
  name: "Password",
  components: {
    PasswordComponent,
  },
  data() {
    return {
      password: null,
      repeatPassword: null,
      resetPassword: false
    };
  },
  computed: {
    userData() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    updateUserPassword() {
      if (
        this.password &&
        this.password.length >= 8 &&
        this.repeatPassword &&
        this.repeatPassword.length >= 8
      ) {
        if (this.password === this.repeatPassword) {
          let payload = {
            password: this.password,
            id: this.userData._id
          };
          LoginService.updatePassword(payload).then((response) => {
            if (response.data.code === 200) {
              this.$toast.success(
                this.$t("new_password.password_save_success")
              );
              this.resetPassword = true;
              this.resetPassword = false;
            }
          });
        } else {
          this.$toast.error(this.$t("new_password.password_not_match"));
        }
      } else {
        this.$toast.error(this.$t("new_password.password_error_length"));
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
<style lang="scss" scoped>
.form-wrapper {
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 20px;
  width: 100%;
  height: 380px;
}
.footer {
  position: absolute;
  bottom: -30px;
  right: 20px;
}
</style>
