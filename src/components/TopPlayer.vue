<template>
    <div id="top">
        <header>
            <h1>{{album.name}}</h1>
            <h2>{{album.artistName}}</h2>
        </header>
        <cover :album="album"></cover>
    </div>
</template>

<script>
import Cover from '@/components/Cover'
export default {
    computed: {
        album() {
            return this.$store.getters.currentAlbum
        }
    },
    components: {
        Cover
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

    header {
        padding: 0px 16px 8px;
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
