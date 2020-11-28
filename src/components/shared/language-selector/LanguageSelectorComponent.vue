<template>
  <v-select
    filled
    rounded
    return-object
    single-line
    dense
    outlined
    item-text="text"
    item-value="value"
    label="Seleccionar idioma"
    @change="selectLanguage"
    v-model="selectedLanguage"
    :items="languages"
  >
    <template v-slot:item="{ item }">
      <img
        class="pr-3"
        v-if="item.value === 'es'"
        width="40"
        src="./../../../assets/flags/es.svg"
      />
      <img
        class="pr-3"
        v-if="item.value === 'ca'"
        width="40"
        src="./../../../assets/flags/ca.svg"
      />
      <img
        class="pr-3"
        v-if="item.value === 'en'"
        width="40"
        src="./../../../assets/flags/en.svg"
      />
      <img
        class="pr-3"
        v-if="item.value === 'fr'"
        width="40"
        src="./../../../assets/flags/fr.svg"
      />
      <span>{{ item.text }}</span>
    </template>
  </v-select>
</template>
<script>
import i18n from './../../../i18n';
export default {
  name: "LanguageSelectorComponent",
  data() {
    return {
      languages: [
        {
          value: "es",
          text: "Español",
        },
        {
          value: "ca",
          text: "Català",
        },
        {
          value: "en",
          text: "English",
        },
        {
          value: "fr",
          text: "Française",
        },
      ],
      selectedLanguage: "",
    };
  },
  created() {
    if(!localStorage.getItem('userLanguage')) {
      this.selectedLanguage = this.getNavigatorLanguage();
      this.changeOnLocale(this.getNavigatorLanguage());
    } else {
      this.selectedLanguage = localStorage.getItem("userLanguage");
      this.changeOnLocale(localStorage.getItem("userLanguage"));
    }
  },
  methods: {
    getNavigatorLanguage() {
      let navigatorLanguage = window.navigator.language.split("-")[0];
      // check if navigator language exists on platform
      let found = this.languages.find((language) => {
        return navigatorLanguage === language.value;
      });
      if (!found) {
        navigatorLanguage = "es";
      }
      localStorage.setItem("userLanguage", navigatorLanguage);
      return navigatorLanguage;
    },
    selectLanguage(data){
      localStorage.setItem("userLanguage", data.value);
      this.changeOnLocale(data.value);
    },
    changeOnLocale(value){
      i18n.locale = value
      i18n.fallbackLocale = value
    }
  },
};
</script>
<style lang="scss" scoped>
.v-select {
  max-width: 145px;
  width: 100%;
}
</style>
