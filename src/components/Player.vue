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
    data() {
        return {
            audio:undefined,
            currentPlaying: undefined
        }
    },
    created() {
        this.$store.dispatch('fetchAlbumData',this.$route.params.id)
        this.$store.dispatch('fetchAlbumTracks',this.$route.params.id)
        this.$store.commit('setPlayingTrack',1)
    },
    computed: {
        currentTrackURL() {
            if(this.$store.state.player.currentTracks[this.playingTrack]) {
                return this.$store.state.player.currentTracks[this.playingTrack].previewURL
            } else {
                return null
            }
            
        },
        isPlaying() {
            return this.$store.getters.isPlaying
        },
        playingTrack() {
            return this.$store.state.player.playingTrack-1
        }
    },
    methods: {
        audioPlay() {
            
                if(this.audio!= undefined) {
                    this.audio.pause()
                }
                if(this.currentPlaying !== this.playingTrack) {
                    this.audio = new Audio(this.currentTrackURL)
                    this.currentPlaying = this.playingTrack
                }


                this.audio.play()
                
            },
        audioPause() {
                if(this.audio!= undefined) {
                    this.audio.pause()
                }
        }
    },
    watch: {
        currentTrackURL() {
            if(this.isPlaying === true) {
                this.audioPlay()
            }
        },
        isPlaying() {
            if(this.isPlaying === true) {
                this.audioPlay()
            } else {
                this.audioPause()
            }
        },
        playingTrack() {
            
        }
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
