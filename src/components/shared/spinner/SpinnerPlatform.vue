<template>
  <div
    class="d-flex flex-column flex-wrap align-center justify-center spinner-wrapper"
  >
    <v-icon x-large color="green">mdi mdi-loading mdi-spin</v-icon>
  </div>
</template>
<script>
export default {
  name: "SpinnerPlatform",
};
</script>
<style lang="scss" scoped>
.spinner-wrapper {
  width: 100%;
  height: 100%;
}
</style>
