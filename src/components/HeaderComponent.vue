<template>
  <v-app-bar app dark>
    <div class="d-flex ma-3">
      LOGO
    </div>
    <div class="d-flex align-center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" small color="success" v-bind="attrs" v-on="on">
            <v-icon small class="pr-1 icons">
              mdi-view-grid-plus
            </v-icon>
            Crear
          </v-btn>
        </template>
        <span>Crear nuevo componente</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" small color="success" v-bind="attrs" v-on="on">
            <v-icon small class="pr-1 icons">
              mdi-content-save
            </v-icon>
            Guardar
          </v-btn>
        </template>
        <span>Guardar proyecto</span>
      </v-tooltip>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <v-select
        class="pr-3 pt-5 mt-1"
        v-model="select"
        append-icon="mdi-translate"
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
      items: [
        { id: 1, name: "Español" },
        { id: 2, name: "Català" },
        { id: 3, name: "English" },
        { id: 4, name: "Française" },
      ],
    };
  },
  methods: {},
};
</script>
