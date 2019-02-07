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
            return this.$store.getters.currentLetterAlphabetIndex
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
    width: 15px;
    float: right;

    .letter {
        background: linear-gradient(90deg, $primary-color, $secondary-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: $title-font;
        font-weight: bolder;
        text-transform: uppercase;
        font-size: 0.8rem;
        text-align: center;

        &.active {
            font-size: 1.25rem;
            line-height: 1.25rem;
        }
    }
}
</style>
