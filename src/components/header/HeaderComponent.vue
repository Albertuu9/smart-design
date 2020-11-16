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
    <div class="d-flex align-center">
      <v-select
        class="pr-3 pt-5 mt-1"
        v-model="select"
        :items="items"
        item-text="name"
        item-value="id"
        label="Seleccionar idioma"
        dense
        solo
        return-object
      ></v-select>
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
export default {
  name: "HeaderComponent",
  components: {
    MyProfileOptionsComponent,
  },
  data() {
    return {
      darkMode: false,
      messages: 1,
      select: null,
      openMenuData: false,
      items: [
        { id: 1, name: "Español" },
        { id: 2, name: "Català" },
        { id: 3, name: "English" },
        { id: 4, name: "Française" },
      ],
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
