<template>
  <v-app>
    <HeaderComponent v-if="currentUrl === '/home'" @openMenu="openMenu($event)" />
    <div class="d-flex">
      <AsideComponent v-if="currentUrl === '/home'" :openMenuData="openMenuData" />
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/header/HeaderComponent";
import AsideComponent from "./components/aside/AsideComponent";
export default {
  name: "App",

  components: {
    HeaderComponent,
    AsideComponent,
  },

  data: () => ({
    openMenuData: true,
    currentUrl: '',
  }),
  created() {
    this.getCurrentPath();
  },
  updated: function () {
  this.$nextTick(function () {
    this.currentUrl = this.$route.path;
  })
},
  methods: {
    openMenu(event) {
      this.openMenuData = event;
    },
    getCurrentPath(){
      this.currentUrl = this.$route.path;
    }
  },
};
</script>
