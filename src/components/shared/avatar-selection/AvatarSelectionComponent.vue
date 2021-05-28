<template>
  <div class="pa-2 avatar-selection-wrapper">
    <div class="d-flex align-center">
      <div class="filter-title">
        <h4 v-if="filterText">Filtrado por: {{ filterText }}</h4>
      </div>
      <div class="d-flex row-avatar">
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
      <div class="d-flex flex-row flex-wrap row-avatar-wrapper">
        <div
          class="d-flex align-center avatar-wrapper justify-center"
          v-for="(avatar, index) in filteredAvatars"
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
// services
import AvatarsServices from "./../../../services/avatars/services";
// components
// components
import SpinnerPlatform from "./../../shared/spinner/SpinnerPlatform";
export default {
  name: "AvatarSelectionComponent",
  components: {
    SpinnerPlatform
  },
  data() {
    return {
      selectedAvatarsCategory: 0,
      avatars: [],
      currentPath: "",
      spinner: false,
      filteredAvatars: [],
      filterText: "",
      categories: [
        {
          id: 0,
          text: "Todos",
        },
        {
          id: 1,
          text: "Terror",
        },
        {
          id: 2,
          text: "Monstruos",
        },
      ],
      category: 0,
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
        if (response && response.code === 200) {
          this.spinner = false;
          this.avatars = response.data.standardAvatars;
          this.filteredAvatars = this.avatars;
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
        listAvatars = this.filteredAvatars;
      }
      return listAvatars;
    },
    filterAvatars(event) {
      if (event.id === 0) {
        this.filteredAvatars = this.avatars;
        this.filterText = "";
      } else {
        this.filteredAvatars = this.avatars.filter(
          (avatar) => avatar.category === event.id
        );
        this.filterText = event.text;
      }
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
  width: 80%;
  margin-left: 80px;
}
.avatar-wrapper {
  padding-top: 20px;
  width: 20%;
  height: 100px;
}
.row-avatar-wrapper {
  width: 100%;
  height: 150px;
  margin: 0px 80px 0px 80px;
}
.row-avatar {
  width: 20%;
  margin-right: 40px;
  float: right;
}
.avatar-image {
  width: 60px;
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
  width: 80px;
}
.premium-selected {
  width: 120px;
}
</style>
