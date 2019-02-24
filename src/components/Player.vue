<template>
<div id="player">
    <top-player id="top"></top-player>
    <bottom-player id="bottom"></bottom-player>
    <!-- <minified-player class="mini"></minified-player> -->
</div>
</template>

<script>
import TopPlayer from '@/components/TopPlayer'
import BottomPlayer from '@/components/BottomPlayer'
// import MinifiedPlayer from '@/components/MinifiedPlayer'

export default {
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('fetchAlbumData', this.$route.params.id)
        this.$store.dispatch('fetchAlbumTracks', this.$route.params.id)

        // this.$store.commit('setPlayingTrack',0)

    },
    mounted() {
        if (this.$store.getters.playingTrack === undefined) {
            // this.$store.commit('setPlayingTrack', 0)
        }

        if (this.$store.getters.playingAlbum === undefined) {
            this.$store.commit('setPlayingAlbum', this.$route.params.id)
        }

        // this.$store.commit('playerScroll',0)
        // this.$store.commit('setIsPlaying',false)
        // this.$store.commit('setCurrentTime',0)
    },
    computed: {

    },
    methods: {

    },
    beforeDestroy() {
        if (this.audio != undefined) {
            this.audio.pause()
        }
    },
    watch: {

    },
    components: {
        TopPlayer,
        BottomPlayer,
        // MinifiedPlayer
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#player {
    height: calc(100% - 52px);
    display: flex;
    flex-direction: column;
    position: relative;
}

#top {
    position: relative;
}

#bottom {
    position: relative;
}
</style>
