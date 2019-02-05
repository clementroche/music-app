<template>
<div class="labels">
    <div class="letter" v-for="letter in alphabet" :key="letter">
        {{letter}}
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            alphabet: '#abcdefghijklmnopqrstuvwxyz'.split('')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/fonts.scss';
@import '@/assets/vars.scss';

.labels {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .letter {
        font-family: $title-font;
        font-weight: bolder;
        text-transform: uppercase;
        font-size: 0.8rem;
    }
}
</style>
