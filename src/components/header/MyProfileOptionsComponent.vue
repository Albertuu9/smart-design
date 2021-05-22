<template>
  <v-menu
    class="menu"
    :close-on-content-click="false"
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <UserInfoComponent
      v-if="profileModalOptions.open"
      v-model="profileModalOptions.open"
      :width="profileModalOptions.width"
    />
    <template v-slot:activator="{ on }">
      <v-avatar class="cpointer" color="white" size="40" v-on="on">
        <img class="profile-icon" :src="user.avatar" />
      </v-avatar>
    </template>
    <v-card max-width="300" class="mx-auto pa-3">
      <div class="d-flex align-center pb-3">
        <v-avatar class="cpointer" size="72">
          <img class="profile-icon" :src="user.avatar" />
        </v-avatar>
        <div class="d-flex flex-column pl-3">
          <v-chip
            v-if="!user.isPremium"
            class="membership"
            small
            color="primary"
          >
              <v-icon class="small-icon pr-1">mdi-flask</v-icon>
              <span>free</span>
          </v-chip>
          <v-chip v-if="user.isPremium" class="membership-premium" small :color="'#ffd700'">
              <v-icon class="small-icon pr-1">mdi-gold</v-icon>
              <span>gold</span>
          </v-chip>
          <h5 class="pt-2">{{ user | completeName }}</h5>
          <small>{{ user.email }}</small>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          ripple
          class="cpointer list-wrapper"
          :class="item.disabled ? 'disabled' : ''"
          v-for="(item, i) in items"
          :key="i"
          :disabled="item.disabled"
          @click="setOptions(item.id)"
        >
          <v-list-item-content>
            <v-list-item-subtitle class="d-flex align-center">
              <v-icon class="pr-2">{{ item.icon }}</v-icon>
              <h4>{{ $t("inData." + item.text) }}</h4>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
// utils
import "./../../utils/filters/genericFilters";
// components
import UserInfoComponent from "./../header/UserInfoComponent";
export default {
  name: "MyProfileOptions",
  components: {
    UserInfoComponent,
  },
  data() {
    return {
      darkMode: null,
      items: [
        {
          id: 1,
          text: "my_profile",
          icon: "mdi-account",
          disabled: false,
        },
        { id: 2, text: "my_projects", icon: "mdi-television", disabled: false },
        {
          id: 3,
          text: "customization",
          icon: "mdi-palette",
          disabled: false,
        },
        { id: 4, text: "logout", icon: "mdi-power", disabled: false },
      ],
      profileModalOptions: {
        open: false,
        width: null,
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    setOptions(id) {
      switch (id) {
        case 1:
          this.openMiProfileOptions();
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
    openMiProfileOptions() {
      this.profileModalOptions = {
        open: true,
        width: 1000,
      };
    },
    closeSession() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (localStorage.getItem("googleLogin")) {
        localStorage.removeItem("googleLogin");
        let myWindow = window.open(
          "https://mail.google.com/mail/u/0/?logout&hl=en"
        );
        setTimeout(() => {
          myWindow.close();
        }, 1000);
      }
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-icon {
  background-size: cover;
  border-radius: 100% !important;
}
.list-wrapper:hover {
  border-radius: 5px;
  background-color: #efefef;
}
.membership {
  font-size: 10px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
}
.membership-premium {
  font-size: 10px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
  color: #887101;
}
.small-icon {
  font-size: 12px !important;
}
</style>
