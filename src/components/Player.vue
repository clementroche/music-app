<template>
    <div id="player">
        <top-player id="top"></top-player>
        <bottom-player id="bottom"></bottom-player>
        <minified-player class="mini"></minified-player>
    </div>
</template>

<script>
import TopPlayer from '@/components/TopPlayer'
import BottomPlayer from '@/components/BottomPlayer'
import MinifiedPlayer from '@/components/MinifiedPlayer'

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
    mounted() {
        this.$store.commit('setIsPlaying',false)
        this.$store.commit('setCurrentTime',0)
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
        },
        currentTimeFromSlider() {
            return this.$store.getters.currentTimeFromSlider
        }
    },
    methods: {
        audioPlay() {
                if(this.audio!= undefined) {
                    this.audio.pause()
                }
                if(this.currentPlaying !== this.playingTrack) {
                    this.audio = new Audio(this.currentTrackURL)
                    this.audio.addEventListener("timeupdate", ()=>{
                        this.$store.commit('setCurrentTime',this.audio.currentTime)
                    });
                    this.audio.addEventListener("ended", ()=>{
                        this.$store.commit('updateTrack',1)
                    });
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
    beforeDestroy() {
                if(this.audio!= undefined) {
                    this.audio.pause()
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
            
        },
        currentTimeFromSlider() {
            if(this.audio) {
                this.audio.currentTime = this.currentTimeFromSlider
            }
            
        }
    },
    components: {
        TopPlayer,
        BottomPlayer,
        MinifiedPlayer
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
        position: relative;
    }

    #top {
        position: relative;
    }

    #bottom {
        position: relative;
    }

    .mini {
        z-index: 3;
        position: absolute;
        bottom: 0px;
        
    }
    
</style>
