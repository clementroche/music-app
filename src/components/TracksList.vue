<template>
    <div id="tracks">
        <div v-for="(track,index) in tracks" :key="track.id">
            <one-track :track="track" :index="index"></one-track>
        </div>
        
    </div>
</template>

<script>
import OneTrack from '@/components/OneTrack'
export default {
    computed: {
        tracks() {
            return this.$store.getters.currentTracks
        }
    },
    components: {
        OneTrack
    }
}
</script>

<style lang="scss" scoped>
    #tracks {
        margin-top: 12px;
    }
</style>
