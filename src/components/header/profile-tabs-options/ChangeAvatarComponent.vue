<template>
<div class="avatars-wrapper">
    <div>
        <AvatarSelectionComponent :userMode="true" @emitData="getAvatar($event)"/>
    </div>
    <div class="footer">
        <v-btn
          class="ml-2"
          @click="updateUserAvatar()"
          dark
          :color="'#5cb85ccc'"
          small
        >
          {{ $t("generic.save") }}
        </v-btn>
    </div>
</div>
</template>
<script>
// components
import AvatarSelectionComponent from "./../../shared/avatar-selection/AvatarSelectionComponent";
// services
import LoginService from "./../../../services/login/services";
export default {
    name: "ChangeAvatarComponent",
    components: {
        AvatarSelectionComponent
    },
    data(){
      return{
        avatar: ''
      }
    },
    computed: {
      userData() {
        return this.$store.getters.getUser;
      },
    },
    methods:{
      updateUserAvatar(){
        let payload = {
            avatar: this.avatar,
            id: this.userData._id
        };
        LoginService.updateAvatar(payload).then((response) => {
          if (response.data.code === 200) {
            let user = {
            avatar: this.avatar,
            country: this.userData.country,
            email: this.userData.email,
            isPremium: this.userData.isPremium,
            name: this.userData.name,
            role: this.userData.role,
            surname: this.userData.surname,
            userType: this.userData.userType,
            _id: this.userData._id
          }
          this.$store.commit("setUser", user);
            this.$toast.success(
              this.$t("my_profile_options.avatar.update_success")
            );
          }
        });
      },
      // emit events
      getAvatar(event){
        if(event) {
          this.avatar = event;
        }
      }
    }
}
</script>
<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: -50px;
  right: 20px;
}
.avatars-wrapper{
    width: 100%;
}
</style>