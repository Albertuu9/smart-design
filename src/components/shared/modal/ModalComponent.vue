<template>
  <v-dialog persistent v-model="value" :width="width" :height="height">
    <v-card>
      <v-card-title class="lighten-1 success--text d-flex align-center pa-4">
        <v-icon color="success" class="pr-2" v-if="icon">{{ icon }}</v-icon>
        <span class="title">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn :color="'#aaaaaa'" @click="closeModal" dark icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <component
        @emitData="getEmitData"
        v-bind:is="currentComponent"
      ></component>

      <v-card-actions class="py-4" v-if="type !== 'password'">
        <v-spacer></v-spacer>
        <v-btn :color="'#aaaaaa'" class="white--text" small @click="closeModal">
          {{ $t('generic_modal.cancel') }}
        </v-btn>
        <v-btn color="success" small @click="saveData">
          {{ $t('generic_modal.accept') }}
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
    icon: {
      type: String,
      required: false,
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
    saveData() {
      if (this.returnData) {
        this.$emit("emitData", this.returnData);
        this.$toast.success(this.$t('generic_modal.success_data'));
      }
      this.closeModal();
    },
    // emit events
    getEmitData(data) {
      if (data) {
        this.returnData = data;
      } else {
        this.closeModal();
      }
    },
  },
};
</script>
<style lang="scss">
.v-card-actions {
  border: none;
}
</style>
