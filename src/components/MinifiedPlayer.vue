<template>
    <div id="minified-player">
        <div class="slider"></div>
        <div class="container">
            <div class="info">
                <div class="cover">
                    <img :src="player.covers[1].url" alt="">
                </div>
                <div class="meta">
                    <div>
                        <div class="album">{{player.current.name}}</div>
                        <div class="artist">{{player.current.artistName}}</div>
                    </div>
                    <div class="playing">Now Playing <span>{{currentTrackName}}</span></div>
                </div>
            </div>
            <div class="actions">
                <minified-player-actions></minified-player-actions>
            </div>
        </div>
    </div>
</template>

<script>
import MinifiedPlayerActions from '@/components/MinifiedPlayerActions'
export default {
    data(){
        return {
            currentTrackName:''
        }
    },
    computed: {
        player() {
            return this.$store.getters.player
        },
        playingTrack() {
            return this.$store.getters.playingTrack
        }
    },
    watch: {
        playingTrack() {
            this.currentTrackName = this.player.currentTracks[this.playingTrack-1].name
        }
    },
    mounted() {
        console.log('mounted')
        setTimeout(()=>{
            this.currentTrackName = this.player.currentTracks[this.playingTrack-1].name
        },500)
        
    },
    components: {
        MinifiedPlayerActions
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';
    #minified-player {
        // height: 100px;
        // background: red;
        padding: 8px 16px;
        width: 100%;

        .container {
            display: flex;
            justify-content: space-between;
            .actions {
                display: flex;
            }

            .info {
                display: flex;
                .cover {
                    height: 70px;
                    width: 70px;
                }
                .meta {
                    padding-left: 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow: hidden;
                    .album {
                        font-family: $title-font;
                        font-weight: bolder;
                        text-transform: uppercase;
                        line-height: 0.8rem;
                        font-size: 1rem;
                    }
                    .artist {
                        font-family: $title-font;
                        text-transform: uppercase;
                        background: linear-gradient(180deg, $primary-color, $secondary-color);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-size: 1rem;
                    }
                    .playing {
                        font-family: $subtitle-font;
                        color: $text-secondary-color;
                        font-weight: 700;
                        font-size: 0.8rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        span {
                            color: #000;
                        }
                    }
                }
            }
        }
    }
</style>
