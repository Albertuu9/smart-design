<template>
    <div class="d-flex flex-column align-center justify-center">
        <img width="120" src="./../../../assets/gifs/spinner.svg" />
        <p class="placeholder_title">{{ text }}</p>
    </div>
</template>
<script>
export default {
    name: "Spinner",
    props:{
        text: {
            type: String,
            required: false
        }
    }
}
</script>