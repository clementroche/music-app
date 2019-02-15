<template>
    <div id="tracks">
        <div v-for="track in tracks" :key="track.id">
            <one-track :track="track"></one-track>
            <!-- test -->
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
        margin-top: 16px;
    }
</style>
