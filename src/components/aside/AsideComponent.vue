<template>
  <div :class="openMenuData ? 'openMenu' : 'closeMenu'" class="aside-wrapper">
    <div class="d-flex mt-5 align-center">
      <MainActionsComponent />
    </div>
    <div class="d-flex align-center components-title-wrapper px-5 mt-4">
      <v-icon small dark class="pr-1">mdi-view-grid</v-icon>
      <span class="white--text">Mis componentes</span>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small dark v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Añadir un nuevo componente</span>
      </v-tooltip>
    </div>
    <div class="components-total pt-3 pl-5">
    <small>Tienes 11 en total</small>
    </div>
    <div class="d-flex components-container">
      <ListComponentsComponent />
    </div>
    <footer class="footer-wrapper pb-2 pl-5">
      <div class="d-flex pb-1">
        <v-icon small dark class="mt-1 pr-1">mdi-message-text</v-icon>
        <span class="pr-1 white--text">Contacto:</span>
      </div>
      <div class="content-footer pt-1">
        <a class="pr-1 dark" href="#">Contáctanos</a>
        <v-icon class="white--text">mdi-circle-small</v-icon>
        <a class="pr-1 dark" href="#">FAQS</a>
        <v-icon class="white--text">mdi-circle-small</v-icon>
        <a class="pr-1 dark" href="#">Política de privacidad</a>
        <div class="pt-3 text-center">
          <small class="white--text">Powered by: SMARTDESIGN - 2020</small>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import ListComponentsComponent from "./ListComponentsComponent";
import MainActionsComponent from "./MainActionsComponent";
export default {
  name: "AsideComponent",
  components: {
    ListComponentsComponent,
    MainActionsComponent,
  },
  props: {
    openMenuData: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.aside-wrapper {
  margin-top: 64px;
  height: calc(100vh - 64px);
  background-color: #333333;
  transition: transform ease-out 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.openMenu {
  display: flex;
}
.closeMenu {
  display: none;
}
.components-title-wrapper {
  align-self: self-start;
  width: 100%;
}

.components-container{
    max-height: 530px;
    overflow: auto;
}

.footer-wrapper {
  bottom: 0;
  position: absolute;
  font-size: 14px;
  left: 0;
}
.footer-wrapper a {
  text-decoration: none;
  color: white;
}

.footer-wrapper a:hover {
  text-decoration: underline;
}

.content-footer {
  font-size: 12px;
}

.components-total {
    width: 100%;
}

.rights {
  font-size: 10px;
}
</style>
