<template>
    <div id="player">
        <top-player></top-player>
    </div>
</template>

<script>
import TopPlayer from '@/components/TopPlayer'
export default {
    created() {
        this.$store.dispatch('fetchAlbumData',this.$route.params.id)
    },
    components: {
        TopPlayer
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
