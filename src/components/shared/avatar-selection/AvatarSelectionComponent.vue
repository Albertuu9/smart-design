<template>
  <div class="pa-2 avatar-selection-wrapper">
    <div class="d-flex justify-center">
      <v-btn-toggle
        v-model="selectedAvatarsCategory"
        @change="showAvatarsWrapper()"
        rounded
      >
        <v-btn small class="text-capitalize">
          <v-icon small class="pr-1">mdi-drama-masks</v-icon>
          <span>Standard</span>
        </v-btn>
        <v-btn small class="text-capitalize">
          <v-icon small :color="'#ffd700'" class="pr-1">mdi-crown</v-icon>
          <span>Premium</span>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div class="d-flex body-wrapper">
      <div class="d-flex flex-row flex-wrap row-avatar-wrapper">
        <div
          class="d-flex align-center avatar-wrapper justify-center mb-5"
          v-for="(avatar, index) in avatarsLoaded"
          :key="index"
        >
          <div>
            <img
              :id="avatar._id"
              @click="selectAvatar(avatar)"
              :class="
                avatar.type === 'standard'
                  ? 'avatar-image'
                  : avatar.block
                  ? 'premium-block-image'
                  : 'premium-image'
              "
              :src="avatar.path"
            />
            <img
              class="avatar-block"
              v-if="avatar.block"
              src="./../../../assets/icons/lock.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AvatarsServices from "./../../../services/avatars/services"
export default {
  name: "AvatarSelectionComponent",
  data() {
    return {
      selectedAvatarsCategory: 0,
      avatarsLoaded: [],
      premiums: [],
      avatars: [],
      currentPath: ''
    };
  },
  mounted(){
    this.currentPath = this.$router.currentRoute.path;
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData(){
      this.loadAvatars().then((response) => {
        this.premiums = response.data.filter(avatar => avatar.type === 'premium');
        this.avatars = response.data.filter(avatar => avatar.type === 'standard');
        if(this.currentPath === '/register') {
          this.premiums.forEach((premium) => {
            premium.block = true;
          })
        } // else if(this.currentPath !== '/register' && ) {
          // falta comprobar si el usuario es premium o no, si no es premium bloquear los avatares de "pago"
        // }
        this.showAvatarsWrapper();
      })
    },
    selectAvatar(avatar) {
      if (!avatar.block) {
        let selectedClass = "";
        if (avatar.type === "standard") {
          selectedClass = "selected";
        } else if (avatar.type === "premium") {
          selectedClass = "premium-selected";
        }
        this.resetAvatarSelected(avatar);
        let listAvatars = [];
        listAvatars = this.checkAvatars(avatar);
        listAvatars.forEach((item, index) => {
          if (avatar._id === item._id) {
            document
              .getElementById(avatar._id)
              .setAttribute("class", selectedClass);
          }
        });
        this.$emit("emitData", avatar._id);
      }
    },
    resetAvatarSelected(avatar) {
      let listAvatars = [];
      let iconClass = "";
      let selectedClass = "";
      if (avatar.type === "standard") {
        iconClass = "avatar-image";
        selectedClass = "selected";
      } else if (avatar.type === "premium") {
        iconClass = "premium-image";
        selectedClass = "premium-selected";
      }
      listAvatars = this.checkAvatars(avatar);
      listAvatars.forEach((avatar) => {
        if (!avatar.block) {
          document.getElementById(avatar._id).setAttribute("class", iconClass);
          document.getElementById(avatar._id).removeAttribute(selectedClass);
        }
      });
    },
    showAvatarsWrapper() {
      this.avatarsLoaded = [];
      if (this.selectedAvatarsCategory === 0) {
        this.avatarsLoaded = this.avatars;
      } else {
        this.avatarsLoaded = this.premiums;
      }
    },
    checkAvatars(avatar) {
      let listAvatars = [];
      if (avatar.type === "standard") {
        listAvatars = this.avatars;
      } else if (avatar.type === "premium") {
        listAvatars = this.premiums;
      }
      return listAvatars;
    },
    // services
    loadAvatars(){
      return AvatarsServices.loadAvatars();
    }
  },
};
</script>
<style lang="scss" scoped>
.body-wrapper {
  width: 100%;
  margin-top: 10px;
  height: 320px;
  overflow: auto;
}
.avatar-wrapper {
  width: 20%;
  height: 100px;
  padding-top: 50px;
}
.row-avatar-wrapper {
  width: 100%;
  height: 100px;
  margin: 0px 80px 0px 80px;
}
.avatar-image {
  width: 70px;
  opacity: 0.6;
  cursor: pointer;
}
.avatar-image:hover {
  opacity: 1;
}
.avatar-selection-wrapper {
  max-height: 500px;
  height: 100%;
  background-color: #eee;
}
.premium-image {
  opacity: 0.6;
  width: 80px;
  cursor: pointer;
}
.premium-image:hover {
  opacity: 1;
}
.premium-block-image {
  opacity: 0.6;
  width: 80px;
  filter: grayscale(100%);
}
div .avatar-block {
  width: 18px;
  position: absolute;
  margin-left: -10px;
}
.selected {
  width: 100px;
}
.premium-selected {
  width: 120px;
}
</style>
