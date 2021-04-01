<template>
  <div class="pa-2 avatar-selection-wrapper">
    <div class="d-flex flex-wrap body-wrapper mb-5">
      <div
        class="d-flex flex-column flex-wrap align-center justify-center spinner-wrapper"
        v-if="spinner"
      >
        <v-icon x-large color="green">mdi mdi-loading mdi-spin</v-icon>
      </div>
      <div class="d-flex flex-row flex-wrap row-avatar-wrapper">
        <div
          class="d-flex align-center avatar-wrapper justify-center"
          v-for="(avatar, index) in avatars"
          :key="index"
        >
          <div>
            <img
              class="avatar-image"
              :id="avatar._id"
              :src="avatar.path"
              @click="selectAvatar(avatar)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AvatarsServices from "./../../../services/avatars/services";
export default {
  name: "AvatarSelectionComponent",
  data() {
    return {
      selectedAvatarsCategory: 0,
      avatars: [],
      currentPath: "",
      spinner: false,
    };
  },
  mounted() {
    this.currentPath = this.$router.currentRoute.path;
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.spinner = true;
      this.loadAvatars().then((response) => {
        if(response && response.code === 200) {
          this.spinner = false;
          this.avatars = response.data.standardAvatars;
        }
        
      });
    },
    selectAvatar(avatar) {
      if (!avatar.block) {
        let selectedClass = "";
        if (avatar.type === "standard") {
          selectedClass = "selected";
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
      }
      listAvatars = this.checkAvatars(avatar);
      listAvatars.forEach((avatar) => {
        if (!avatar.block) {
          document.getElementById(avatar._id).setAttribute("class", iconClass);
          document.getElementById(avatar._id).removeAttribute(selectedClass);
        }
      });
    },
    checkAvatars(avatar) {
      let listAvatars = [];
      if (avatar.type === "standard") {
        listAvatars = this.avatars;
      }
      return listAvatars;
    },
    // services
    loadAvatars() {
      return AvatarsServices.loadAvatars();
    },
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
.spinner-wrapper {
  width: 100%;
  height: 100%;
}
.avatar-wrapper {
  width: 20%;
  height: 100px;
  padding-top: 50px;
}
.row-avatar-wrapper {
  width: 100%;
  height: 150px;
  margin: 0px 80px 0px 80px;
}
.avatar-image {
  width: 70px;
  cursor: pointer;
}
.avatar-selection-wrapper {
  max-height: 500px;
  height: 100%;
  background-color: #f7f7f7;
}
.premium-image {
  width: 80px;
  cursor: pointer;
}
.premium-block-image {
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
