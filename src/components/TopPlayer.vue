<template>
    <div id="top" :style="top">
        <header>
            <transition appear v-on:enter="enterh1">
                <h1>{{album.name}}</h1>
            </transition>
            <transition appear v-on:enter="enterh2">
                <h2>{{album.artistName}}</h2>
            </transition>
        </header>
        <cover :album="album"></cover>
        <actions-player></actions-player>
        <actions-album></actions-album>
        <player-slider></player-slider>
    </div>
</template>

<script>
import Cover from '@/components/Cover'
import ActionsPlayer from '@/components/ActionsPlayer'
import ActionsAlbum from '@/components/ActionsAlbum'
import PlayerSlider from '@/components/PlayerSlider'

function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
export default {
    data() {
        return {
            scale:1
        }
    },
    computed: {
        album() {
            return this.$store.getters.currentAlbum
        },
        scrollAmount() {
            return this.$store.getters.playerScroll
        },
        top() {
            return {
                transform: `scale(${this.scale})`,
                opacity: this.scale
            }
        }
    },
    watch: {
        scrollAmount() {
            TweenLite.to(this, 0.5, {
                ease: Power3.easeOut,
                scale: map_range(this.scrollAmount,-550,0,0.5,1),
            });
        }
    },
    methods: {
        enterh1(el,done) {
            let delay = 0.75
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                opacity:0,
            });
            TweenLite.to(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:1,
            });
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
            });
            TweenLite.to(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:0,
            });
        },
        enterh2(el,done) {
            let delay = 1
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                opacity:0,
            });
            TweenLite.to(el, 1.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:1,
            });
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
            });
            TweenLite.to(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:0,
            });
        }
    },
    components: {
        Cover,
        ActionsPlayer,
        ActionsAlbum,
        PlayerSlider
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#top {
    transform-origin: top center;
}

    header {
        padding: 0px 16px 20px;
        text-align: center;

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
</style>
