<template>
<div id="library" ref="library">
    <header>
        <transition appear v-on:enter="enterh1">
            <h1>my library</h1>
        </transition>
        <transition appear v-on:enter="enterh2">
            <h2>albums</h2>
        </transition>
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

export default {
    data() {
        return {
        }
    },
    methods: {
        enterh1(el,done) {
            let delay = 0.75

            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
                onComplete: ()=> {
                    // done()
                }
            });
            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=> {
                    done()
                }
            });
        },
        enterh2(el,done) {
            let delay = 1
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
                onComplete: ()=> {
                    // done()
                }
            });
            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=> {
                    done()
                }
            });
        }
    },
    mounted() {

    },
    computed: {
        currentLetter() {
            return this.$store.getters.currentLetter
        },
        currentLetterIndex() {
            return this.$store.getters.currentLetterIndex
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
