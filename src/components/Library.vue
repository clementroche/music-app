<template>
<div id="library" ref="library">
    <header>
        <!-- <h1>my library {{currentLetterIndex}} {{ currentLetter }}</h1>
        <h2>albums {{$store.state.scrollAmount}}</h2> -->
        <h1>my library</h1>
        <h2>albums</h2>
    </header>
    <div class="container">
        <albums-list></albums-list>
        <slider></slider>
    </div>

</div>
</template>

<script>
import AlbumsList from '@/components/AlbumsList'
import Slider from '@/components/Slider'
import {
    TweenMax,
    Elastic,
    TimelineLite
} from "gsap/TweenMax"

export default {
    mounted() {
        setTimeout(()=>{
            // console.log(Object.values(this.$store.state.lettersOffset))
        },1)
        
    },
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetter
        },
        currentLetterIndex() {
            return this.$store.getters.currentLetterIndex
        }
        // offsets() {
        //     return Object.values(this.$store.state.lettersOffset)
        // }
    },
    components: {
        AlbumsList,
        Slider
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#library {
    height: calc(100% - 52px);
    display: flex;
    flex-direction: column;

    header {
        padding: 0px 16px 8px;

        h1 {
            font-family: $title-font;
            font-weight: bolder;
            text-transform: uppercase;
            line-height: 1.9rem;
            font-size: 1.7rem;
        }

        h2 {
            font-family: $title-font;
            text-transform: uppercase;
            background: linear-gradient(180deg, $primary-color, $secondary-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.3rem;
        }
    }

    .container {
        height: 100%;
        overflow: hidden;
        display: flex;
        position: relative;
    }
}
</style>
