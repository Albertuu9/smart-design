<template>
  <v-menu
    class="menuu"
    :close-on-content-click="false"
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-avatar class="cpointer" color="white" size="36" v-on="on">
        <img
          class="profile-icon"
          src="https://i.ibb.co/XxMyTMm/guest6.png"
        />
      </v-avatar>
    </template>
    <v-card max-width="300" class="mx-auto pa-3">
      <div class="d-flex align-center pb-3">
        <v-avatar class="cpointer" color="white" size="72">
        <img
          class="profile-icon"
          src="https://i.ibb.co/XxMyTMm/guest6.png"
        />
      </v-avatar>
        <div class="d-flex flex-column pl-3">
          <v-chip class="membership" small color="primary">
            miembro standard
          </v-chip>
          <h5 class="pt-2">Alberto González Ferrer</h5>
          <small>alberto2daw@gmail.com</small>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          class="cpointer list-wrapper"
          :class="item.disabled ? 'disabled' : ''"
          v-for="(item, i) in items"
          :key="i"
          :disabled="item.disabled"
          @click="setOptions(item.id)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: "MyProfileOptions",
  data() {
    return {
      darkMode: null,
      items: [
        { id: 1, text: "Mi perfil", icon: "mdi-account", disabled: false },
        { id: 2, text: "Mis proyectos", icon: "mdi-archive", disabled: false },
        { id: 3, text: "Hazte premium", icon: "mdi-star-check", disabled: true },
        { id: 4, text: "Cerrar sesión", icon: "mdi-power", disabled: false },
      ],
    };
  },
  methods: {
    setOptions(id){
      switch(id) {
        case 1:
        break;
        case 2:
        break;
        case 3:
        break;
        case 4:
          this.closeSession();
        break; 
      }
    },
    closeSession(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss" scoped>
.profile-icon {
  background-size: cover;
  border-radius: 100% !important;
}
.list-wrapper:hover {
  background-color: #efefef;
}
.membership {
  font-size: 8px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
}
.v-switch >>> .v-label {
  font-size: 14px !important;
}

</style>
