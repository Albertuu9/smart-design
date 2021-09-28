<template>
  <v-dialog
    persistent
    v-model="value"
    :width="width"
    class="p-0"
  >
    <v-card>
      <div class="d-flex">
        <v-tabs
          :background-color="'#f6f6f6'"
          :color="'rgb(92, 184, 92, .8)'"
          vertical
          class="wrapper justify-start"
        >
          <v-tab
            v-for="(tab, index) in tabsMenu"
            :key="index"
            :class="tab.enabled ? tab.class : ''"
            @click="selectItem(tab)"
          >
            <v-icon left>
              {{ tab.icon }}
            </v-icon>
            <span>{{ $t("inData." + tab.name) }}</span>
          </v-tab>
          <v-tab-item v-for="(tab, index) in tabsMenu" :key="index">
            <v-card flat>
              <div class="header d-flex px-3 align-center">
                <v-spacer></v-spacer>
                <v-btn :color="'#aaaaaa'" @click="closeModal" dark icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="d-flex px-3">
                <component
                  v-bind:is="tab.body"
                ></component>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
// components
import MyProfileComponent from './profile-tabs-options/MyProfileComponent';
import PasswordComponent from './profile-tabs-options/PasswordComponent';
import ChangeAvatarComponent from './profile-tabs-options/ChangeAvatarComponent';
import SubscriptionComponent from './profile-tabs-options/SubscriptionComponent';
export default {
  name: "UserInfoComponent",
  components: {
    MyProfileComponent,
    PasswordComponent,
    ChangeAvatarComponent,
    SubscriptionComponent
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      tabsMenu: [
        {
          id: 1,
          name: "profile_general_info",
          icon: "mdi-account",
          class: "selected-tab",
          title: "",
          body: MyProfileComponent,
          enabled: false,
        },
        {
          id: 2,
          name: "profile_change_password",
          icon: "mdi-lock",
          class: "selected-tab",
          body: PasswordComponent,
          enabled: false,
        },
        {
          id: 3,
          name: "profile_change_avatar",
          icon: "mdi-drama-masks",
          class: "selected-tab",
          body: ChangeAvatarComponent,
          enabled: false,
        },
        {
          id: 4,
          name: "profile_payments_management",
          icon: "mdi-cash",
          class: "selected-tab",
          body: SubscriptionComponent,
          enabled: false,
        },
      ],
    };
  },
  created() {
    this.tabsMenu[0].enabled = true;
  },
  methods: {
    selectItem(tab) {
      this.tabsMenu.map((item, index) => {
        if (item.id === tab.id) {
          this.tabsMenu[index].enabled = true;
        } else {
          this.tabsMenu[index].enabled = false;
        }
      });
    },
    closeModal() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 500px;
}
.header{
  height: 50px;
}
.v-tabs {
  display: flex;
  transition: none !important;
}
.v-tabs .v-tab {
  font-size: 11px;
  justify-content: flex-start;
  font-weight: bolder;
}

.v-tabs .v-tab .v-icon{
  font-size: 20px;
}

.v-tabs-slider {
  display: none !important;
}

.selected-tab {
  background-color: #02bb8ccc;
}

.selected-tab span,
.selected-tab .v-icon {
  color: #ffffff;
}


</style>
