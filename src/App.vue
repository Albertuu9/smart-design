<template>
  <v-app>
    <HeaderComponent @openMenu="openMenu($event)" />
    <div class="d-flex">
      <AsideComponent :openMenuData="openMenuData" />
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
    openMenuData: true
  }),
  methods:{
    openMenu(event) {
      this.openMenuData = event;
    }
  }
};
</script>
