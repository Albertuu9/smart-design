<template>
  <div>
    <draggable class="draggable-wrapper" v-model="items" v-bind="getOptions()">
      <template v-for="item in items">
        <div class="draggable-item" :key="item.id">
          <div
            :style="{ 'background-color': item.color }"
            class="draggable-item-header"
          >
            <div class="icon-wrapper">
              <v-icon dark small>{{ item.icon }}</v-icon>
            </div>
          </div>
          <div class="draggable-item-body">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="body-wrapper">
                  {{ item.title }}
                </div>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
            <small class="subtitle">{{ item.category }}</small>
          </div>
          <v-btn class="options-wrapper" icon>
            <v-icon :color="'#333333'" small>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "ListComponentsComponent",
  components: {
    draggable,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          icon: "mdi-form-select",
          title: "Formulario pie de página",
          color: "#02bb8c",
          category: "#Formulario",
        },
        {
          id: 2,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
        {
          id: 3,
          icon: "mdi-format-list-bulleted",
          title: "Listado de productos",
          color: "#02bb8c",
          category: "#Listado",
        },
        {
          id: 4,
          icon: "mdi-format-list-bulleted",
          title: "Listado de productos",
          color: "#02bb8c",
          category: "#Listado",
        },
        {
          id: 5,
          icon: "mdi-format-list-bulleted",
          title: "Listado de productos",
          color: "#02bb8c",
          category: "#Listado",
        },
        {
          id: 6,
          icon: "mdi-format-list-bulleted",
          title: "Listado de productos",
          color: "#02bb8c",
          category: "#Listado",
        },
        {
          id: 7,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
        {
          id: 8,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
        {
          id: 9,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
        {
          id: 10,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
        {
          id: 11,
          icon: "mdi-format-text",
          title: "Texto cabecera",
          color: "#02bb8c",
          category: "#Texto",
        },
      ],
    };
  },
  methods: {
    getOptions() {
      let options = {
        group: "people",
      };
      return options;
    },
  },
};
</script>
<style lang="scss" scoped>
.draggable-wrapper {
  width: 100vw;
  max-width: 350px;
  padding: 10px 20px 0px 20px;
}
.draggable-item {
  background-color: rgb(254, 254, 254);
  display: flex;
  height: 50px;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 8px;
  cursor: grab;
}
.draggable-item:active {
  cursor: grabbing;
}
.draggable-item-header {
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 10%;
  border-radius: 5px 0px 0px 5px;
  align-items: center;
}
.draggable-item-body {
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.body-wrapper {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  font-weight: bolder;
}
.options-wrapper {
  margin-top: 8px;
  color: #333333;
}
.subtitle {
  font-style: italic;
}
</style>
