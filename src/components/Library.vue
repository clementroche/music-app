<template>
<div id="library" ref="library">
    <header>
        <h1 :style="title">my library</h1>
        <h2 :style="subtitle">albums</h2>
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
    data() {
        return {
            titleY: 16,
            titleOpacity: 0,
            subtitleY: 16,
            subtitleOpacity: 0
        }
    },
    mounted() {
        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            delay: 0.75,
            titleY: 0,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            delay: 0.75,
            titleOpacity: 1,
        });

        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            delay: 1,
            subtitleY: 0,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            delay: 1,
            subtitleOpacity: 1,
        });
    },
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetter
        },
        currentLetterIndex() {
            return this.$store.getters.currentLetterIndex
        },
        title() {
            return {
                transform: `translateY(${this.titleY}px)`,
                opacity: this.titleOpacity
            }
        },
        subtitle() {
            return {
                transform: `translateY(${this.subtitleY}px)`,
                opacity: this.subtitleOpacity
            }
        }
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
