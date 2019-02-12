<template>
    <div id="player">
        <header>
            <h1></h1>
            <h2></h2>
        </header>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.params)
        this.$store.dispatch('fetchAlbumData','alb.304643574')
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

    #player{
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
    }

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
