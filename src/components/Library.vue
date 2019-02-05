<template>
<div id="library" ref="library">
    <header>
        <h1>my library {{currentLetter}} - {{$store.getters.currentLetterIndex}}</h1>
        <h2>albums {{$store.state.scrollAmount}}</h2>
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
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetter
        }
    },
    components: {
        AlbumsList,
        Slider
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/fonts.scss';
@import '@/assets/vars.scss';

#library {
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
        padding: 8px 16px;

        h1 {
            font-family: $title-font;
            font-weight: bolder;
            text-transform: uppercase;
        }

        h2 {
            font-family: $title-font;
            text-transform: uppercase;
            background: linear-gradient(180deg, $primary-color, $secondary-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .container {
        height: 100%;
        overflow: hidden;
        display: flex;
    }
}
</style>
