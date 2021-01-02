<template>
  <transition name="fade">
    <v-snackbar :color="color" v-model="value">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn icon text v-bind="attrs" @click="closeModal()">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </transition>
</template>
<script>
export default {
  name: "AlertsComponent",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    timeout: {
      type: Number,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.timeout) {
      setTimeout(() => {
        this.closeModal();
      }, this.timeout);
    }
  },
  methods: {
    closeModal() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
