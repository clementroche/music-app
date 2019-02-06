<template>
<div class="labels">
    <div :class="['letter',index == currentLetter ? 'active' : '']" v-for="(letter,index) in alphabet" :key="letter">
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
    },
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetterIndex
        }

    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

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
        text-align: right;

        &.active {
            color: red;
        }
    }
}
</style>
