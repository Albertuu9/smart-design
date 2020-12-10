<template>
  <v-dialog persistent v-model="value" :width="width" :height="height">
    <v-card>
      <v-card-title
        class="green lighten-1 white--text d-flex align-center pa-4"
      >
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn @click="closeModal" dark icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <component
        @emitData="getEmitData"
        v-bind:is="currentComponent"
      ></component>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveData">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import AvatarSelectionComponent from "./../avatar-selection/AvatarSelectionComponent";
import RecoverPasswordModalComponent from "./../../login/RecoverPasswordModal";
export default {
  name: "ModalComponent",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentComponent: null,
      returnData: null,
    };
  },
  created() {
    this.loadComponent();
  },
  methods: {
    loadComponent() {
      switch (this.type) {
        case "avatar":
          this.currentComponent = AvatarSelectionComponent;
          break;
        case "password":
          this.currentComponent = RecoverPasswordModalComponent;
          break;
      }
    },
    closeModal() {
      this.$emit("input", false);
    },
    saveData(data) {
      this.$emit("emitData", this.returnData);
      this.closeModal();
    },
    // emit events
    getEmitData(data) {
      this.returnData = data;
    },
  },
};
</script>
