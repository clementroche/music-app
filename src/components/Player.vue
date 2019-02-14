<template>
    <div id="player">
        <top-player id="top"></top-player>
        <bottom-player id="bottom"></bottom-player>
    </div>
</template>

<script>
import TopPlayer from '@/components/TopPlayer'
import BottomPlayer from '@/components/BottomPlayer'
export default {
    created() {
        this.$store.dispatch('fetchAlbumData',this.$route.params.id)
        this.$store.dispatch('fetchAlbumTracks',this.$route.params.id)
    },
    components: {
        TopPlayer,
        BottomPlayer
    }
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
    
</style>
