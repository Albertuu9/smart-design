<template>
  <div :style="{ 'background-color': userMode ? '#ffffff' : '#f7f7f7' }" class="pa-2 avatar-selection-wrapper">
    <div class="d-flex align-center">
      <div v-if="userMode"  class="filter-title">
        <h4 v-if="filterText">{{ $t('avatars_modal.filter_text')}}
          <span :class="filterClass">{{ filterText }}</span>
        </h4>
        <small v-if="(user.isPremium + 1) < category && filterText && filterText !== 'Standard'">{{ $t('avatars_modal.filter_subtext') + '' + filterText }}</small>
      </div>
      <div v-if="userMode"  class="d-flex row-avatar" :style="{'margin-right': userMode !== false ? '10px' : '40px'}">
        <v-select
          class="pt-1"
          return-object
          single-line
          dense
          ripple
          item-text="text"
          item-value="id"
          v-model="category"
          placeholder="Seleccionar categoría"
          :items="categories"
          @change="filterAvatars($event)"
        ></v-select>
      </div>
    </div>
    <div class="d-flex flex-wrap body-wrapper mb-5">
      <SpinnerPlatform v-if="spinner"/>
      <div class="d-flex flex-row flex-wrap row-avatar-wrapper" :style="{'margin': userMode !== false ? '0px 20px 0px 20px' : '0px 80px 0px 80px'}">
        <div
          class="d-flex align-center avatar-wrapper justify-center"
          v-for="(avatar, index) in filteredAvatars"
          :key="index"
        >
          <div>
            <img
              :class="userMode ? (user.isPremium + 1) >= avatar.category ? (category === 3 ? 'premium-image' : 'avatar-image') : (category === 3 && category !== 1 ? 'premium-block-image' : 'block-image') : 'avatar-image'"
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
// services
import AvatarsServices from "./../../../services/avatars/services";
// components
import SpinnerPlatform from "./../../shared/spinner/SpinnerPlatform";
export default {
  name: "AvatarSelectionComponent",
  props:{
    userMode :{
      type: Boolean,
      required: false
    }
  },
  components: {
    SpinnerPlatform
  },
  data() {
    return {
      avatars: [],
      currentPath: "",
      spinner: false,
      filteredAvatars: [],
      filterText: "",
      filterClass: "",
      categories: [
        {
          id: 1,
          text: "Standard",
          class: "standard"
        },
        {
          id: 2,
          text: "Gold",
          class: "gold"
        },
        {
          id: 3,
          text: "Emerald",
          class: "emerald"
        },
      ],
      category: 1,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
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
        if (response && response.code === 200) {
          this.spinner = false;
          this.avatars = response.data.standardAvatars.concat(response.data.goldAvatars).concat(response.data.emeraldAvatars);
          this.filteredAvatars = this.avatars.filter(
          (avatar) => avatar.category === this.category
            );
          this.filterText = this.categories[0].text;
          this.filterClass = this.categories[0].class;
        }
      });
    },
    selectAvatar(avatar) {
      if ((this.user && (this.user.isPremium + 1) >= avatar.category) && this.userMode) {
        let selectedClass = "";
        if (avatar.type === "standard" || avatar.type === "gold" ) {
          selectedClass = "selected";
        } else {
          selectedClass = "premium-selected";
        }
        this.resetAvatarSelected(avatar);
        let listAvatars = [];
        listAvatars = this.checkAvatars(avatar);
        listAvatars.forEach((item) => {
          if (avatar._id === item._id) {
            document
              .getElementById(avatar._id)
              .setAttribute("class", selectedClass);
          }
        });
        this.$emit("emitData", avatar.path);
      } else if(!this.userMode){
        let selectedClass = "selected";
        this.resetAvatarSelected(avatar);
        let listAvatars = [];
        listAvatars = this.checkAvatars(avatar);
        listAvatars.forEach((item) => {
          if (avatar._id === item._id) {
            document
              .getElementById(avatar._id)
              .setAttribute("class", selectedClass);
          }
        });
        this.$emit("emitData", avatar.path);
      }
    },
    resetAvatarSelected(avatar) {
      let listAvatars = [];
      let iconClass = "";
      let selectedClass = "";
      if (avatar.type === "standard" || avatar.type === "gold" ) {
        iconClass = "avatar-image";
        selectedClass = "selected";
      } else {
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
    checkAvatars(avatar) {
      let listAvatars = [];
      listAvatars = this.filteredAvatars;
      return listAvatars;
    },
    filterAvatars(event) {
      this.filteredAvatars = this.avatars.filter(
          (avatar) => avatar.category === event.id
        );
      this.filterText = event.text;
      this.filterClass = event.class;
      this.category = event.id;
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
  height: 290px;
  overflow: auto;
}
.filter-title {
  margin-left: 50px;
  width: 80%;
}

.avatar-wrapper {
  padding-top: 20px;
  width: 20%;
  height: 100px;
}
.row-avatar-wrapper {
  width: 100%;
  height: 150px;
}
.row-avatar {
  width: 20%;
  float: right;
}
.avatar-image {
  width: 60px;
  cursor: pointer;
}
.avatar-selection-wrapper {
  max-height: 500px;
  height: 100%;
  width: 100%;
}
.premium-image {
  width: 70px;
  cursor: pointer;
}
.premium-block-image {
  width: 70px;
  filter: grayscale(100%);
}
.block-image {
  width: 60px;
  filter: grayscale(100%);
}
div .avatar-block {
  width: 18px;
  position: absolute;
  margin-left: -10px;
}
.selected {
  width: 80px;
}
.premium-selected {
  width: 90px;
}
.standard {
  color: #1976d2;
}
.gold {
  color: #887101;
}
.emerald {
  color: #009B77;
}
</style>
