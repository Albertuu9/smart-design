<template>
  <v-app-bar app dark>
    <div class="d-flex">
      <v-btn @click="openMenu()" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <div class="d-flex ma-3 font-italic">
      <router-link class="link-no-decoration" to="/home">
        <h3>SMARTDESIGN</h3>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="language-wrapper">
      <LanguageSelectorComponent />
    </div>
    <div class="d-flex align-center mr-3">
      <v-badge
        class="mr-4"
        :content="messages"
        :value="messages"
        color="red"
        overlap
      >
        <v-icon class="cpointer">
          mdi-bell
        </v-icon>
      </v-badge>
      <MyProfileOptionsComponent />
    </div>
  </v-app-bar>
</template>
<script>
import MyProfileOptionsComponent from "./MyProfileOptionsComponent";
import LanguageSelectorComponent from "./../shared/language-selector/LanguageSelectorComponent";
export default {
  name: "HeaderComponent",
  components: {
    MyProfileOptionsComponent,
    LanguageSelectorComponent,
  },
  data() {
    return {
      darkMode: false,
      messages: 1,
      openMenuData: false,
    };
  },
  methods: {
    openMenu() {
      this.openMenuData = !this.openMenuData;
      this.$emit("openMenu", !this.openMenuData);
    },
  },
};
</script>
<style lang="scss" scoped>
.language-wrapper {
  margin-top: 25px;
  padding-right: 10px;
}
</style>
