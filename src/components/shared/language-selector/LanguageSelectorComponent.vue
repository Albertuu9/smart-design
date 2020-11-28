<template>
  <v-select
    v-model="selectedLanguage"
    :items="languages"
    filled
    rounded
    return-object
    single-line
    dense
    outlined
  >
    <template v-slot:item="{ item }">
      <img class="pr-3" v-if="item.value === 'ES'" width="40"  src="./../../../assets/flags/es.svg">
      <img class="pr-3" v-if="item.value === 'CA'" width="40"  src="./../../../assets/flags/ca.svg">
      <img class="pr-3" v-if="item.value === 'EN'" width="40"  src="./../../../assets/flags/en.svg">
      <img class="pr-3" v-if="item.value === 'FR'" width="40"  src="./../../../assets/flags/fr.svg">
      <span>{{ item.text }}</span>
    </template>
  </v-select>
</template>
<script>
export default {
  name: "LanguageSelectorComponent",
  data() {
    return {
      languages: [
        {
          value: "ES",
          text: "Español",
        },
        {
          value: "CA",
          text: "Català"
        },
        {
          value: "EN",
          text: "English"
        },
        {
          value: "FR",
          text: "Française"
        },
      ],
      selectedLanguage: "CA",
    };
  },
};
</script>
<style lang="scss" scoped>
.v-select {
  max-width: 145px;
  width: 100%;
}
</style>
