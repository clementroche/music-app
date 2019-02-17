<template>
    <div id="top" :style="top">
        <header>
            <h1>{{album.name}}</h1>
            <h2>{{album.artistName}}</h2>
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
    computed: {
        album() {
            return this.$store.getters.currentAlbum
        },
        scrollAmount() {
            return this.$store.getters.playerScroll
        },
        top() {
            return {
                transform: `translateY(${this.scrollAmount/5}px) scale(${map_range(this.scrollAmount,-550,0,0.5,1)})`
            }
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
