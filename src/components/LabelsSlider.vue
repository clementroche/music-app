<template>
<div class="labels">
    <div v-for="(letter,index) in alphabet" :key="letter">
        <letter-labels :letter="letter" :index="index" :active="index == currentLetter"></letter-labels>
    </div>
</div>
</template>

<script>
import LetterLabels from '@/components/LetterLabels'

export default {
    data() {
        return {
            alphabet: '#abcdefghijklmnopqrstuvwxyz'.split(''),
            // right: 32,
            // opacity: 0
        }
    },
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetterAlphabetIndex
        },

    },
    mounted() {

    },
    components: {
        LetterLabels
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

.labels {
    pointer-events: none;
    position: relative;
    top:36px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15px;
    float: right;
    right: 16px;


}
</style>
