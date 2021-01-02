<template>
    <div class="home-wrapper">
        hello world
    </div>
</template>
<script>
export default {
    name: 'Home',
    data(){
        return {

        }
    },
    computed: {
        user () {
            return this.$store.getters.getUser
        }
    }
}
</script>
<style lang="scss" scoped>
.home-wrapper{
    width: 80vw;
}
</style>