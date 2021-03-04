<template>
  <div class="full-container">
    <div>
      <div class="d-flex flex-row pl-4 pt-4 header-wrapper">
        <span class="main-logo pr-3">SD</span>
        <span class="main-title white--text">SMARTDESIGN</span>
      </div>
    </div>
    <div class="main-wrapper d-flex flex-column align-center justify-center">
      <SpinnerComponent :text="spinnerObject.text" />
    </div>
  </div>
</template>
<script>
import SpinnerComponent from "./../../components/shared/spinner/SpinnerComponent";
// services
import ServicesLogin from "../../services/login/services";
export default {
  name: "SocialLogin",
  components: {
    SpinnerComponent,
  },
  data() {
    return {
      spinnerObject: {
        text: "Redirigiendo a la página principal...",
      },
    };
  },
  created() {
    this.saveLoginData();
  },
  methods: {
    saveLoginData() {
      // save user credentials on localStorage and vuex
      let user = this.$route.query.id;
      let token = this.$route.query.token;
      let payload = {
        id: user,
      };
      ServicesLogin.checkUserById(payload).then((response) => {
        if (response.data.code === 200 && response.data.user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
          this.$store.commit("setUser", user);
          this.$store.commit("setToken", token);
          this.$router.push("/home");
        } else {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: calc(100vh - 100px);
}
.header-wrapper {
  height: 100px;
}
.full-container {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),
    url("./../../assets/img/background3.jpg");
  background-size: cover;
}
</style>
