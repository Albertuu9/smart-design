<template>
  <div class="pa-2 avatar-selection-wrapper">
    <div class="d-flex justify-center">
      <v-btn-toggle
        v-model="selectedAvatarsCategory"
        @change="showAvatarsWrapper"
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
              :id="avatar.id"
              @click="selectAvatar(avatar)"
              :class="
                avatar.type === 'standard'
                  ? 'avatar-image'
                  : avatar.block
                  ? 'premium-block-image'
                  : 'premium-image'
              "
              :src="avatar.image"
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
export default {
  name: "AvatarSelectionComponent",
  data() {
    return {
      selectedAvatarsCategory: 0,
      avatarsLoaded: [],
      premiums: [
        {
          id: 1,
          name: "mario",
          image: require("./../../../assets/avatars/mario.png"),
          type: "premium",
          block: true,
        },
        {
          id: 2,
          name: "luigi",
          image: require("./../../../assets/avatars/luigi.png"),
          type: "premium",
          block: true,
        },
        {
          id: 3,
          name: "peach",
          image: require("./../../../assets/avatars/peach.png"),
          type: "premium",
          block: true
        },
        {
          id: 4,
          name: "daisy",
          image: require("./../../../assets/avatars/daisy.png"),
          type: "premium",
          block: true
        },
        {
          id: 5,
          name: "wario",
          image: require("./../../../assets/avatars/wario.png"),
          type: "premium",
          block: true,
        },
        {
          id: 6,
          name: "waluigi",
          image: require("./../../../assets/avatars/waluigi.png"),
          type: "premium",
          block: true,
        },
        {
          id: 7,
          name: "pacman",
          image: require("./../../../assets/avatars/pacman.png"),
          type: "premium",
          block: true,
        },
        {
          id: 8,
          name: "bowser",
          image: require("./../../../assets/avatars/bowser.png"),
          type: "premium",
          block: true
        },
      ],
      avatars: [
        {
          id: 1,
          name: "bear",
          image: require("./../../../assets/avatars/bear.png"),
          type: "standard",
        },
        {
          id: 2,
          name: "monkey",
          image: require("./../../../assets/avatars/monkey.png"),
          type: "standard",
        },
        {
          id: 3,
          name: "polar",
          image: require("./../../../assets/avatars/polar.png"),
          type: "standard",
        },
        {
          id: 4,
          name: "cat",
          image: require("./../../../assets/avatars/cat.png"),
          type: "standard",
        },
        {
          id: 5,
          name: "dog",
          image: require("./../../../assets/avatars/dog.png"),
          type: "standard",
        },
        {
          id: 6,
          name: "owl",
          image: require("./../../../assets/avatars/owl.png"),
          type: "standard",
        },
        {
          id: 7,
          name: "pig",
          image: require("./../../../assets/avatars/pig.png"),
          type: "standard",
        },
      ],
    };
  },
  created() {
    this.showAvatarsWrapper();
  },
  methods: {
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
          if (avatar.id === item.id) {
            document
              .getElementById(avatar.id)
              .setAttribute("class", selectedClass);
          }
        });
        this.$emit("emitData", avatar);
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
          document.getElementById(avatar.id).setAttribute("class", iconClass);
          document.getElementById(avatar.id).removeAttribute(selectedClass);
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
  },
};
</script>
<style lang="scss" scoped>
.body-wrapper {
  width: 100%;
  margin-top: 10px;
  height: 380px;
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
  margin: 0px 120px 0px 120px;
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
