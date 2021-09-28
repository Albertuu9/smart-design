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
            v-if="user.isPremium === 0"
            class="membership"
            small
            color="primary"
          >
              <v-icon class="small-icon pr-1">mdi-flask</v-icon>
              <span>Standard</span>
          </v-chip>
          <v-chip v-if="user.isPremium === 1" class="membership-premium" small :color="'#ffd700'">
              <v-icon class="small-icon pr-1">mdi-gold</v-icon>
              <span>Gold</span>
          </v-chip>
          <v-chip v-if="user.isPremium === 2" class="membership-emerald" small :color="'#009B77'">
              <v-icon class="small-icon pr-1">mdi-diamond</v-icon>
              <span>Emerald</span>
          </v-chip>
          <v-chip v-if="user.isPremium === 3" class="membership-company" small :color="'#E81736'">
              <v-icon class="small-icon pr-1">mdi-domain</v-icon>
              <span>Company</span>
          </v-chip>
          <h5 class="pt-2">{{ user | completeName }}</h5>
          <small>{{ user.email }}</small>
        </div>
      </div>
      <v-divider></v-divider>
      <ul class="container-list">
        <li :class="item.id !== 4 ? 'list-element mb-2' : 'close-sesion-element mb-2'" v-for="(item, i) in items" :key="i" :disabled="item.disabled" @click="setOptions(item.id)">
          <span>{{ $t("inData." + item.text) }}</span>
        </li>
      </ul>
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
      items: [],
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
  watch: {
    user: {
      handler(value) {
        if(value){
          if(value.isGuest){
            this.items = [
              { id: 4, text: "logout", disabled: false },
            ]
          } else {
            this.items = [ {
                id: 1,
                text: "my_profile",
                disabled: false,
              },
              { id: 2, text: "my_projects", icon: "mdi-television", disabled: false },
              {
                id: 3,
                text: "customization",
                disabled: false,
              },
              { id: 4, text: "logout", disabled: false }
            ];
          }
        }
      },deep: true
    }
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
      localStorage.removeItem("googleLogin");
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
.container-list{
  text-decoration: none;
  padding: 0;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-element{
  cursor: pointer;
  text-decoration: none;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid #02bb8c;
  color: #02bb8c;
  width: 100%;
  font-size: 12px;
}
.close-sesion-element{
  cursor: pointer;
  text-decoration: none;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #02bb8c;
  color: #ffffff;
  width: 100%;
  font-size: 12px;
}
.list-element:hover{
  background-color: #02bb8c;
  color: #ffffff;
}
.membership-premium {
  font-size: 10px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
  color: #887101;
}

.membership-emerald {
  font-size: 10px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
  color: #013f30;
}

.membership-company {
  font-size: 10px !important;
  max-width: 100px;
  height: 20px !important;
  align-self: flex-end;
  font-weight: bolder;
  color: #ffffff
}
.small-icon {
  font-size: 12px !important;
}
</style>
